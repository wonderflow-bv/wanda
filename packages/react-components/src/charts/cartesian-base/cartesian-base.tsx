import {
  Axis,
} from '@visx/axis';
import { Grid } from '@visx/grid';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear, scaleUtc } from '@visx/scale';
import { timeFormat } from '@visx/vendor/d3-time-format';
import { useSize } from 'ahooks';
import { useRef } from 'react';

import styles from './cartesian-base.module.css';

// TODO: clean css from resize and margins

export type CartesianBaseProps = {
  width?: number;
  height?: number;
  background?: string;
  margin?: MarginProps;
  grid?: GridProps;
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

export type AxisProps = {
  orientation: 'top' | 'left' | 'right' | 'bottom';
  label?: string;
  scaleType: 'linear' | 'label' | 'time';
  domain: Array<string | number | Date>;
  range: number[];
  round?: boolean;
  nice?: boolean;
  clamp?: boolean;
  paddingInner?: number;
  paddingOuter?: number;
  numTicks?: number;
  otherProps: Record<string, unknown>;
}

export const CartesianBase = ({
  width = 800,
  height = 600,
  background = '#e9e9e9',
  margin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60,
  },
  grid = {
    tickColumns: 10,
    tickRows: 10,
  },
  otherProps,
}: CartesianBaseProps) => {
  const {
    top,
    right,
    bottom,
    left,
  } = margin;
  const { tickColumns, tickRows } = grid;

  const ref = useRef(null);
  const size = useSize(ref);

  const dynamicWidth = size?.width ?? width;
  const dynamicHeight = size?.height ?? height;

  const xMax = dynamicWidth - left - right;
  const yMax = dynamicHeight - top - bottom;

  const xTimeValues = scaleUtc({
    domain: [new Date('2000-01-01'), new Date('2000-01-15')],
    range: [0, xMax],
    round: true,
    nice: false,
    clamp: false,
  });

  const yScaleValues = scaleLinear({
    domain: [0, 100],
    range: [yMax, 0],
    round: true,
    nice: false,
    clamp: false,
  });

  const xBandValues = scaleBand({
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
        <rect x={0} y={0} width={dynamicWidth} height={dynamicHeight} fill={background} rx={8} />
        <Group>
          <Grid
            top={top}
            left={left}
            xScale={xTimeValues}
            yScale={yScaleValues}
            width={xMax}
            height={yMax}
            numTicksColumns={tickColumns}
            numTicksRows={tickRows}
            xOffset={0}
            yOffset={0}
            stroke="black"
            strokeOpacity={0.1}
          />
          <Axis
            axisClassName={styles.Axis}
            orientation="top"
            scale={xBandValues}
            top={top}
            left={left}
            tickLength={4}
            tickLabelProps={{ dy: -4, fontSize: 12 }}
            label="Top Axis"
            labelOffset={12}
            labelProps={{
              fontSize: 14, fontFamily: 'system-ui, sans-serif', fontWeight: 600, textAnchor: 'middle',
            }}
          />
          <Axis
            axisClassName={styles.Axis}
            orientation="right"
            scale={yScaleValues}
            top={top}
            left={xMax + left}
            numTicks={10}
            tickLength={4}
            tickLabelProps={{ dx: 12, dy: 4, fontSize: 12 }}
            label="Right Axis"
            labelOffset={12}
            labelProps={{
              fontSize: 14, fontFamily: 'system-ui, sans-serif', fontWeight: 600, dx: 16, textAnchor: 'middle',
            }}
          />
          <Axis
            axisClassName={styles.Axis}
            orientation="bottom"
            scale={xTimeValues}
            top={yMax + top}
            left={left}
            numTicks={10}
            tickLength={4}
            tickLabelProps={{ dy: 4, fontSize: 12 }}
            tickFormat={(v: any, i: number) => {
              const val1 = timeFormat('%d')(v);
              const val2 = timeFormat('%b %d')(v);
              return (i % 2 === 0 ? val1 : val2);
            }}
            label="Bottom Axis"
            labelOffset={12}
            labelProps={{
              fontSize: 14, fontFamily: 'system-ui, sans-serif', fontWeight: 600, textAnchor: 'middle',
            }}
          />
          <Axis
            axisClassName={styles.Axis}
            orientation="left"
            scale={yScaleValues}
            top={top}
            left={left}
            numTicks={10}
            tickLength={4}
            tickLabelProps={{ dx: -12, dy: 4, fontSize: 12 }}
            label="Left Axis"
            labelOffset={12}
            labelProps={{
              fontSize: 14, fontFamily: 'system-ui, sans-serif', fontWeight: 600, dx: -16, textAnchor: 'middle',
            }}
          />
        </Group>
      </svg>
    </div>
  );
};

CartesianBase.displayName = 'CartesianBase';

