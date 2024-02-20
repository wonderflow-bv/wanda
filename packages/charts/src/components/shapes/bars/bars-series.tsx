import { Group } from '@visx/group';
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

  return (
    <BarGroup
      className="kkk"
      data={data}
      keys={series.dataKey}
      height={dimension.maxHeight}
      x0={d => d[index] as string}
      x0Scale={indexAxis!.scale as any}
      x1Scale={indexAxis!.scale as any}
      yScale={seriesAxis!.scale as any}
      color={(_, i) => series.colors[i]!} // OK
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

