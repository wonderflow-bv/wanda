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
import { Bounds, ResizeTriggerAreas } from '@visx/brush/lib/types';
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
  x, y, width, height, isBrushActive,
}: BrushHandleRenderProps) => {
  const { isHorizontal } = useLayoutContext();
  console.log(x, y, width, height);
  const pathWidth = 8;
  const pathHeight = 15;

  const lPos = isHorizontal ? (x + pathWidth / 2) : (x + pathHeight * 2);

  const tPos = isHorizontal ? (height - pathHeight) / 2 : (height - pathHeight) / 2;

  const style = isHorizontal
    ? { cursor: 'col-resize' }
    : { cursor: 'row-resize' };

  const transform = isHorizontal
    ? 'rotate(0)'
    : 'rotate(90)';

  if (!isBrushActive) {
    return null;
  }

  return (
    <Group
      left={lPos}
      top={tPos}
    >
      <path
        fill="#f2f2f2"
        d="M -4.5 0.5 L 3.5 0.5 L 3.5 15.5 L -4.5 15.5 L -4.5 0.5 M -1.5 4 L -1.5 12 M 0.5 4 L 0.5 12"
        stroke="#999999"
        strokeWidth="1"
        style={style}
        transform={transform}
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

  const { bottom, left } = axisSystem;
  const { maxWidth, maxHeight } = dimension;
  const { top: tPos, left: lPos } = position;

  const brushDirection = isHorizontal ? 'horizontal' : 'vertical';
  const resizeTriggerAreas: ResizeTriggerAreas[] = isHorizontal ? ['left', 'right'] : ['top', 'bottom'];

  const padding = 16;
  const brushSize = 50 - padding;
  const brushHeight = isHorizontal ? brushSize : maxHeight;
  const brushWidth = isHorizontal ? maxWidth : brushSize;
  const topPosition = isHorizontal ? tPos + padding : tPos;

  const margin = isHorizontal
    ? {
      top: 0, left: lPos, right: 0, bottom: 0,
    }
    : {
      top: tPos, left: 0, right: 0, bottom: 0,
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

  const patternTransform = `scale(.1) rotate(${isHorizontal ? 0 : 90})`;

  const onBrushChange = useCallback((domain: Bounds | null) => {
    if (!domain) return;

    let filteredData: Data = data;

    const {
      x0, x1, xValues, y0, y1, yValues,
    } = domain;

    const indexAxis = isHorizontal ? bottom : left;
    const indexScaleType = indexAxis!.scaleType;
    const indexDataKey = metadata!.index;

    const min = isHorizontal ? x0 : y0;
    const max = isHorizontal ? x1 : y1;
    const values = isHorizontal ? xValues : yValues;

    if (indexScaleType === 'label') {
      filteredData = data.filter((d) => {
        const value = getPrimitiveFromObjectByPath(d, indexDataKey);
        return values!.includes(value);
      });
    }

    if (indexScaleType === 'time') {
      filteredData = data.filter((d) => {
        const value = getPrimitiveFromObjectByPath(d, indexDataKey);
        const toTime = value ? new Date(value).getTime() : 0;
        return toTime >= min && toTime <= max;
      });
    }

    if (indexScaleType === 'linear') {
      filteredData = data.filter((d) => {
        const value = getPrimitiveFromObjectByPath(d, indexDataKey);
        const v = typeof value === 'number' ? value : (min - 1);
        return v >= min && v <= max;
      });
    }

    onChange(filteredData);
  }, [bottom, left, data, isHorizontal, metadata, onChange]);

  if (!isVisible) return null;

  return (
    <Group
      left={lPos}
      top={topPosition}
    >
      <defs>
        <pattern id="brush_pattern_lines" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform={patternTransform}>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#cartesian-grid-background)" />
          <path d="M0 10h20z" strokeWidth="1" stroke="#999" fill="none" />
        </pattern>
      </defs>

      <rect
        x={0}
        y={0}
        width={brushWidth}
        height={brushHeight}
        fill="url(#brush_pattern_lines)"
        stroke="white"
        style={{ pointerEvents: 'all', cursor: 'move' }}
      />

      <Brush
        brushDirection={brushDirection}
        brushRegion="chart"
        handleSize={8}
        innerRef={brushRef}
        initialBrushPosition={initialBrushPosition}
        margin={margin}
        onBrushStart={undefined}
        onBrushEnd={undefined}
        onChange={onBrushChange}
        onClick={undefined}
        resizeTriggerAreas={resizeTriggerAreas}
        selectedBoxStyle={selectedBoxStyle}
        xAxisOrientation="bottom"
        yAxisOrientation="left"
        xScale={bottom?.scale}
        yScale={left?.scale}
        renderBrushHandle={(props: BrushHandleRenderProps) => <BrushHandle {...props} />}
        useWindowMoveEvents
        width={brushWidth}
        height={brushHeight}
      />
    </Group>
  );
};

CartesianBaseBrush.displayName = 'CartesianBaseBrush';
