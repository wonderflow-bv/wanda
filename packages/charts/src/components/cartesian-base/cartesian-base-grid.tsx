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

import { LinearGradient } from '@visx/gradient';
import { GridColumns, GridRows } from '@visx/grid';
import { Group } from '@visx/group';

import { useLayoutContext, useStyleConfigContext } from '../../providers';
import { useThemeContext } from '../../providers/theme';
import { Background, CartesianxAxisSystem } from '../../types';

export type CartesianBaseGridProps = {
  axis: CartesianxAxisSystem;
  position: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  dimension: {
    maxWidth: number;
    maxHeight: number;
  };
  hideRows?: boolean;
  hideColumns?: boolean;
  tickRows?: number;
  tickColumns?: number;
  background?: Background;
  otherProps?: Record<string, any>;
}

export const CartesianBaseGrid: React.FC<CartesianBaseGridProps> = ({
  axis,
  position,
  dimension,
  hideColumns = false,
  hideRows = false,
  tickRows = 10,
  tickColumns = 10,
  background,
  otherProps,
}: CartesianBaseGridProps) => {
  const theme = useThemeContext();
  const { grid: gStyle, themes } = useStyleConfigContext();
  const { isHorizontal } = useLayoutContext();

  const { maxWidth, maxHeight } = dimension;
  const { left, top } = position;
  const { from, to } = { ...themes[theme].grid.background, ...background };

  const scaleRow = axis.left?.scale ?? axis.right!.scale;
  const scaleCols = axis.bottom?.scale ?? axis.top!.scale;

  const hasRows = Boolean(!hideRows && scaleRow);
  const hasCols = Boolean(!hideColumns && scaleCols);

  return (
    <Group>
      <LinearGradient id="cartesian-grid-background" from={from} to={to} rotate={isHorizontal ? 0 : 270} />

      <rect
        x={left}
        y={top}
        width={maxWidth}
        height={maxHeight}
        fill="url(#cartesian-grid-background)"
      />

      {hasRows && (
        <GridRows
          left={left}
          top={top}
          scale={scaleRow}
          width={maxWidth}
          numTicks={tickRows}
          offset={gStyle.rows?.offset}
          fill=""
          stroke={themes[theme].grid.line}
          strokeOpacity={gStyle.rows?.strokeOpacity}
          strokeWidth={gStyle.rows?.strokeWidth}
          strokeDasharray={gStyle.rows?.strokeDasharray}
          lineStyle={gStyle.rows?.lineStyle}
          {...otherProps}
        />
      )}

      {hasCols && (
        <GridColumns
          left={left}
          top={top}
          scale={scaleCols}
          height={maxHeight}
          numTicks={tickColumns}
          offset={gStyle.columns?.offset}
          fill=""
          stroke={themes[theme].grid.line}
          strokeOpacity={gStyle.columns?.strokeOpacity}
          strokeWidth={gStyle.columns?.strokeWidth}
          strokeDasharray={gStyle.columns?.strokeDasharray}
          lineStyle={gStyle.columns?.lineStyle}
          {...otherProps}
        />
      )}
    </Group>
  );
};

CartesianBaseGrid.displayName = 'CartesianBaseGrid';
