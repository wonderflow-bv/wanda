import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar, BarGroup } from '@visx/shape';
import _ from 'lodash';

import {
  useCartesianContext, useDataContext, useLayoutContext, useStyleConfigContext, useThemeContext,
} from '../../../providers';
import { BarChartMetadata } from '../../../types';

export const BarsSeries = () => {
  const theme = useThemeContext();
  const { themes } = useStyleConfigContext();
  const { data, metadata } = useDataContext<BarChartMetadata>();
  const { isHorizontal } = useLayoutContext();
  const { axis, hoveredLegendItem: overLegend, dimension } = useCartesianContext();

  console.log(dimension, theme, themes, overLegend);

  const { left, bottom } = axis!;

  const { series, index } = metadata!;

  const indexAxis = isHorizontal ? bottom : left;
  // const seriesAxis = isHorizontal ? left : bottom;

  indexAxis?.scale.rangeRound([0, dimension.maxWidth]);

  const scaleX0 = scaleBand<string>({
    domain: data.map((d: any) => d[index]),
    paddingOuter: 1,
    paddingInner: 0.1,
  });
  scaleX0.rangeRound([0, dimension.maxWidth]);

  const scaleX1 = scaleBand<string>({
    domain: series.dataKey,
  });
  scaleX1.rangeRound([0, scaleX0.bandwidth()]);

  const scaleY = scaleLinear<number>({
    domain: [0,
      Math.max(
        ...data.map(d => Math.max(...series.dataKey.map(key => Number(d[key])))),
      ),
    ],
  });
  scaleY.range([dimension.maxHeight, 0]);

  return (
    <BarGroup
      data={data}
      keys={series.dataKey}
      height={dimension.maxHeight}
      x0={(d: Record<string, any>) => d[index]}
      x0Scale={scaleX0}
      x1Scale={scaleX1}
      yScale={scaleY}
      color={(_, i) => series.colors[i]!}
    >
      {barGroups => barGroups.map(barGroup => (
        <Group key={_.uniqueId()} left={barGroup.x0}>
          {barGroup.bars.map(bar => (
            <Bar
              key={_.uniqueId()}
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              fill={bar.color}
              rx={4}
              onClick={() => ({})}
            />
          ))}
        </Group>
      ))
          }
    </BarGroup>
  );
};

BarsSeries.displayName = 'BarSeries';

