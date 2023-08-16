import {
  Axis,
} from '@visx/axis';
import { LinearGradient } from '@visx/gradient';
import { GridColumns, GridRows } from '@visx/grid';
import { Group } from '@visx/group';
import { timeFormat } from '@visx/vendor/d3-time-format';
import { useSize } from 'ahooks';
import { useRef } from 'react';

import { computeAxisConfig, scaleDomainToAxis } from '../utils/axis';
import styles from './cartesian-base.module.css';

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

  const bottomValuesScale = bottom && scaleDomainToAxis({ ...bottom, range: [0, xMax] });
  const topValuesScale = top && scaleDomainToAxis({ ...top, range: [0, xMax] });
  const rightValuesScale = right && scaleDomainToAxis({ ...right, range: [yMax, 0] });
  const leftValuesScale = left && scaleDomainToAxis({ ...left, range: [yMax, 0] });

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
          {(left || right) && (
            <GridRows
              top={topPos}
              left={leftPos}
              scale={leftValuesScale ?? rightValuesScale!}
              width={xMax}
              numTicks={tickRows}
              offset={gridConfig.grid.xOffset}
              stroke={gridConfig.grid.stroke}
              strokeOpacity={gridConfig.grid.strokeOpacity}
            />
          )}
          {(top || bottom) && (
            <GridColumns
              top={topPos}
              left={leftPos}
              scale={bottomValuesScale ?? topValuesScale!}
              height={yMax}
              numTicks={tickColumns}
              offset={gridConfig.grid.yOffset}
              stroke={gridConfig.grid.stroke}
              strokeOpacity={gridConfig.grid.strokeOpacity}
            />
          )}
          {top && (
            <Axis
              orientation="top"
              scale={topValuesScale!}
              top={topPos}
              left={leftPos}
              tickLength={axisConfig.tickLength}
              tickLabelProps={{ ...axisConfig.tickLabelProps, ...axisConfig.top.tickLabelProps }}
              label={top?.label}
              labelOffset={axisConfig.top.labelOffset}
              labelProps={axisConfig.labelProps}
            />
          )}
          {right && (
            <Axis
              orientation="right"
              scale={rightValuesScale!}
              top={topPos}
              left={xMax + leftPos}
              numTicks={10}
              tickLength={axisConfig.tickLength}
              tickLabelProps={{ ...axisConfig.tickLabelProps, ...axisConfig.right.tickLabelProps }}
              label={right?.label}
              labelOffset={axisConfig.right.labelOffset}
              labelProps={axisConfig.labelProps}
            />
          )}
          {bottom && (
            <Axis
              orientation="bottom"
              scale={bottomValuesScale!}
              top={yMax + topPos}
              left={leftPos}
              numTicks={10}
              tickLength={axisConfig.tickLength}
              tickLabelProps={{ ...axisConfig.tickLabelProps, ...axisConfig.bottom.tickLabelProps }}
              tickFormat={(v: any) => timeFormat('%b %d')(v)}
              label={bottom?.label}
              labelOffset={axisConfig.bottom.labelOffset}
              labelProps={axisConfig.labelProps}
            />
          )}
          {left && (
            <Axis
              orientation="left"
              scale={leftValuesScale!}
              top={topPos}
              left={leftPos}
              numTicks={10}
              tickLength={axisConfig.tickLength}
              tickLabelProps={{ ...axisConfig.tickLabelProps, ...axisConfig.left.tickLabelProps }}
              label={left?.label}
              labelOffset={axisConfig.left.labelOffset}
              labelProps={axisConfig.labelProps}
            />
          )}
        </Group>
      </svg>
    </div>
  );
};

CartesianBase.displayName = 'CartesianBase';

