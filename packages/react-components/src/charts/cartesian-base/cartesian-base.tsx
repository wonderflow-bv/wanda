import {
  Axis,
} from '@visx/axis';
import { GridColumns, GridRows } from '@visx/grid';
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
  background = '#fff',
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
  const config: any = {
    grid: {
      xOffset: 0,
      yOffset: 0,
      stroke: '#ccc',
      strokeOpacity: 1,
    },
    axis: {
      labelOffset: 12,
      tickLength: 4,
      labelProps: {
        color: 'var(--dimmed-7)',
        fontFamily: 'system-ui, sans-serif',
        fontSize: 14,
        fontWeight: 400,
        textAnchor: 'middle',
      },
      tickLabelProps: {
        color: 'var(--dimmed-7)',
        fontFamily: 'system-ui, sans-serif',
        fontSize: 14,
        fontWeight: 400,
      },
      top: {
        tickLabelProps: {
          dy: -4,
        },
      },
      right: {
        tickLabelProps: {
          dx: 4,
          dy: 4,
          textAnchor: 'start',
        },
        labelProps: {
          dx: 16,
        },
      },
      bottom: {
        tickLabelProps: {
          dy: 4,
        },
      },
      left: {
        tickLabelProps: {
          dx: -4,
          dy: 4,
          textAnchor: 'end',
        },
        labelProps: {
          dx: -16,
        },
      },
    },
  };
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
          <GridRows
            top={top}
            left={left}
            scale={yScaleValues}
            width={xMax}
            numTicks={tickRows}
            offset={config.grid.xOffset}
            stroke={config.grid.stroke}
            strokeOpacity={config.grid.strokeOpacity}
          />
          <GridColumns
            top={top}
            left={left}
            scale={xTimeValues}
            height={yMax}
            numTicks={tickColumns}
            offset={config.grid.yOffset}
            stroke={config.grid.stroke}
            strokeOpacity={config.grid.strokeOpacity}
          />
          <Axis
            axisClassName={styles.Axis}
            orientation="top"
            scale={xBandValues}
            top={top}
            left={left}
            tickLength={config.axis.tickLength}
            tickLabelProps={{ ...config.axis.tickLabelProps, ...config.axis.top.tickLabelProps }}
            label="Top Axis"
            labelOffset={config.axis.labelOffset}
            labelProps={config.axis.labelProps}
          />
          <Axis
            axisClassName={styles.Axis}
            orientation="right"
            scale={yScaleValues}
            top={top}
            left={xMax + left}
            numTicks={10}
            tickLength={config.axis.tickLength}
            tickLabelProps={{ ...config.axis.tickLabelProps, ...config.axis.right.tickLabelProps }}
            label="Right Axis"
            labelOffset={config.axis.labelOffset}
            labelProps={{ ...config.axis.labelProps, ...config.axis.right.labelProps }}
          />
          <Axis
            axisClassName={styles.Axis}
            orientation="bottom"
            scale={xTimeValues}
            top={yMax + top}
            left={left}
            numTicks={10}
            tickLength={config.axis.tickLength}
            tickLabelProps={{ ...config.axis.tickLabelProps, ...config.axis.bottom.tickLabelProps }}
            tickFormat={(v: any, i: number) => {
              const val1 = timeFormat('%d')(v);
              const val2 = timeFormat('%b %d')(v);
              return (i % 2 === 0 ? val1 : val2);
            }}
            label="Bottom Axis"
            labelOffset={config.axis.labelOffset}
            labelProps={config.axis.labelProps}
          />
          <Axis
            axisClassName={styles.Axis}
            orientation="left"
            scale={yScaleValues}
            top={top}
            left={left}
            numTicks={10}
            tickLength={config.axis.tickLength}
            tickLabelProps={{ ...config.axis.tickLabelProps, ...config.axis.left.tickLabelProps }}
            label="Left Axis"
            labelOffset={config.axis.labelOffset}
            labelProps={{ ...config.axis.labelProps, ...config.axis.left.labelProps }}
          />
        </Group>
      </svg>
    </div>
  );
};

CartesianBase.displayName = 'CartesianBase';

