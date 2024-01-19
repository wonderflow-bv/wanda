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
import { BrushHandleRenderProps } from '@visx/brush/lib/BrushHandle';
import { Group } from '@visx/group';

import { useBrush } from '../../hooks';
import {
  useLayoutContext, useStyleConfigContext, useThemeContext,
} from '../../providers';
import { CartesianxAxisSystem, Data } from '../../types';

export type CartesianBaseBrushProps = {
  axisSystem: CartesianxAxisSystem;
  brushSize?: number;
  padding?: number;
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
  x, y, height, isBrushActive,
}: BrushHandleRenderProps) => {
  const { isHorizontal } = useLayoutContext();
  const { brush, themes } = useStyleConfigContext();
  const theme = useThemeContext();

  const pathWidth = 8;
  const pathHeight = 16;

  const lPos = isHorizontal ? (x + pathWidth / 2) : (x + pathHeight * 1.75);
  const tPos = isHorizontal ? (height - pathHeight) / 2 : (y + pathWidth / 2);

  const style = {
    stroke: themes[theme].brush.handle.stroke,
    strokeWidth: brush.handle.strokeWidth,
    fill: themes[theme].brush.handle.fill,
    cursor: isHorizontal
      ? { cursor: 'col-resize' }
      : { cursor: 'row-resize' },
    transform: isHorizontal
      ? 'rotate(0)'
      : 'rotate(90)',
  };

  if (!isBrushActive) {
    return null;
  }

  return (
    <Group
      left={lPos}
      top={tPos}
    >
      <path
        fill={style.fill}
        d="M -4.5 0.5 L 3.5 0.5 L 3.5 15.5 L -4.5 15.5 L -4.5 0.5 M -1.5 4 L -1.5 12 M 0.5 4 L 0.5 12"
        stroke={style.stroke}
        strokeWidth={style.strokeWidth}
        style={style.cursor}
        transform={style.transform}
      />
    </Group>
  );
};

export const CartesianBaseBrush: React.FC<CartesianBaseBrushProps> = ({
  axisSystem,
  brushSize = 32,
  dimension,
  isVisible = false,
  padding = 16,
  position,
  onChange,
}) => {
  const {
    ref,
    brushDirection,
    brushHeight,
    brushWidth,
    initialBrushPosition,
    margin,
    position: pos,
    resizeTriggerAreas,
    scale,
    style,
    handleBrushClear,
    handleBrushChange,
  } = useBrush({
    axisSystem,
    brushSize,
    dimension,
    isVisible,
    padding,
    position,
    onChange,
  });

  if (!isVisible) return null;

  return (
    <Group
      left={pos.left}
      top={pos.top}
      aria-hidden="false"
    >
      <defs>
        <pattern id="brush_pattern_lines" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform={style.pattern.transform}>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#cartesian-grid-background)" />
          <path d="M0 10h20z" strokeWidth={style.pattern.strokeWidth} stroke={style.pattern.stroke} fill={style.pattern.fill} />
        </pattern>
      </defs>

      <rect
        x={0}
        y={0}
        width={brushWidth}
        height={brushHeight}
        fill="url(#brush_pattern_lines)"
        style={{ pointerEvents: 'all', cursor: 'move' }}
      />

      <Brush
        brushDirection={brushDirection}
        brushRegion="chart"
        handleSize={8}
        innerRef={ref}
        initialBrushPosition={initialBrushPosition}
        margin={margin}
        onBrushStart={undefined}
        onBrushEnd={undefined}
        onChange={handleBrushChange}
        onClick={handleBrushClear}
        resizeTriggerAreas={resizeTriggerAreas}
        selectedBoxStyle={style.selectedBox}
        xAxisOrientation="bottom"
        yAxisOrientation="left"
        xScale={scale.x}
        yScale={scale.y}
        renderBrushHandle={(props: BrushHandleRenderProps) => <BrushHandle {...props} />}
        useWindowMoveEvents
        width={brushWidth}
        height={brushHeight}
      />
    </Group>
  );
};

CartesianBaseBrush.displayName = 'CartesianBaseBrush';
