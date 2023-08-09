import {
  Axis,
} from '@visx/axis';
import { Grid } from '@visx/grid';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';

import styles from './cartesian-base.module.css';

export type BaseChartProps = {
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
}: BaseChartProps) => {
  const {
    top, right, bottom, left,
  } = margin;
  const { tickColumns, tickRows } = grid;

  const xMax = width - left - right;
  const yMax = height - top - bottom;

  const xScaleValues = scaleLinear({
    domain: [0, 100],
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
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={styles.Container} {...otherProps}>
      <rect x={0} y={0} width={width} height={height} fill={background} rx={8} />
      <Group>
        <Grid
          top={top}
          left={left}
          xScale={xScaleValues}
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
          // numTicks={10}
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
          scale={xScaleValues}
          top={yMax + top}
          left={left}
          numTicks={25}
          tickLength={4}
          tickLabelProps={{ dy: 4, fontSize: 12 }}
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

        {/* <Axis orientation="left" scale={yScale} top={top} left={left} numTicks={25} label="Left Axis" /> */}
      </Group>
    </svg>
  );
};

