import { Group } from '@visx/group';
import { scaleBand } from '@visx/scale';
import { Bar, BarGroup, BarGroupHorizontal } from '@visx/shape';
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

  console.log(theme, themes, overLegend);

  const { left, bottom } = axis!;

  const { series, index } = metadata!;

  // const indexAxis = isHorizontal ? bottom : left;
  const seriesAxis = isHorizontal ? left : bottom;

  const scaleXY0 = scaleBand<string>({
    domain: data.map((d: any) => d[index]),
    paddingOuter: 1,
    paddingInner: 0.1,
  });

  scaleXY0.rangeRound((isHorizontal ? [0, dimension.maxWidth] : [dimension.maxHeight, 0]));

  const scaleXY1 = scaleBand<string>({
    domain: series.dataKey,
  });

  scaleXY1.rangeRound([0, scaleXY0.bandwidth()]);

  if (!isHorizontal) {
    return (
      <BarGroupHorizontal
        data={data}
        keys={series.dataKey}
        width={dimension.maxWidth}
        y0={(d: Record<string, any>) => d[index]}
        y0Scale={scaleXY0}
        y1Scale={scaleXY1}
        xScale={seriesAxis!.scale}
        color={(_, i) => series.colors[i]!}
      >
        {barGroups => barGroups.map(barGroup => (
          <Group key={_.uniqueId()} top={barGroup.y0}>
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
      </BarGroupHorizontal>
    );
  }

  return (
    <BarGroup
      data={data}
      keys={series.dataKey}
      height={dimension.maxHeight}
      x0={(d: Record<string, any>) => d[index]}
      x0Scale={scaleXY0}
      x1Scale={scaleXY1}
      yScale={seriesAxis!.scale}
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
      ))}
    </BarGroup>
  );
};

BarsSeries.displayName = 'BarSeries';

