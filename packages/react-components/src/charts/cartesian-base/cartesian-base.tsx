import {
  Axis,
} from '@visx/axis';
import { LinearGradient } from '@visx/gradient';
import { GridColumns, GridRows } from '@visx/grid';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear, scaleUtc } from '@visx/scale';
import { timeFormat } from '@visx/vendor/d3-time-format';
import { useSize } from 'ahooks';
import { useRef } from 'react';

import { computeAxisConfig } from '../utils/axis';
import styles from './cartesian-base.module.css';

// TODO: clean css from resize and margins

export type CartesianBaseProps = {
  width?: number;
  height?: number;
  background?: string;
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
  tickColumns: number;
  tickRows: number;
}

export type AxisOrientationType = 'top' | 'left' | 'right' | 'bottom';

export type AxisProps = {
  domain: Array<string | number>;
  orientation: AxisOrientationType;
  label?: string;
  scaleType: 'linear' | 'label' | 'time';
  range?: number[];
  round?: boolean;
  nice?: boolean;
  clamp?: boolean;
  paddingInner?: number;
  paddingOuter?: number;
  numTicks?: number;
  otherProps?: Record<string, unknown>;
}

export const CartesianBase = ({
  width = 800,
  height = 600,
  background = 'var(--global-background)',
  margin = {
    top: 24,
    right: 24,
    bottom: 24,
    left: 24,
  },
  grid = {
    tickColumns: 10,
    tickRows: 10,
  },
  top,
  right,
  bottom,
  left,
  otherProps,
}: CartesianBaseProps) => {
  const axisConfig = computeAxisConfig({
    top, right, bottom, left,
  });

  const gridConfig: any = {
    grid: {
      xOffset: 0,
      yOffset: 0,
      stroke: '#ccc',
      strokeOpacity: 1,
    },
  };

  const { tickColumns, tickRows } = grid;

  const ref = useRef(null);
  const size = useSize(ref);

  const dynamicWidth = size?.width ?? width;
  const dynamicHeight = size?.height ?? height;

  const {
    leftAxisOffset,
    topAxisOffset,
    verticalAxisOffset,
    horizontalAxisOffset,
  } = axisConfig.offset;

  const xMax = dynamicWidth - margin.left - margin.right - verticalAxisOffset;
  const yMax = dynamicHeight - margin.top - margin.bottom - horizontalAxisOffset;

  const topPos = margin.top + topAxisOffset;
  const leftPos = margin.left + leftAxisOffset;

  const bottomAxisValues = scaleUtc({
    domain: [new Date('2000-01-01'), new Date('2000-01-15')],
    range: [0, xMax],
    round: true,
    nice: false,
    clamp: false,
  });

  const leftAxisValues = scaleLinear({
    domain: [0, 10000],
    range: [yMax, 0],
    round: true,
    nice: false,
    clamp: false,
  });

  const rightAxisValues = scaleLinear({
    domain: [0, 1],
    range: [yMax, 0],
    round: true,
    nice: false,
    clamp: false,
  });

  const topAxisValue = scaleBand({
    domain: ['a', 'b', 'c', 'd', 'e'],
    range: [0, xMax],
    paddingInner: 0.2,
    paddingOuter: 0.1,
  });

  return (
    <div className={styles.Wrapper} ref={ref}>
      <svg
        width={dynamicWidth}
        height={dynamicHeight}
        viewBox={`0 0 ${dynamicWidth} ${dynamicHeight}`}
        className={styles.Container}
        {...otherProps}
      >
        <LinearGradient id="cartesian" to="var(--global-vibrancy-background)" from={background} />
        <rect x={0} y={0} width={dynamicWidth} height={dynamicHeight} fill="url(#cartesian)" rx={8} />
        <Group>
          <GridRows
            top={topPos}
            left={leftPos}
            scale={leftAxisValues}
            width={xMax}
            numTicks={tickRows}
            offset={gridConfig.grid.xOffset}
            stroke={gridConfig.grid.stroke}
            strokeOpacity={gridConfig.grid.strokeOpacity}
          />
          <GridColumns
            top={topPos}
            left={leftPos}
            scale={bottomAxisValues}
            height={yMax}
            numTicks={tickColumns}
            offset={gridConfig.grid.yOffset}
            stroke={gridConfig.grid.stroke}
            strokeOpacity={gridConfig.grid.strokeOpacity}
          />
          <Axis
            orientation="top"
            scale={topAxisValue}
            top={topPos}
            left={leftPos}
            tickLength={axisConfig.tickLength}
            tickLabelProps={{ ...axisConfig.tickLabelProps, ...axisConfig.top.tickLabelProps }}
            label={top?.label}
            labelOffset={axisConfig.top.labelOffset}
            labelProps={axisConfig.labelProps}
          />
          <Axis
            orientation="right"
            scale={rightAxisValues}
            top={topPos}
            left={xMax + leftPos}
            numTicks={10}
            tickLength={axisConfig.tickLength}
            tickLabelProps={{ ...axisConfig.tickLabelProps, ...axisConfig.right.tickLabelProps }}
            label={right?.label}
            labelOffset={axisConfig.right.labelOffset}
            labelProps={axisConfig.labelProps}
          />
          <Axis
            orientation="bottom"
            scale={bottomAxisValues}
            top={yMax + topPos}
            left={leftPos}
            numTicks={10}
            tickLength={axisConfig.tickLength}
            tickLabelProps={{ ...axisConfig.tickLabelProps, ...axisConfig.bottom.tickLabelProps }}
            tickFormat={(v: any, i: number) => {
              const val1 = timeFormat('%d')(v);
              const val2 = timeFormat('%b %d')(v);
              return (i % 2 === 0 ? val1 : val2);
            }}
            label={bottom?.label}
            labelOffset={axisConfig.right.labelOffset}
            labelProps={axisConfig.labelProps}
          />
          <Axis
            orientation="left"
            scale={leftAxisValues}
            top={topPos}
            left={leftPos}
            numTicks={10}
            tickLength={axisConfig.tickLength}
            tickLabelProps={{ ...axisConfig.tickLabelProps, ...axisConfig.left.tickLabelProps }}
            label={left?.label}
            labelOffset={axisConfig.left.labelOffset}
            labelProps={axisConfig.labelProps}
          />
        </Group>
      </svg>
    </div>
  );
};

CartesianBase.displayName = 'CartesianBase';

