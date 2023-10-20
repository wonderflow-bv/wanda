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
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { bisector } from '@visx/vendor/d3-array';
import { ScaleLinear, ScaleTime } from '@visx/vendor/d3-scale';
import _ from 'lodash';
import { useCallback, useMemo } from 'react';

import { colorPaletteNeutrals, defaultLineChartPalette } from '../../../style-config';
import {
  AxisType, CartesianChartLayout, Data, ThemeVariants,
} from '../../../types';
import { getLabelFromObjectPath, getPrimitiveFromObjectPath } from '../../../utils';
import { LineChartMetadata } from '../../line-chart/line-chart';
import { Tooltip } from '../../tooltip';
import { LinesItem, LinesItemGroup } from './lines.module.css';

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
    index, series, overlay, layout, showMarker, styleSeries, styleOverlay, renderAs,
  } = metadata;

  const isHorizontal = layout === CartesianChartLayout.HORIZONTAL;

  const indexAxis = isHorizontal ? bottom! : left!;
  const seriesAxis = isHorizontal ? left! : bottom!;
  const overlayAxis = isHorizontal ? right : top;

  const hasOverlay = Boolean(overlayAxis && overlay?.length);

  const palette = useMemo(() => defaultLineChartPalette[theme], [theme]);

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

  const handleTooltip = useCallback((event: any, extraContent?: unknown) => {
    const { scaleType, domain, scale } = indexAxis;
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

    const tooltipLeft = coords.x + lBound / 4;
    const tooltipTop = coords.y + tBound / 4;

    const tooltipData = {
      coords,
      extraContent,
      data: data[bisectValueIndexOf],
      lineIndicatorPos,
    };

    showTooltip({
      tooltipLeft,
      tooltipTop,
      tooltipData,
    });
  }, [containerBounds, indexAxis, isHorizontal, bisectIndex, data, showTooltip]);

  return (
    <Group
      top={tPos}
      left={lPos}
    >
      <Group className={LinesItemGroup}>
        {series.map((k: string, i: number) => (
          <Group key={k} className={LinesItem}>
            <LinePath
              data={data}
              curve={renderer}
              x={(d: Record<string, unknown>) => (isHorizontal
                ? accessor(indexAxis, index, d)
                : accessor(seriesAxis, k, d))}
              y={(d: Record<string, unknown>) => (isHorizontal
                ? accessor(seriesAxis, k, d)
                : accessor(indexAxis, index, d))}
              stroke={styleSeries?.[i]?.stroke ?? palette.series[i]}
              strokeWidth={styleSeries?.[i]?.strokeWidth ?? 2}
              strokeOpacity={styleSeries?.[i]?.strokeOpacity ?? 1}
              strokeDasharray={styleSeries?.[i]?.strokeDasharray}
            />

            {showMarker && data.map(d => (
              <circle
                key={JSON.stringify(d)}
                r={2}
                cx={isHorizontal
                  ? accessor(indexAxis, index, d)
                  : accessor(seriesAxis, k, d)}
                cy={isHorizontal
                  ? accessor(seriesAxis, k, d)
                  : accessor(indexAxis, index, d)}
                stroke={styleSeries?.[i] ? styleSeries[i]?.stroke : palette.series[i]}
                fill={theme === 'light' ? colorPaletteNeutrals.white : colorPaletteNeutrals.black}
                strokeWidth={styleSeries?.[i]?.strokeWidth ?? 1}
                strokeOpacity={styleSeries?.[i]?.strokeOpacity ?? 1}
              />
            ))}
          </Group>
        ))}

        {hasOverlay && (
          <Group className={LinesItem}>
            <LinePath
              data={data}
              curve={renderer}
              x={(d: Record<string, unknown>) => (isHorizontal
                ? accessor(indexAxis, index, d)
                : accessor(overlayAxis!, overlay, d))}
              y={(d: Record<string, unknown>) => (isHorizontal
                ? accessor(overlayAxis!, overlay, d)
                : accessor(indexAxis, index, d))}
              stroke={styleOverlay?.stroke ?? palette.overlay}
              strokeWidth={styleOverlay?.strokeWidth ?? 2}
              strokeOpacity={styleOverlay?.strokeOpacity ?? 1}
              strokeDasharray={styleOverlay?.strokeDasharray}
            />

            {showMarker && data.map(d => (
              <circle
                key={JSON.stringify(d)}
                r={2}
                cx={isHorizontal
                  ? accessor(indexAxis, index, d)
                  : accessor(overlayAxis!, overlay, d)}
                cy={isHorizontal
                  ? accessor(overlayAxis!, overlay, d)
                  : accessor(indexAxis, index, d)}
                stroke={styleOverlay?.stroke ?? palette.overlay}
                fill={theme === 'light' ? colorPaletteNeutrals.white : colorPaletteNeutrals.black}
                strokeWidth={styleOverlay?.strokeWidth ?? 1}
                strokeOpacity={styleOverlay?.strokeOpacity ?? 1}
              />
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

          {series.map((s: string, i: number) => (
            <circle
              key={s}
              r={2}
              cx={isHorizontal
                ? tooltipData.lineIndicatorPos
                : seriesAxis.scale(getPrimitiveFromObjectPath(tooltipData.data, s))}
              cy={isHorizontal
                ? seriesAxis.scale(getPrimitiveFromObjectPath(tooltipData.data, s))
                : tooltipData.lineIndicatorPos}
              stroke={styleSeries?.[i] ? styleSeries?.[i].stroke : palette.series[i]}
              fill={styleSeries?.[i] ? styleSeries?.[i].stroke : palette.series[i]}
              strokeWidth={styleSeries?.[i]?.strokeWidth ?? 1}
              strokeOpacity={styleSeries?.[i]?.strokeOpacity ?? 1}
            />
          ))}

          {hasOverlay && (
            <circle
              r={2}
              cx={isHorizontal
                ? tooltipData.lineIndicatorPos
                : overlayAxis?.scale(getPrimitiveFromObjectPath(tooltipData.data, overlay))}
              cy={isHorizontal
                ? overlayAxis?.scale(getPrimitiveFromObjectPath(tooltipData.data, overlay))
                : tooltipData.lineIndicatorPos}
              stroke={styleOverlay?.stroke ?? palette.overlay}
              fill={styleOverlay?.stroke ?? palette.overlay}
              strokeWidth={styleOverlay?.strokeWidth ?? 1}
              strokeOpacity={styleOverlay?.strokeOpacity ?? 1}
            />
          )}
        </Group>
      )}

      {tooltipData?.data && (
        <Tooltip
          theme={theme}
          isOpen={tooltipOpen}
          top={tooltipTop}
          left={tooltipLeft}
        >
          <p style={{ fontSize: '12px', fontWeight: '700' }}>{`${getPrimitiveFromObjectPath(tooltipData.data, index) ?? ''}`}</p>
          {series.map(s => (
            <p key={s} style={{ fontSize: '12px' }}>
              {`${_.startCase(getLabelFromObjectPath(s))}: ${getPrimitiveFromObjectPath(tooltipData.data, s) ?? 'n.d.'}`}
            </p>
          ))}
          {overlay && (
            <p style={{ fontSize: '12px' }}>
              {`${_.startCase(overlayAxis?.label) ?? _.startCase(getLabelFromObjectPath(overlay))}: ${getPrimitiveFromObjectPath(tooltipData.data, overlay) ?? 'n.d.'}`}
            </p>
          )}
        </Tooltip>
      )}
    </Group>
  );
};

Lines.displayName = 'Lines';
