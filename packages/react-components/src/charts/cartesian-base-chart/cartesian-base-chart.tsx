import {
  AxisBottom, AxisLeft, AxisRight, AxisTop,
} from '@visx/axis';
import { Grid } from '@visx/grid';
import { Group } from '@visx/group';
import { scaleLinear } from '@visx/scale';
import React from 'react';

export type BaseChartProps = {
  width?: number;
  height?: number;
  background?: string;
  margin?: MarginProps;
  otherProps?: Record<string, unknown>;
}

export type MarginProps = {
  top: number;
  right: number;
  left: number;
  bottom: number;
}

export const CartesianBaseChart = ({
  width = 800,
  height = 600,
  background = '#e9e9e9',
  margin = {
    top: 32, right: 32, bottom: 32, left: 32,
  },
  otherProps,
}: BaseChartProps) => {
  const {
    top, right, bottom, left,
  } = margin;

  const xMax = width - left - right;
  const yMax = height - top - bottom;

  const xScale = scaleLinear({
    domain: [0, 100],
    range: [0, xMax],
    round: true,
    nice: false,
    clamp: false,
  });

  const yScale = scaleLinear({
    domain: [0, 100],
    range: [yMax, 0],
    round: true,
    nice: false,
    clamp: false,
  });

  return (
    <svg width={width} height={height} {...otherProps}>
      <rect x={0} y={0} width={width} height={height} fill={background} rx={8} />
      <Group>
        <Grid
          top={top}
          left={left}
          xScale={xScale}
          yScale={yScale}
          width={xMax}
          height={yMax}
          numTicksColumns={10}
          numTicksRows={10}
          xOffset={0}
          yOffset={0}
          stroke="black"
          strokeOpacity={0.1}
        />
        <AxisTop scale={xScale} top={top} left={left} numTicks={25} />
        <AxisRight scale={yScale} top={top} left={xMax + left} />
        <AxisBottom scale={xScale} top={yMax + top} left={left} />
        <AxisLeft scale={yScale} top={top} left={left} numTicks={25} />
      </Group>
    </svg>
  );
};

