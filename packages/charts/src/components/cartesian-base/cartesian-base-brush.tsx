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

import { Brush } from '@visx/brush';
import BaseBrush from '@visx/brush/lib/BaseBrush';
import { BrushHandleRenderProps } from '@visx/brush/lib/BrushHandle';
import { Bounds } from '@visx/brush/lib/types';
import { Group } from '@visx/group';
import { useCallback, useEffect, useRef } from 'react';

import { useDataContext, useLayoutContext } from '../../providers';
import { CartesianxAxisSystem, Data } from '../../types';
import { getPrimitiveFromObjectByPath } from '../../utils';

export type CartesianBaseBrushProps = {
  axisSystem: CartesianxAxisSystem;
  position: {
    top: number;
    left: number;
  };
  dimension: {
    maxWidth: number;
    maxHeight: number;
  };
  isVisible?: boolean;
  onChange: (filteredData: Data) => void;
}

const BrushHandle = ({
  x, height, isBrushActive,
}: BrushHandleRenderProps) => {
  const pathWidth = 8;
  const pathHeight = 15;

  if (!isBrushActive) {
    return null;
  }

  return (
    <Group
      left={x + pathWidth / 2}
      top={(height - pathHeight) / 2}
    >
      <path
        fill="#f2f2f2"
        d="M -4.5 0.5 L 3.5 0.5 L 3.5 15.5 L -4.5 15.5 L -4.5 0.5 M -1.5 4 L -1.5 12 M 0.5 4 L 0.5 12"
        stroke="#999999"
        strokeWidth="1"
        style={{ cursor: 'ew-resize' }}
      />
    </Group>
  );
};

export const CartesianBaseBrush: React.FC<CartesianBaseBrushProps> = ({
  axisSystem,
  dimension,
  isVisible = false,
  position,
  onChange,
}) => {
  const brushRef = useRef<BaseBrush | null>(null);

  const { isHorizontal } = useLayoutContext();
  const { data, metadata } = useDataContext();

  useEffect(() => {
    onChange(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const { maxWidth } = dimension;
  const { bottom, left } = axisSystem;

  const margin = {
    top: 0, left: 0, right: 0, bottom: 0,
  };

  const initialBrushPosition = {
    start: { x: 0 },
    end: { x: maxWidth },
  };

  const selectedBoxStyle = {
    fill: 'grey',
    fillOpacity: 0.2,
    stroke: '#999',
    strokeWidth: 1,
    strokeOpacity: 0.8,
  };

  const onBrushChange = useCallback((domain: Bounds | null) => {
    if (!domain) return;

    const indexAxis = isHorizontal ? bottom : left;

    if (isHorizontal) {
      const { x0, x1, xValues } = domain;
      const indexScaleType = indexAxis!.scaleType;
      const indexDataKey = metadata!.index;

      let filteredData: Data = data;

      if (indexScaleType === 'label') {
        filteredData = data.filter((d) => {
          const value = getPrimitiveFromObjectByPath(d, indexDataKey);
          return xValues!.includes(value);
        });
      }

      if (indexScaleType === 'time') {
        filteredData = data.filter((d) => {
          const value = getPrimitiveFromObjectByPath(d, indexDataKey);
          const toTime = value ? new Date(value).getTime() : 0;
          return toTime >= x0 && toTime <= x1;
        });
      }

      if (indexScaleType === 'linear') {
        filteredData = data.filter((d) => {
          const value = getPrimitiveFromObjectByPath(d, indexDataKey);
          const v = typeof value === 'number' ? value : (x0 - 1);
          return v >= x0 && v <= x1;
        });
      }

      onChange(filteredData);
    }
  }, [bottom, left, data, isHorizontal, metadata, onChange]);

  if (!isVisible) return null;

  const paddingTop = 16;
  const brushHeight = 50 - paddingTop;

  return (
    <Group
      left={position.left}
      top={position.top + paddingTop}
    >
      <defs>
        <pattern id="brush_pattern_lines" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="scale(.1) rotate(00)">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#cartesian-grid-background)" />
          <path d="M0 10h20z" strokeWidth="1" stroke="#999" fill="none" />
        </pattern>
      </defs>

      <rect
        x={0}
        y={0}
        width={maxWidth}
        height={brushHeight}
        fill="url(#brush_pattern_lines)"
        stroke="white"
        style={{ pointerEvents: 'all', cursor: 'move' }}
      />

      <Brush
        brushDirection="horizontal"
        brushRegion="chart"
        handleSize={8}
        innerRef={brushRef}
        initialBrushPosition={initialBrushPosition}
        margin={margin}
        onBrushStart={undefined}
        onBrushEnd={undefined}
        onChange={onBrushChange}
        onClick={undefined}
        resizeTriggerAreas={['left', 'right']}
        selectedBoxStyle={selectedBoxStyle}
        xAxisOrientation="bottom"
        yAxisOrientation="left"
        xScale={bottom?.scale}
        yScale={left?.scale}
        renderBrushHandle={(props: BrushHandleRenderProps) => <BrushHandle {...props} />}
        useWindowMoveEvents
        width={maxWidth}
        height={brushHeight}
      />
    </Group>
  );
};

CartesianBaseBrush.displayName = 'CartesianBaseBrush';
