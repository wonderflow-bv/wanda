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
  Axis,
  TickFormatter,
} from '@visx/axis';
import { LinearGradient } from '@visx/gradient';
import { GridColumns, GridRows } from '@visx/grid';
import { Group } from '@visx/group';
import {
  NumberValue, ScaleBand, ScaleLinear, ScaleTime,
} from '@visx/vendor/d3-scale';
import { useSize } from 'ahooks';
import _ from 'lodash';
import { useMemo, useRef } from 'react';

import type { Background } from '../style-config';
import { backgroundStyleConfig, gridStyleConfig } from '../style-config';
import { GridStyleConfig } from '../style-config/grid';
import { AxisOrientation, computeAxisConfig, scaleDomainToAxis } from '../utils/axis';
import styles from './cartesian-base.module.css';

export type CartesianBaseProps = {
  width?: number;
  height?: number;
  background?: Background;
  margin?: MarginProps;
  grid?: GridProps;
  top?: AxisProps;
  right?: AxisProps;
  bottom?: AxisProps;
  left?: AxisProps;
  otherProps?: Record<string, unknown>;
}

export type MarginProps = {
  top: number;
  right: number;
  left: number;
  bottom: number;
}

export type GridProps = {
  hideRows?: boolean;
  hideColumns?: boolean;
  tickRows?: number;
  tickColumns?: number;
  style?: GridStyleConfig;
  otherProps?: Record<string, unknown>;
}

export type AxisProps = {
  domain: Array<string | number>;
  scaleType: 'linear' | 'label' | 'time';
  label?: string;
  range?: [number, number];
  round?: boolean;
  nice?: boolean;
  clamp?: boolean;
  paddingInner?: number;
  paddingOuter?: number;
  numTicks?: number;
  tickFormat?: TickFormatter<NumberValue | string | Date>;
  otherProps?: Record<string, unknown>;
}

export type AxisConfig = {
  orientation: AxisOrientation;
  top: number;
  left: number;
  axis: AxisProps | undefined;
  valueScale: ScaleBand<string> | ScaleLinear<number, number> | ScaleTime<number, number> | undefined;
}

export const CartesianBase = ({
  width = 800,
  height = 600,
  background = backgroundStyleConfig,
  margin = {
    top: 24,
    right: 24,
    bottom: 24,
    left: 24,
  },
  grid = {
    hideColumns: false,
    hideRows: false,
  },
  top,
  right,
  bottom,
  left,
  otherProps,
}: CartesianBaseProps) => {
  const { from, to } = background;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { hideRows, hideColumns } = grid;
  const gridStyle: GridStyleConfig = useMemo(() => _.merge(gridStyleConfig, grid.style), [grid]);

  const ref = useRef(null);
  const size = useSize(ref);

  const dynamicWidth = size?.width ?? width;
  const dynamicHeight = size?.height ?? height;

  const axisConfig = useMemo(() => computeAxisConfig({
    top, right, bottom, left,
  }), [bottom, left, right, top]);

  const {
    leftAxisOffset,
    topAxisOffset,
    verticalAxisOffset,
    horizontalAxisOffset,
  } = axisConfig.offset;

  const xMax = dynamicWidth - margin.left - margin.right - verticalAxisOffset;
  const yMax = dynamicHeight - margin.top - margin.bottom - horizontalAxisOffset;

  const topPos = margin.top + topAxisOffset;
  const rightPos = margin.left + leftAxisOffset + xMax;
  const bottomPos = margin.top + topAxisOffset + yMax;
  const leftPos = margin.left + leftAxisOffset;

  const topScale = useMemo(() => top && scaleDomainToAxis({ ...top, range: [0, xMax] }), [top, xMax]);
  const rightScale = useMemo(() => right && scaleDomainToAxis({ ...right, range: [yMax, 0] }), [right, yMax]);
  const bottomScale = useMemo(() => bottom && scaleDomainToAxis({ ...bottom, range: [0, xMax] }), [bottom, xMax]);
  const leftScale = useMemo(() => left && scaleDomainToAxis({ ...left, range: [yMax, 0] }), [left, yMax]);

  const allAxis: AxisConfig[] = [
    {
      orientation: 'top',
      top: topPos,
      left: leftPos,
      axis: top,
      valueScale: topScale,
    },
    {
      orientation: 'right',
      top: topPos,
      left: rightPos,
      axis: right,
      valueScale: rightScale,
    },
    {
      orientation: 'bottom',
      top: bottomPos,
      left: leftPos,
      axis: bottom,
      valueScale: bottomScale,
    },
    {
      orientation: 'left',
      top: topPos,
      left: leftPos,
      axis: left,
      valueScale: leftScale,
    },
  ];

  return (
    <div className={styles.Wrapper} ref={ref}>
      <svg
        width={dynamicWidth}
        height={dynamicHeight}
        viewBox={`0 0 ${dynamicWidth} ${dynamicHeight}`}
        className={styles.Container}
        {...otherProps}
      >
        <LinearGradient id="cartesian" from={from} to={to} />

        <rect x={0} y={0} width={dynamicWidth} height={dynamicHeight} fill="url(#cartesian)" rx={8} />

        <Group>
          {!hideRows && (left || right) && (
            <GridRows
              top={topPos}
              left={leftPos}
              scale={leftScale ?? rightScale!}
              width={xMax}
              numTicks={grid?.tickRows}
              offset={gridStyle.rows?.offset}
              fill={gridStyle.rows?.fill}
              stroke={gridStyle.rows?.stroke}
              strokeOpacity={gridStyle.rows?.strokeOpacity}
              strokeWidth={gridStyle.rows?.strokeWidth}
              strokeDasharray={gridStyle.rows?.strokeDasharray}
              lineStyle={gridStyle.rows?.lineStyle}
              {...grid.otherProps}
            />
          )}

          {!hideColumns && (top || bottom) && (
            <GridColumns
              top={topPos}
              left={leftPos}
              scale={bottomScale ?? topScale!}
              height={yMax}
              numTicks={grid?.tickColumns}
              offset={gridStyle.columns?.offset}
              fill={gridStyle.columns?.fill}
              stroke={gridStyle.columns?.stroke}
              strokeOpacity={gridStyle.columns?.strokeOpacity}
              strokeWidth={gridStyle.columns?.strokeWidth}
              strokeDasharray={gridStyle.columns?.strokeDasharray}
              lineStyle={gridStyle.columns?.lineStyle}
              {...grid.otherProps}
            />
          )}

          {allAxis.filter(a => a.axis).map(a => (
            <Axis
              key={a.orientation}
              orientation={a.orientation}
              scale={a.valueScale!}
              top={a.top}
              left={a.left}
              numTicks={a.axis!.numTicks}
              tickLength={axisConfig.tickLength}
              tickLabelProps={{ ...axisConfig.tickLabelProps, ...axisConfig[a.orientation].tickLabelProps }}
              label={a.axis!.label}
              labelOffset={axisConfig[a.orientation].labelOffset}
              labelProps={axisConfig.labelProps}
              tickFormat={a.axis!.tickFormat}
              {...a.axis!.otherProps}
            />
          ))}
        </Group>
      </svg>
    </div>
  );
};

CartesianBase.displayName = 'CartesianBase';

