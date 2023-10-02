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

import { curveBasis } from '@visx/curve';
import { localPoint } from '@visx/event';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { ScaleLinear, ScaleTime } from '@visx/vendor/d3-scale';
import { useCallback } from 'react';

import {
  AxisType, CartesianChartLayout, Data, ThemeVariants,
} from '../../../types';
import { LineChartMetadata } from '../../line-chart/line-chart';
import { Tooltip } from '../../tooltip';

export type LinesProps = {
  theme: ThemeVariants;
  data: Data;
  metadata: LineChartMetadata;
  topPosition: number;
  leftPosition: number;
  top?: AxisType;
  right?: AxisType;
  bottom?: AxisType;
  left?: AxisType;
}

export const Lines = ({
  theme,
  data,
  metadata,
  topPosition: tPos,
  leftPosition: lPos,
  top,
  right,
  bottom,
  left,
}: LinesProps) => {
  const {
    index, collection, overlay, layout,
  } = metadata;

  const isHorizontal = layout === CartesianChartLayout.HORIZONTAL;

  const indexAxis = isHorizontal ? (bottom ?? top) : (left ?? right);
  const collectionAxis = isHorizontal ? (left ?? right) : (bottom ?? top);
  const overlayAxis = isHorizontal ? right : top;

  const indexId = isHorizontal ? 'x' : 'y';
  const collectionId = isHorizontal ? 'y' : 'x';

  const hasIndex = Boolean(indexAxis && index);
  const hasCollection = Boolean(collectionAxis && collection.length);
  const hasOverlay = Boolean(overlayAxis && overlay?.length);

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
        const fromNumber = s.invert(num) as number;
        const fromDate = s.invert(num).toLocaleString();
        res = scaleType === 'time' ? fromDate : fromNumber;
      }
    }

    return res;
  };

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

    const d = {
      content,
      coords,
      index: accessorInvert(indexAxis, coords[indexId]) ?? 0,
      collection: accessorInvert(collectionAxis, coords[collectionId]) ?? 0,
      overlay: accessorInvert(overlayAxis, coords[indexId]) ?? 0,
    };

    showTooltip({
      tooltipLeft: containerX ?? 0,
      tooltipTop: containerY ?? 0,
      tooltipData: d,
    });
  }, [
    collectionAxis,
    collectionId,
    containerBounds.left,
    containerBounds.top,
    indexAxis,
    indexId,
    overlayAxis,
    showTooltip]);

  if (!hasIndex || !hasCollection) return null;

  return (
    <Group
      top={tPos}
      left={lPos}
      ref={containerRef}
      onMouseMove={e => handleMouseMove(e, 'test')}
      onMouseOut={hideTooltip}
    >
      {collection.map(k => (
        <LinePath
          key={k}
          data={data}
          curve={curveBasis}
          x={(d: Record<string, unknown>) => (isHorizontal
            ? accessor(indexAxis!, index, d)
            : accessor(collectionAxis!, k, d))}
          y={(d: Record<string, unknown>) => (isHorizontal
            ? accessor(collectionAxis!, k, d)
            : accessor(indexAxis!, index, d))}
          stroke="#cf1c1c"
          strokeWidth={2}
          strokeOpacity={1}
          strokeDasharray=""
        />
      ))}
      {hasOverlay && overlay!.map(k => (
        <LinePath
          key={k}
          data={data}
          curve={curveBasis}
          x={(d: Record<string, unknown>) => (isHorizontal
            ? accessor(indexAxis!, index, d)
            : accessor(overlayAxis!, k, d))}
          y={(d: Record<string, unknown>) => (isHorizontal
            ? accessor(overlayAxis!, k, d)
            : accessor(indexAxis!, index, d))}
          stroke="#8f1389"
          strokeWidth={2}
          strokeOpacity={0.5}
          strokeDasharray=""
        />
      ))}
      <Tooltip
        theme={theme}
        isOpen={tooltipOpen}
        top={tooltipTop}
        left={tooltipLeft}
      >
        {/** @ts-expect-error: tootlidata typing */}
        <p style={{ fontSize: '12px' }}>{`date: ${tooltipData?.index.slice(0, 8)}`}</p>
        {/** @ts-expect-error: tootlidata typing */}
        <p style={{ fontSize: '12px' }}>{`feedback: ${tooltipData?.collection.toFixed()}`}</p>
        {/** @ts-expect-error: tootlidata typing */}
        {!!tooltipData?.overlay && <p style={{ fontSize: '12px' }}>{`overlay: ${tooltipData?.overlay.toFixed(2)}`}</p>}
      </Tooltip>
    </Group>
  );
};

Lines.displayName = 'Lines';
