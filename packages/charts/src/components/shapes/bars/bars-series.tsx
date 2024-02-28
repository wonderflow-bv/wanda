import { Group } from '@visx/group';
import { scaleBand } from '@visx/scale';
import { Bar, BarGroup, BarGroupHorizontal } from '@visx/shape';
import _ from 'lodash';
import { useCallback } from 'react';

import { useCartesianContext, useDataContext, useLayoutContext } from '../../../providers';
import { BarChartMetadata } from '../../../types';
import { sortBarsBy } from '../../../utils';
import { BarsItem, BarsItemBlurred } from './bars.module.css';

export const BarsSeries = () => {
  const { data, metadata } = useDataContext<BarChartMetadata>();
  const { isHorizontal } = useLayoutContext();
  const { axis, hoveredLegendItem: overLegend, dimension } = useCartesianContext();

  const {
    left, bottom, right, top,
  } = axis;

  const {
    series, index, overlay, sortBy,
  } = metadata!;

  const hasOverlay = Boolean(overlay && (right || top));

  const seriesAxis = isHorizontal ? left : bottom;

  const X0Y0 = (d: Record<string, any>) => d[index];

  const scaleXY0 = scaleBand<string>({
    domain: data.map((d: any) => d[index]),
    paddingOuter: 1,
    paddingInner: 0.1,
  });

  scaleXY0.rangeRound((isHorizontal ? [0, dimension.maxWidth] : [dimension.maxHeight, 0]));

  const combinedDataKeys = hasOverlay ? [...series.dataKey, ...overlay.dataKey!] : series.dataKey;

  const scaleXY1 = scaleBand<string>({ domain: combinedDataKeys });

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
        y0={X0Y0}
        y0Scale={scaleXY0}
        y1Scale={scaleXY1}
        xScale={seriesAxis!.scale}
        color={(_, i) => series.colors[i]}
      >
        {barGroups => barGroups.map((barGroup) => {
          const sortedBars = sortBarsBy(barGroup.bars, sortBy, isHorizontal);

          return (
            <Group key={_.uniqueId()} top={barGroup.y0}>
              {sortedBars.map(bar => (
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
        })
          }
      </BarGroupHorizontal>
    );
  }

  return (
    <BarGroup
      data={data}
      keys={series.dataKey}
      height={dimension.maxHeight}
      x0={X0Y0}
      x0Scale={scaleXY0}
      x1Scale={scaleXY1}
      yScale={seriesAxis!.scale}
      color={(_, i) => series.colors[i]!}
    >
      {barGroups => barGroups.map((barGroup) => {
        const sortedBars = sortBarsBy(barGroup.bars, sortBy, isHorizontal);

        return (
          <Group key={_.uniqueId()} left={barGroup.x0}>
            {sortedBars.map(bar => (
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

