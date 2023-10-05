/* eslint-disable @typescript-eslint/naming-convention */
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
import { LinePath } from '@visx/shape';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { bisector } from '@visx/vendor/d3-array';
import { ScaleLinear, ScaleTime } from '@visx/vendor/d3-scale';
import { useCallback } from 'react';

import {
  AxisType, CartesianChartLayout, Data, ThemeVariants,
} from '../../../types';
import { LineChartMetadata } from '../../line-chart/line-chart';
import { Tooltip } from '../../tooltip';
import { LinesItem, LinesItemGroup } from './lines.module.css';

export type LinesProps = {
  theme: ThemeVariants;
  data: Data;
  metadata: LineChartMetadata;
  topPosition: number;
  leftPosition: number;
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
  axis,
}: LinesProps) => {
  const {
    top, right, bottom, left,
  } = axis;
  const {
    index, series, overlay, layout, showPoints,
  } = metadata;

  const isHorizontal = layout === CartesianChartLayout.HORIZONTAL;

  const indexAxis = isHorizontal ? bottom! : left!;
  const seriesAxis = isHorizontal ? left! : bottom!;
  const overlayAxis = isHorizontal ? right : top;

  const hasOverlay = Boolean(overlayAxis && overlay?.length);

  const indexId = isHorizontal ? 'x' : 'y';
  const seriesId = isHorizontal ? 'y' : 'x';

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
    // eslint-disable-next-line @typescript-eslint/naming-convention
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

  const handleMouseMove = useCallback((event: any, content: string) => {
    const containerX = ('clientX' in event ? event.clientX : 0) - containerBounds.left;
    const containerY = ('clientY' in event ? event.clientY : 0) - containerBounds.top;

    const coords = localPoint(event.target.ownerSVGElement, event) ?? { x: 0, y: 0 };

    const dateIndex = bisectIndex(indexAxis.domain, accessorInvert(indexAxis, coords[indexId]) as any);
    const fromDate = indexAxis.domain[dateIndex - 1];
    const toSeries = seriesAxis.domain[dateIndex - 1];
    const toOverlay = overlayAxis?.domain[dateIndex - 1];

    const d = {
      content,
      coords,
      index: accessorInvert(indexAxis, coords[indexId]) ?? 0,
      series: accessorInvert(seriesAxis, coords[seriesId]) ?? 0,
      overlay: accessorInvert(overlayAxis, coords[seriesId]) ?? 0,
      fromDate,
      toSeries,
      toOverlay,
    };

    showTooltip({
      tooltipLeft: containerX,
      tooltipTop: containerY,
      tooltipData: d,
    });
  }, [
    containerBounds.left,
    containerBounds.top,
    bisectIndex,
    indexAxis,
    indexId,
    seriesAxis,
    overlayAxis,
    seriesId,
    showTooltip]);

  return (
    <Group
      className={LinesItemGroup}
      top={tPos}
      left={lPos}
      innerRef={containerRef}
      onMouseMove={e => handleMouseMove(e, 'test')}
      onMouseOut={hideTooltip}
    >

      {series.map((k: string) => (
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
            stroke="#cf1c1c"
            strokeWidth={2}
            strokeOpacity={1}
            strokeDasharray=""
          />
          {showPoints && data.map(d => (
            <circle
              key={JSON.stringify(d)}
              r={1.5}
              cx={isHorizontal
                ? accessor(indexAxis, index, d)
                : accessor(seriesAxis, k, d)}
              cy={isHorizontal
                ? accessor(seriesAxis, k, d)
                : accessor(indexAxis, index, d)}
              stroke="white"
              fill="#cf1c1c"
            />
          ))}
        </Group>
      ))}
      {hasOverlay && (
        <LinePath
          className={LinesItem}
          data={data}
          curve={curveCatmullRom}
          x={(d: Record<string, unknown>) => (isHorizontal
            ? accessor(indexAxis, index, d)
            : accessor(overlayAxis!, overlay!, d))}
          y={(d: Record<string, unknown>) => (isHorizontal
            ? accessor(overlayAxis!, overlay!, d)
            : accessor(indexAxis, index, d))}
          stroke="#0e9044"
          strokeWidth={2}
          strokeOpacity={0.5}
          strokeDasharray=""
        />
      )}
      <Tooltip
        theme={theme}
        isOpen={tooltipOpen}
        top={tooltipTop}
        left={tooltipLeft}
      >
        {/** @ts-expect-error: tootlidata typing */}
        <p style={{ fontSize: '12px' }}>{`date: ${tooltipData?.fromDate}`}</p>
        {/** @ts-expect-error: tootlidata typing */}
        <p style={{ fontSize: '12px' }}>{`feedback: ${tooltipData?.toSeries}`}</p>
        {/** @ts-expect-error: tootlidata typing */}
        {!!tooltipData?.overlay && <p style={{ fontSize: '12px' }}>{`overlay: ${tooltipData?.toOverlay}`}</p>}
      </Tooltip>
    </Group>
  );
};

Lines.displayName = 'Lines';
