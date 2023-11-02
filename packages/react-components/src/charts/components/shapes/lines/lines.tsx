/*
 * Copyright 2023 Wonderflow Design Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck: inconsitencies

import {
  curveLinear,
  curveMonotoneX,
  curveMonotoneY,
  curveStepAfter,
  curveStepBefore,
} from '@visx/curve';
import { localPoint } from '@visx/event';
import { Group } from '@visx/group';
import { Line, LinePath } from '@visx/shape';
import { Text } from '@visx/text';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { bisector } from '@visx/vendor/d3-array';
import { ScaleLinear, ScaleTime } from '@visx/vendor/d3-scale';
import _ from 'lodash';
import { useCallback, useMemo } from 'react';

import { colorPaletteNeutrals } from '../../../style-config';
import {
  AxisType, CartesianChartLayout, Data, ThemeVariants,
} from '../../../types';
import { getLabelFromObjectPath, getPrimitiveFromObjectPath } from '../../../utils';
import { LineChartMetadata } from '../../line-chart/line-chart';
import { Tooltip } from '../../tooltip';
import {
  ExtraContent, LinesItem, LinesItemGroup, LinesTooltipContent, LinesTooltipSeries,
} from './lines.module.css';

export type LinesProps = {
  theme: ThemeVariants;
  data: Data;
  metadata: LineChartMetadata;
  topPosition: number;
  leftPosition: number;
  maxWidth: number;
  maxHeight: number;
  axis: {
    top?: AxisType;
    right?: AxisType;
    bottom?: AxisType;
    left?: AxisType;
  };
}

export const Lines = ({
  theme,
  data,
  metadata,
  topPosition: tPos,
  leftPosition: lPos,
  maxWidth: xMax,
  maxHeight: yMax,
  axis,
}: LinesProps) => {
  const {
    top, right, bottom, left,
  } = axis;
  const {
    index, layout, showMarker, showMarkerLabel, renderAs, tooltip, series, overlay,
  } = metadata;

  const isHorizontal = layout === CartesianChartLayout.HORIZONTAL;

  const indexAxis = isHorizontal ? bottom! : left!;
  const seriesAxis = isHorizontal ? left! : bottom!;
  const overlayAxis = isHorizontal ? right : top;

  const hasOverlay = Boolean(overlayAxis && overlay.dataKey);

  const renderer = useMemo(() => {
    const whichMonotone = isHorizontal ? curveMonotoneX : curveMonotoneY;
    const whichStep = isHorizontal ? curveStepAfter : curveStepBefore;

    if (renderAs === 'curves') return whichMonotone;
    if (renderAs === 'lines') return curveLinear;
    return whichStep;
  }, [isHorizontal, renderAs]);

  const accessor = (axis: AxisType, dataKey: string, datum?: Record<string, unknown>) => {
    let value = 0;
    if (axis.scale && datum) {
      const d = getPrimitiveFromObjectPath(datum, dataKey);
      const t = axis.scaleType === 'time' ? new Date(d) : d;
      value = axis.scale(t as any);
    }

    return value;
  };

  const accessorInvert = (axis?: AxisType, value?: number) => {
    let res;

    if (axis && value) {
      const {
        orientation, top, left, scale, scaleType,
      } = axis;

      const isVertical = orientation === 'left' || orientation === 'right';
      const offset = isVertical ? top : left;
      const num = value - offset;

      if (scaleType !== 'label') {
        const s = scale as ScaleLinear<number, number> | ScaleTime<number, number>;
        res = s.invert(num);
      } else {
        const [from, to] = scale.range();
        const min = Math.min(from, to);
        const max = Math.max(from, to);
        const divider = axis.numTicks ?? axis.domain.length;
        const bandwidth = (max - min) / divider;
        const padding = scale.padding() ? bandwidth / 2 : 0;
        const i = Math.round((num - padding) / bandwidth);
        const len = axis.domain.length;
        res = isVertical ? axis.domain[len - i] : axis.domain[i];
      }
    }

    return res;
  };

  const bisectIndex = bisector((index: string | number) => new Date(index)).right;

  const {
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip();

  const { containerRef, containerBounds } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
    debounce: 500,
    zIndex: 10,
  });

  const handleTooltip = useCallback((event: React.SyntheticEvent<ownerSVGElement>) => {
    const {
      scaleType, domain, scale,
    } = indexAxis;
    const { top: tBound, left: lBound } = containerBounds;

    const xy = isHorizontal ? 'x' : 'y';

    const coords = localPoint(event.target.ownerSVGElement, event) ?? { x: -999, y: -999 };

    const accessorInvertIndexOf = accessorInvert(indexAxis, coords[xy]);

    const bisectValueIndexOf = scaleType === 'label'
      ? domain.indexOf(accessorInvertIndexOf as string)
      : bisectIndex(domain, accessorInvertIndexOf as any, 0) - 1;

    const valueFromDomainIndex = domain[bisectValueIndexOf];

    const indexScaleValue = scaleType === 'label'
      ? accessorInvertIndexOf
      : new Date(valueFromDomainIndex);

    const lineIndicatorPos = scale(indexScaleValue as any);

    const tooltipLeft = isHorizontal ? coords.x + lBound / 8 : coords.x;
    const tooltipTop = isHorizontal ? coords.y : coords.y + tBound / 8;

    const tooltipData = {
      coords,
      data: data[bisectValueIndexOf],
      lineIndicatorPos,
    };

    showTooltip({
      tooltipLeft,
      tooltipTop,
      tooltipData,
    });
  }, [containerBounds, indexAxis, isHorizontal, bisectIndex, data, showTooltip]);

  const handleMarkerLabelPosition = (
    data: Data,
    index: number,
    isHorizontal: boolean,
  ) => {
    if (isHorizontal) {
      if (index === 0) return 'start';
      if (index === data.length - 1) return 'end';
      return 'middle';
    }

    return 'start';
  };

  const getCoordinates = (
    {
      datum,
      indexAxis,
      indexDataKey,
      otherAxis,
      otherDataKey,
      isHorizontal,
    }: {
      datum: Record<string, unknown>;
      indexAxis: AxisType;
      indexDataKey: string;
      otherAxis: AxisType;
      otherDataKey: string;
      isHorizontal: boolean;
    },
  ) => {
    const i = accessor(indexAxis, indexDataKey, datum);
    const o = accessor(otherAxis, otherDataKey, datum);

    return isHorizontal
      ? { x: i, y: o }
      : { x: o, y: i };
  };

  const getSeriesCoordinates = (
    datum: Record<string, unknown>,
    dataKey: string,
    isHorizontal: boolean,
  ) => getCoordinates({
    datum,
    indexAxis,
    indexDataKey: index,
    otherAxis: seriesAxis,
    otherDataKey: dataKey,
    isHorizontal,
  });

  const getOverlayCoordinates = (
    datum: Record<string, unknown>,
    dataKey: string,
    isHorizontal: boolean,
  ) => getCoordinates({
    datum,
    indexAxis,
    indexDataKey: index,
    otherAxis: overlayAxis,
    otherDataKey: dataKey,
    isHorizontal,
  });

  return (
    <Group
      top={tPos}
      left={lPos}
    >
      <Group className={LinesItemGroup}>
        {series.dataKey.map((k: string, i: number) => (
          <Group
            key={k}
            className={LinesItem}
          >
            <LinePath
              data={data}
              curve={renderer}
              x={d => getSeriesCoordinates(d, k, isHorizontal).x}
              y={d => getSeriesCoordinates(d, k, isHorizontal).y}
              stroke={series.colors[i]}
              strokeWidth={series.style?.[i]?.strokeWidth ?? 2}
              strokeOpacity={series.style?.[i]?.strokeOpacity ?? 1}
              strokeDasharray={series.style?.[i]?.strokeDasharray}
            />

            {(showMarker
            || showMarkerLabel
            || series.style?.[i]?.showMarker
            || series.style?.[i]?.showMarkerLabel
            ) && data.map((d: Record<string, any>, f: number) => (
              <Group key={JSON.stringify(d)}>
                <circle
                  r={2}
                  cx={getSeriesCoordinates(d, k, isHorizontal).x}
                  cy={getSeriesCoordinates(d, k, isHorizontal).y}
                  stroke={series.colors[i]}
                  fill={theme === 'light' ? colorPaletteNeutrals.white : colorPaletteNeutrals.black}
                  strokeWidth={series.style?.[i]?.strokeWidth ?? 1}
                  strokeOpacity={series.style?.[i]?.strokeOpacity ?? 1}
                />

                {(showMarkerLabel || series.style?.[i]?.showMarkerLabel) && (
                  <Text
                    fontSize={12}
                    angle={0}
                    textAnchor={handleMarkerLabelPosition(data, f, isHorizontal)}
                    dy={-4}
                    dx={f === 0 ? 2 : -2}
                    x={getSeriesCoordinates(d, k, isHorizontal).x}
                    y={getSeriesCoordinates(d, k, isHorizontal).y}
                  >
                    {`${getPrimitiveFromObjectPath(d, k) ?? ''}`}
                  </Text>
                )}
              </Group>
            ))}
          </Group>
        ))}

        {hasOverlay && (
          <Group className={LinesItem}>
            <LinePath
              data={data}
              curve={renderer}
              x={d => getOverlayCoordinates(d, overlay.dataKey, isHorizontal).x}
              y={d => getOverlayCoordinates(d, overlay.dataKey, isHorizontal).y}
              stroke={overlay.color}
              strokeWidth={overlay.style?.strokeWidth ?? 2}
              strokeOpacity={overlay.style?.strokeOpacity ?? 1}
              strokeDasharray={overlay.style?.strokeDasharray}
            />

            {(showMarker
            || showMarkerLabel
            || overlay.style?.[i]?.showMarker
            || overlay.style?.[i]?.showMarkerLabel
            ) && data.map((d: Record<string, any>, f: number) => (
              <Group
                key={JSON.stringify(d)}
              >
                <circle
                  r={2}
                  cx={getOverlayCoordinates(d, overlay.dataKey, isHorizontal).x}
                  cy={getOverlayCoordinates(d, overlay.dataKey, isHorizontal).y}
                  stroke={overlay.color}
                  fill={theme === 'light' ? colorPaletteNeutrals.white : colorPaletteNeutrals.black}
                  strokeWidth={overlay.style?.strokeWidth ?? 1}
                  strokeOpacity={overlay.style?.strokeOpacity ?? 1}
                />

                {(showMarkerLabel || overlay.style?.[i]?.showMarkerLabel) && (
                  <Text
                    fontSize={12}
                    angle={0}
                    textAnchor={handleMarkerLabelPosition(data, f, isHorizontal)}
                    dy={-4}
                    dx={f === 0 ? 2 : -2}
                    x={getOverlayCoordinates(d, overlay.dataKey, isHorizontal).x}
                    y={getOverlayCoordinates(d, overlay.dataKey, isHorizontal).y}
                  >
                    {`${getPrimitiveFromObjectPath(d, overlay.dataKey) ?? ''}`}
                  </Text>
                )}
              </Group>
            ))}
          </Group>
        )}

      </Group>

      <rect
        id="transparent-overlay-layer"
        x={-5}
        y={-5}
        width={xMax + 10}
        height={yMax + 10}
        fill="transparent"
        ref={containerRef}
        onMouseMove={e => handleTooltip(e)}
        onTouchMove={e => handleTooltip(e)}
        onTouchStart={e => handleTooltip(e)}
        onMouseOut={hideTooltip}
        onMouseLeave={hideTooltip}
      />

      {tooltipData?.data && (
        <>
          <Group>
            <Line
              from={{
                x: isHorizontal ? tooltipData.lineIndicatorPos : 0,
                y: isHorizontal ? 0 : tooltipData.lineIndicatorPos,
              }}
              to={{
                x: isHorizontal ? tooltipData.lineIndicatorPos : xMax,
                y: isHorizontal ? yMax : tooltipData.lineIndicatorPos,
              }}
              stroke={colorPaletteNeutrals.dimmed4}
              strokeWidth={1}
              opacity={0.6}
              pointerEvents="none"
              strokeDasharray="1 2"
            />

            {series.dataKey.map((s: string, i: number) => (
              <circle
                key={s}
                r={2}
                cx={isHorizontal
                  ? tooltipData.lineIndicatorPos
                  : seriesAxis.scale(getPrimitiveFromObjectPath(tooltipData.data, s))}
                cy={isHorizontal
                  ? seriesAxis.scale(getPrimitiveFromObjectPath(tooltipData.data, s))
                  : tooltipData.lineIndicatorPos}
                stroke={series.colors[i]}
                fill={series.colors[i]}
                strokeWidth={series.style?.[i]?.strokeWidth ?? 1}
              />
            ))}

            {hasOverlay && (
              <circle
                r={2}
                cx={isHorizontal
                  ? tooltipData.lineIndicatorPos
                  : overlayAxis?.scale(getPrimitiveFromObjectPath(tooltipData.data, overlay.dataKey))}
                cy={isHorizontal
                  ? overlayAxis?.scale(getPrimitiveFromObjectPath(tooltipData.data, overlay.dataKey))
                  : tooltipData.lineIndicatorPos}
                stroke={overlay.color}
                fill={overlay.color}
                strokeWidth={overlay.style?.strokeWidth ?? 1}
              />
            )}
          </Group>

          <Tooltip
            theme={theme}
            isOpen={tooltipOpen}
            top={tooltipTop}
            left={tooltipLeft}
          >
            <div className={LinesTooltipContent}>
              <p>
                <b>
                  { indexAxis.tickFormat
                    ? indexAxis.tickFormat(getPrimitiveFromObjectPath(tooltipData.data, index) ?? '')
                    : getPrimitiveFromObjectPath(tooltipData.data, index) ?? ''
                }
                </b>
              </p>

              <ul>
                {series.dataKey.map((s: string, i: number) => (
                  <li key={s}>
                    <div className={LinesTooltipSeries}>
                      <svg width={12} height={12}>
                        <rect
                          x={0}
                          y={0}
                          width={12}
                          height={12}
                          rx={2}
                          ry={2}
                          fill={series.colors[i]}
                        />
                      </svg>
                      <span>
                        {series.names[i]}
                      </span>
                    </div>

                    <div>
                      {tooltip?.extraSeriesData && (
                        <p>
                          {tooltip.extraSeriesData(_.at(tooltipData.data, getLabelFromObjectPath(s))[0])}
                        </p>
                      )}
                    </div>

                    <div>
                      <p>
                        <b>
                          {`${getPrimitiveFromObjectPath(tooltipData.data, s) ?? 'n/a'}`}
                        </b>
                      </p>
                    </div>
                  </li>
                ))}

                {hasOverlay && (
                  <li>
                    <div className={LinesTooltipSeries}>
                      <svg width={12} height={12}>
                        <rect
                          x={0}
                          y={0}
                          width={12}
                          height={12}
                          rx={2}
                          ry={2}
                          fill={overlay.color}
                        />
                      </svg>
                      <span>
                        {overlay.name}
                      </span>
                    </div>

                    <div>
                      {tooltip?.extraOverlayData && (
                        <p>
                          {tooltip.extraOverlayData(
                            _.at(tooltipData.data, getLabelFromObjectPath(overlay.dataKey))[0],
                          )}

                        </p>
                      )}
                    </div>

                    <div>
                      <p>
                        <b>
                          {`${getPrimitiveFromObjectPath(tooltipData.data, overlay.dataKey) ?? 'n/a'}`}
                        </b>
                      </p>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            { tooltip?.extraContent && (
              <div
                className={ExtraContent}
                style={{ borderColor: colorPaletteNeutrals.dimmed3 }}
              >
                {tooltip.extraContent}
              </div>
            )}
          </Tooltip>
        </>
      )}
    </Group>
  );
};

Lines.displayName = 'Lines';
