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
import { CartesianStyleConfig, cartesianStyleConfig } from '../style-config/cartesian';
import { RecursivePartial } from '../types/main';
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
  styleConfig?: RecursivePartial<CartesianStyleConfig>;
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
  hideAxisLine?: boolean;
  hideTicks?: boolean;
  hideZero?: boolean;
  tickFormat?: TickFormatter<NumberValue | string | Date>;
  otherProps?: Record<string, unknown>;
}

export type Axis = {
  orientation: AxisOrientation;
  top: number;
  left: number;
  axis: AxisProps | undefined;
  valueScale: ScaleBand<string> | ScaleLinear<number, number> | ScaleTime<number, number> | undefined;
}

export const CartesianBase = ({
  width = 800,
  height = 600,
  background,
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
  styleConfig,
  otherProps,
}: CartesianBaseProps) => {
  const {
    linearGradient: lgStyle,
    grid: gStyle,
    axis: aStyle,
  } = useMemo(() => _.merge(cartesianStyleConfig, styleConfig), [styleConfig]);

  const { from, to } = _.merge(lgStyle.background, background);

  const { hideRows: hasRows, hideColumns: hasCols } = grid;

  const ref = useRef(null);
  const size = useSize(ref);

  const dynamicWidth = size?.width ?? width;
  const dynamicHeight = size?.height ?? height;

  const axisConfig = useMemo(() => computeAxisConfig({
    top, right, bottom, left,
  }, aStyle), [aStyle, bottom, left, right, top]);

  const {
    top: tm,
    right: rm,
    bottom: bm,
    left: lm,
  } = margin;

  const {
    leftAxisOffset: lOff,
    topAxisOffset: tOff,
    verticalAxisOffset: vOff,
    horizontalAxisOffset: hOff,
  } = axisConfig.offset;

  const xMax = dynamicWidth - lm - rm - vOff;
  const yMax = dynamicHeight - tm - bm - hOff;

  const tPos = tm + tOff;
  const rPos = lm + lOff + xMax;
  const bPos = tm + tOff + yMax;
  const lPos = lm + lOff;

  const topScale = useMemo(() => top && scaleDomainToAxis({ ...top, range: [0, xMax] }), [top, xMax]);
  const rightScale = useMemo(() => right && scaleDomainToAxis({ ...right, range: [yMax, 0] }), [right, yMax]);
  const bottomScale = useMemo(() => bottom && scaleDomainToAxis({ ...bottom, range: [0, xMax] }), [bottom, xMax]);
  const leftScale = useMemo(() => left && scaleDomainToAxis({ ...left, range: [yMax, 0] }), [left, yMax]);

  const allAxis: Axis[] = [
    {
      orientation: 'top',
      top: tPos,
      left: lPos,
      axis: top,
      valueScale: topScale,
    },
    {
      orientation: 'right',
      top: tPos,
      left: rPos,
      axis: right,
      valueScale: rightScale,
    },
    {
      orientation: 'bottom',
      top: bPos,
      left: lPos,
      axis: bottom,
      valueScale: bottomScale,
    },
    {
      orientation: 'left',
      top: tPos,
      left: lPos,
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
        {...otherProps}
      >
        <LinearGradient id="cartesian" from={from} to={to} />

        <rect x={0} y={0} width={dynamicWidth} height={dynamicHeight} fill="url(#cartesian)" rx={8} stroke="#999" strokeWidth={1} />

        <Group>
          {!hasRows && (left || right) && (
            <GridRows
              top={tPos}
              left={lPos}
              scale={leftScale ?? rightScale!}
              width={xMax}
              numTicks={grid?.tickRows}
              offset={gStyle.rows?.offset}
              fill={gStyle.rows?.fill}
              stroke={gStyle.rows?.stroke}
              strokeOpacity={gStyle.rows?.strokeOpacity}
              strokeWidth={gStyle.rows?.strokeWidth}
              strokeDasharray={gStyle.rows?.strokeDasharray}
              lineStyle={gStyle.rows?.lineStyle}
              {...grid.otherProps}
            />
          )}

          {!hasCols && (top || bottom) && (
            <GridColumns
              top={tPos}
              left={lPos}
              scale={bottomScale ?? topScale!}
              height={yMax}
              numTicks={grid?.tickColumns}
              offset={gStyle.columns?.offset}
              fill={gStyle.columns?.fill}
              stroke={gStyle.columns?.stroke}
              strokeOpacity={gStyle.columns?.strokeOpacity}
              strokeWidth={gStyle.columns?.strokeWidth}
              strokeDasharray={gStyle.columns?.strokeDasharray}
              lineStyle={gStyle.columns?.lineStyle}
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
              tickLength={axisConfig.style.tickLineProps.length}
              tickLabelProps={{ ...axisConfig.style.tickLabelProps, ...axisConfig[a.orientation].tickLabelProps }}
              tickLineProps={axisConfig.style.tickLineProps}
              label={a.axis!.label}
              labelOffset={axisConfig[a.orientation].labelOffset}
              labelProps={axisConfig.style.labelProps}
              tickFormat={a.axis!.tickFormat}
              {...a.axis!.otherProps}
              stroke={axisConfig.style.axisLineProps.stroke}
              strokeDasharray={axisConfig.style.axisLineProps.strokeDasharray}
              strokeWidth={axisConfig.style.axisLineProps.strokeWidth}
            />
          ))}
        </Group>
      </svg>
    </div>
  );
};

CartesianBase.displayName = 'CartesianBase';

