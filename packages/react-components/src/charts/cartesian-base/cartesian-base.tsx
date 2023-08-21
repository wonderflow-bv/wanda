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
import { useRef } from 'react';

import { AxisOrientation, computeAxisConfig, scaleDomainToAxis } from '../utils/axis';
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
  tickColumns?: number;
  tickRows?: number;
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
  background = 'var(--global-background)',
  margin = {
    top: 24,
    right: 24,
    bottom: 24,
    left: 24,
  },
  grid,
  top,
  right,
  bottom,
  left,
  otherProps,
}: CartesianBaseProps) => {
  const gridConfig = {
    xOffset: 0,
    yOffset: 0,
    stroke: '#ccc',
    strokeOpacity: 1,
  };

  const ref = useRef(null);
  const size = useSize(ref);

  const dynamicWidth = size?.width ?? width;
  const dynamicHeight = size?.height ?? height;

  const axisConfig = computeAxisConfig({
    top, right, bottom, left,
  });

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

  const topScale = top && scaleDomainToAxis({ ...top, range: [0, xMax] });
  const rightScale = right && scaleDomainToAxis({ ...right, range: [yMax, 0] });
  const bottomScale = bottom && scaleDomainToAxis({ ...bottom, range: [0, xMax] });
  const leftScale = left && scaleDomainToAxis({ ...left, range: [yMax, 0] });

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
        <LinearGradient id="cartesian" to="var(--global-vibrancy-background)" from={background} />
        <rect x={0} y={0} width={dynamicWidth} height={dynamicHeight} fill="url(#cartesian)" rx={8} />
        <Group>
          {(left || right) && (
            <GridRows
              top={topPos}
              left={leftPos}
              scale={leftScale ?? rightScale!}
              width={xMax}
              numTicks={grid?.tickRows}
              offset={gridConfig.xOffset}
              stroke={gridConfig.stroke}
              strokeOpacity={gridConfig.strokeOpacity}
            />
          )}
          {(top || bottom) && (
            <GridColumns
              top={topPos}
              left={leftPos}
              scale={bottomScale ?? topScale!}
              height={yMax}
              numTicks={grid?.tickColumns}
              offset={gridConfig.yOffset}
              stroke={gridConfig.stroke}
              strokeOpacity={gridConfig.strokeOpacity}
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
            />
          ))}
        </Group>
      </svg>
    </div>
  );
};

CartesianBase.displayName = 'CartesianBase';

