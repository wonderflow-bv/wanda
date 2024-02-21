import { Group } from '@visx/group';
import { scaleBand, scaleUtc } from '@visx/scale';
import { BarGroup } from '@visx/shape';
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
  const seriesAxis = isHorizontal ? left : bottom;

  indexAxis?.scale.rangeRound([0, dimension.maxWidth]);

  const scaleX0 = scaleUtc<string>({
    domain: data.map((d: any) => new Date(d[index])),
  }) as any;

  console.log('scaleX0', scaleX0.domain());

  return (
    <BarGroup
      data={data}
      keys={series.dataKey}
      height={dimension.maxHeight}
      x0={(d: Record<string, any>) => d[index]}
      x0Scale={indexAxis!.scale as any}
      x1Scale={scaleBand<string>({
        domain: series.dataKey,
        padding: 0.1,
      })}
      yScale={seriesAxis!.scale as any}
      color={(_, i) => series.colors[i]!}
    >
      {barGroups => barGroups.map((barGroup) => {
        console.log('barGroup', barGroup);

        return (
          <Group key={_.uniqueId()} left={barGroup.x0}>
            {barGroup.bars.map(bar => (
              <rect
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
        );
      })
          }
    </BarGroup>
  );
};

BarsSeries.displayName = 'BarSeries';

