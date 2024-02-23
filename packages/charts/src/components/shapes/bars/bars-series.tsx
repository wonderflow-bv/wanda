import { Group } from '@visx/group';
import { scaleBand } from '@visx/scale';
import { Bar, BarGroup, BarGroupHorizontal } from '@visx/shape';
import _ from 'lodash';
import { useCallback } from 'react';

import {
  useCartesianContext, useDataContext, useLayoutContext, useStyleConfigContext, useThemeContext,
} from '../../../providers';
import { BarChartMetadata } from '../../../types';
import { BarsItem, BarsItemBlurred } from './bars.module.css';

export const BarsSeries = () => {
  const theme = useThemeContext();
  const { themes } = useStyleConfigContext();
  const { data, metadata } = useDataContext<BarChartMetadata>();
  const { isHorizontal } = useLayoutContext();
  const { axis, hoveredLegendItem: overLegend, dimension } = useCartesianContext();

  console.log(theme, themes, overLegend);

  const {
    left, bottom, right, top,
  } = axis!;

  const { series, index, overlay } = metadata!;

  const hasOverlay = Boolean(overlay && (right || top));

  // const indexAxis = isHorizontal ? bottom : left;
  const seriesAxis = isHorizontal ? left : bottom;

  const scaleXY0 = scaleBand<string>({
    domain: data.map((d: any) => d[index]),
    paddingOuter: 1,
    paddingInner: 0.1,
  });

  scaleXY0.rangeRound((isHorizontal ? [0, dimension.maxWidth] : [dimension.maxHeight, 0]));

  const combinedDataKeys = hasOverlay ? [...series.dataKey, ...overlay.dataKey!] : series.dataKey;

  const scaleXY1 = scaleBand<string>({
    domain: combinedDataKeys,
  });

  scaleXY1.rangeRound([0, scaleXY0.bandwidth()]);

  const dynamicClassName = useCallback((overLegend: string, dataKey: string) => ((overLegend === dataKey || overLegend === '')
    ? BarsItem
    : BarsItemBlurred), []);

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
                className={dynamicClassName(overLegend, bar.key)}
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
      {barGroups => barGroups.map((barGroup) => {
        console.log('barGroup', barGroup);

        return (
          <Group key={_.uniqueId()} left={barGroup.x0}>
            {barGroup.bars.map(bar => (
              <Bar
                className={dynamicClassName(overLegend, bar.key)}
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
      })}
    </BarGroup>
  );
};

BarsSeries.displayName = 'BarSeries';

