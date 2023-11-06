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

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/naming-convention */
// @ts-nocheck

import { Label } from '@visx/annotation';
import { localPoint } from '@visx/event';
import { Group } from '@visx/group';
import { Line, LinePath } from '@visx/shape';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import _ from 'lodash';
import { useCallback, useMemo } from 'react';

import { colorPaletteNeutrals } from '../../../style-config';
import {
  AxisType, CartesianChartLayout, Data, ThemeVariants,
} from '../../../types';
import {
  accessorInvert,
  bisectIndex,
  getCoordinates,
  getLabelFromObjectPath,
  getLinesRenderer,
  getPrimitiveFromObjectPath,
  isMarkerLabelActive,
} from '../../../utils';
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

  const renderer = useMemo(() => getLinesRenderer(renderAs, isHorizontal), [isHorizontal, renderAs]);

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

  const handleTooltip = useCallback((event: React.MouseEvent<ownerSVGElement>) => {
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
  }, [containerBounds, indexAxis, isHorizontal, data, showTooltip]);

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

  const getMarkerLabelProps = (
    datum: Record<string, unknown>,
    dataKey: string,
    isHorizontal: boolean,
    isOverlay: boolean,
  ): {
    anchor: 'middle' | 'start' | 'end' | 'inherit' | undefined;
    dx: number;
    dy: number;
  } => {
    let anchor = 'middle';
    let dx = 0;
    let dy = 0;

    const pos = isOverlay
      ? getOverlayCoordinates(datum, dataKey, isHorizontal)
      : getSeriesCoordinates(datum, dataKey, isHorizontal);

    const isLeft = pos.x < (xMax * 0.075);
    const isRigth = pos.x > (xMax * 0.9);
    const isTop = pos.y < (yMax * 0.075);
    const isBottom = pos.y > (yMax * 0.9);

    if (isHorizontal) {
      if (isLeft) {
        anchor = 'start';
        dx = 4;
      }

      if (isRigth) {
        anchor = 'end';
        dx = -4;
      }

      if (isBottom) {
        dy = -6;
      } else {
        dy = 28;
      }
    } else {
      anchor = 'start';

      if (isTop) {
        dy = 24;
      } else {
        dy = -6;
      }

      if (isLeft) {
        dx = 6;
      }

      if (isRigth) {
        anchor = 'end';
      }
    }

    return {
      anchor,
      dx,
      dy,
    };
  };

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
            ) && data.map((d: Record<string, any>) => (
              <circle
                key={JSON.stringify(d)}
                r={2}
                cx={getSeriesCoordinates(d, k, isHorizontal).x}
                cy={getSeriesCoordinates(d, k, isHorizontal).y}
                stroke={series.colors[i]}
                fill={theme === 'light' ? colorPaletteNeutrals.white : colorPaletteNeutrals.black}
                strokeWidth={series.style?.[i]?.strokeWidth ?? 1}
                strokeOpacity={series.style?.[i]?.strokeOpacity ?? 1}
              />
            ))}

            {(showMarkerLabel || series.style?.[i]?.showMarkerLabel)
            && data.map((d: Record<string, any>, di: number) => (
              isMarkerLabelActive(di, data.length)
                ? (
                  <Label
                    key={JSON.stringify(d)}
                    backgroundFill="#ccc"
                    x={getSeriesCoordinates(d, k, isHorizontal).x}
                    y={getSeriesCoordinates(d, k, isHorizontal).y}
                    title={`${getPrimitiveFromObjectPath(d, k) ?? ''}`}
                    titleFontSize={12}
                    titleFontWeight={400}
                    titleProps={{
                      x: getMarkerLabelProps(d, k, isHorizontal, false).dx + 4,
                      y: getMarkerLabelProps(d, k, isHorizontal, false).dy + 4,
                    }}
                    showAnchorLine={false}
                    horizontalAnchor={getMarkerLabelProps(d, k, isHorizontal, false).anchor}
                    verticalAnchor="end"
                    showBackground
                    backgroundPadding={{
                      top: 4, right: 6, bottom: 4, left: 6,
                    }}
                    backgroundProps={{
                      rx: 4,
                      ry: 4,
                      x: getMarkerLabelProps(d, k, isHorizontal, false).dx,
                      y: getMarkerLabelProps(d, k, isHorizontal, false).dy,
                    }}
                  />
                ) : null
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
            || overlay.style?.showMarker
            || overlay.style?.showMarkerLabel
            ) && data.map((d: Record<string, any>) => (
              <circle
                key={JSON.stringify(d)}
                r={2}
                cx={getOverlayCoordinates(d, overlay.dataKey!, isHorizontal).x}
                cy={getOverlayCoordinates(d, overlay.dataKey!, isHorizontal).y}
                stroke={overlay.color}
                fill={theme === 'light' ? colorPaletteNeutrals.white : colorPaletteNeutrals.black}
                strokeWidth={overlay.style?.strokeWidth ?? 1}
                strokeOpacity={overlay.style?.strokeOpacity ?? 1}
              />
            ))}

            {(showMarkerLabel || overlay.style?.showMarkerLabel)
            && data.map((d: Record<string, any>, di: number) => (
              isMarkerLabelActive(di, data.length) ? (
                <Label
                  key={JSON.stringify(d)}
                  backgroundFill="#ccc"
                  x={getOverlayCoordinates(d, overlay.dataKey!, isHorizontal).x}
                  y={getOverlayCoordinates(d, overlay.dataKey!, isHorizontal).y}
                  title={`${getPrimitiveFromObjectPath(d, overlay.dataKey!) ?? ''}`}
                  titleFontSize={12}
                  titleFontWeight={400}
                  titleProps={{
                    x: getMarkerLabelProps(d, overlay.dataKey!, isHorizontal, true).dx + 4,
                    y: getMarkerLabelProps(d, overlay.dataKey!, isHorizontal, true).dy + 4,
                  }}
                  showAnchorLine={false}
                  horizontalAnchor={getMarkerLabelProps(d, overlay.dataKey!, isHorizontal, true).anchor}
                  verticalAnchor="end"
                  showBackground
                  backgroundPadding={{
                    top: 4, right: 6, bottom: 4, left: 6,
                  }}
                  backgroundProps={{
                    rx: 4,
                    ry: 4,
                    x: getMarkerLabelProps(d, overlay.dataKey!, isHorizontal, true).dx,
                    y: getMarkerLabelProps(d, overlay.dataKey!, isHorizontal, true).dy,
                  }}
                />
              ) : null
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
                            _.at(tooltipData.data, getLabelFromObjectPath(overlay.dataKey!))[0],
                          )}

                        </p>
                      )}
                    </div>

                    <div>
                      <p>
                        <b>
                          {`${getPrimitiveFromObjectPath(tooltipData.data, overlay.dataKey!) ?? 'n/a'}`}
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
