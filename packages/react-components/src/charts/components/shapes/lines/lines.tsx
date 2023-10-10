/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/naming-convention */
// @ts-nocheck

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

import {
  curveCatmullRom,
} from '@visx/curve';
import { localPoint } from '@visx/event';
import { Group } from '@visx/group';
import { Line, LinePath } from '@visx/shape';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { bisector } from '@visx/vendor/d3-array';
import { ScaleLinear, ScaleTime } from '@visx/vendor/d3-scale';
import { useCallback, useMemo } from 'react';

import { colorPaletteNeutrals, defaultLineChartPalette } from '../../../style-config';
import {
  AxisType, CartesianChartLayout, Data, ThemeVariants,
} from '../../../types';
import { handleSeries } from '../../../utils';
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
    index, series, overlay, layout, showPoints, styleSeries, styleOverlay,
  } = metadata;

  const palette = useMemo(() => defaultLineChartPalette[theme], [theme]);

  const isHorizontal = layout === CartesianChartLayout.HORIZONTAL;

  const indexAxis = isHorizontal ? bottom! : left!;
  const seriesAxis = isHorizontal ? left! : bottom!;
  const overlayAxis = isHorizontal ? right : top;

  const hasOverlay = Boolean(overlayAxis && overlay?.length);

  const indexId = isHorizontal ? 'x' : 'y';

  const accessor = (axis: AxisType, dataKey: string, d?: Record<string, unknown>) => {
    let value = 0;
    if (axis.scale && d && d[dataKey]) {
      const t = axis.scaleType === 'time' ? new Date(d[dataKey] as string | number) : d[dataKey];
      value = axis.scale(t as any) ?? 0;
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
      }
    }

    return res;
  };

  const bisectIndex = bisector((index: string | number) => new Date(index)).left;

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

  const handleTooltip = useCallback((event: any, content?: unknown) => {
    const coords = localPoint(event.target.ownerSVGElement, event) ?? { x: 0, y: 0 };

    const containerX = coords.x - containerBounds.left;
    const containerY = coords.y + containerBounds.top / 2;

    const indexAccessorInvert = accessorInvert(indexAxis, coords[indexId]);
    const indexBisectValue = bisectIndex(indexAxis.domain, indexAccessorInvert as any, 0) - 1;

    const indexData = indexAxis.domain[indexBisectValue];
    const overlayData = overlayAxis?.domain[indexBisectValue];
    const allSeries = handleSeries(data, series)
      .map(s => ({
        label: series.length > 1 ? _.capitalize(s.label) : seriesAxis.label,
        data: s.data[indexBisectValue],
      }));

    const indexValue = indexAxis.domain[indexBisectValue];
    const indexScaleValue = indexAxis.scaleType === 'time' ? new Date(indexValue) : indexValue;
    const tooltipLineIndexPos = indexAxis.scale(indexScaleValue as any);

    const tooltipData = {
      coords,
      content,
      index: {
        data: indexData,
        label: indexAxis.label ?? index,
      },
      series: allSeries,
      overlay: {
        data: overlayData,
        label: overlayAxis?.label ?? overlay,
      },
      tooltipLineIndexPos,
    };

    showTooltip({
      tooltipLeft: containerX,
      tooltipTop: containerY,
      tooltipData,
    });
  }, [containerBounds.left,
    containerBounds.top,
    indexAxis,
    indexId,
    bisectIndex,
    overlayAxis?.domain,
    overlayAxis?.label,
    data,
    series,
    index,
    overlay,
    showTooltip,
    seriesAxis.label]);

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
              curve={curveCatmullRom}
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
            {showPoints && data.map(d => (
              <circle
                key={JSON.stringify(d)}
                r={2}
                cx={isHorizontal
                  ? accessor(indexAxis, index, d)
                  : accessor(seriesAxis, k, d)}
                cy={isHorizontal
                  ? accessor(seriesAxis, k, d)
                  : accessor(indexAxis, index, d)}
                stroke={styleSeries?.[i] ? styleSeries[i].stroke : palette.series[i]}
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
              curve={curveCatmullRom}
              x={(d: Record<string, unknown>) => (isHorizontal
                ? accessor(indexAxis, index, d)
                : accessor(overlayAxis!, 'overlay', d))}
              y={(d: Record<string, unknown>) => (isHorizontal
                ? accessor(overlayAxis!, 'overlay', d)
                : accessor(indexAxis, index, d))}
              stroke={styleOverlay?.stroke ?? palette.overlay}
              strokeWidth={styleOverlay?.strokeWidth ?? 2}
              strokeOpacity={styleOverlay?.strokeOpacity ?? 1}
              strokeDasharray={styleOverlay?.strokeDasharray}
            />
            {showPoints && data.map(d => (
              <circle
                key={JSON.stringify(d)}
                r={2}
                cx={isHorizontal
                  ? accessor(indexAxis, index, d)
                  : accessor(overlayAxis!, 'overlay', d)}
                cy={isHorizontal
                  ? accessor(overlayAxis!, 'overlay', d)
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

      {tooltipData && (
        <Group>
          <Line
            from={{
              x: isHorizontal ? tooltipData.tooltipLineIndexPos : 0,
              y: isHorizontal ? 0 : tooltipData.tooltipLineIndexPos,
            }}
            to={{
              x: isHorizontal ? tooltipData.tooltipLineIndexPos : xMax,
              y: isHorizontal ? yMax : tooltipData.tooltipLineIndexPos,
            }}
            stroke={colorPaletteNeutrals.dimmed4}
            strokeWidth={1}
            opacity={0.6}
            pointerEvents="none"
            strokeDasharray="1,2 "
          />

          {tooltipData.series.map((s: { data: string | number; label: string }, i: number) => (
            <circle
              key={s.label}
              r={2}
              cx={isHorizontal
                ? tooltipData.tooltipLineIndexPos
                : seriesAxis.scale(s.data)}
              cy={isHorizontal
                ? seriesAxis.scale(s.data)
                : tooltipData.tooltipLineIndexPos}
              stroke={styleSeries?.[i] ? styleSeries[i].stroke : palette.series[i]}
              fill={styleSeries?.[i] ? styleSeries[i].stroke : palette.series[i]}
              strokeWidth={styleSeries?.[i]?.strokeWidth ?? 1}
              strokeOpacity={styleSeries?.[i]?.strokeOpacity ?? 1}
            />
          ))}

          {tooltipData.overlay && (
            <circle
              r={2}
              cx={isHorizontal
                ? tooltipData.tooltipLineIndexPos
                : overlayAxis?.scale(tooltipData.overlay.data)}
              cy={isHorizontal
                ? overlayAxis?.scale(tooltipData.overlay.data)
                : tooltipData.tooltipLineIndexPos}
              stroke={styleOverlay?.stroke ?? palette.overlay}
              fill={styleOverlay?.stroke ?? palette.overlay}
              strokeWidth={styleOverlay?.strokeWidth ?? 1}
              strokeOpacity={styleOverlay?.strokeOpacity ?? 1}
            />
          )}

        </Group>
      )}

      {tooltipData && (
        <Tooltip
          theme={theme}
          isOpen={tooltipOpen}
          top={tooltipTop}
          left={tooltipLeft}
        >
          <p style={{ fontSize: '12px' }}>{`${tooltipData.index.label}: ${tooltipData.index.data}`}</p>
          {tooltipData.series.map(s => <p key={s.label} style={{ fontSize: '12px' }}>{`${s.label}: ${s.data}`}</p>)}
          {!!tooltipData.overlay?.data && <p style={{ fontSize: '12px' }}>{`${tooltipData.overlay.label}: ${tooltipData.overlay.data}`}</p>}
        </Tooltip>
      )}
    </Group>
  );
};

Lines.displayName = 'Lines';
