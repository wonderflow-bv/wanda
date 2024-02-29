import { Group } from '@visx/group';
import { Bar, BarGroup, BarGroupHorizontal } from '@visx/shape';
import _ from 'lodash';
import { useCallback } from 'react';

import { useBars } from '@/hooks';

import { useCartesianContext } from '../../../providers';
import { sortBarsBy } from '../../../utils';
import { BarsItem, BarsItemBlurred } from './bars.module.css';

export const BarsSeries = () => {
  const { hoveredLegendItem: overLegend } = useCartesianContext();
  const {
    data,
    isHorizontal,
    series,
    sortBy,
    hasBackground,
    seriesAxis,
    maxWidth,
    maxHeight,
    X0Y0,
    scaleXY0,
    scaleXY1,
    style,
  } = useBars();

  const { bar: barStyle, background } = style;

  const dynamicClassName = useCallback((overLegend: string, dataKey: string) => ((overLegend === dataKey || overLegend === '')
    ? BarsItem
    : BarsItemBlurred), []);

  if (!isHorizontal) {
    return (
      <BarGroupHorizontal
        data={data}
        keys={series.dataKey}
        width={maxWidth}
        y0={X0Y0}
        y0Scale={scaleXY0}
        y1Scale={scaleXY1}
        xScale={seriesAxis.scale}
        color={(_, i) => series.colors[i]}
      >
        {barGroups => barGroups.map((barGroup) => {
          const sortedBars = sortBarsBy(barGroup.bars, sortBy, isHorizontal);

          return (
            <Group key={_.uniqueId()} top={barGroup.y0}>
              {sortedBars.map(bar => (
                <Group key={_.uniqueId()}>
                  {hasBackground && (
                    <Bar
                      className={dynamicClassName(overLegend, bar.key)}
                      x={0}
                      y={bar.y}
                      width={maxWidth}
                      height={bar.height}
                      fill="lightGrey"
                      rx={background.rx}
                    />
                  )}

                  <Bar
                    className={dynamicClassName(overLegend, bar.key)}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={bar.color}
                    rx={barStyle.rx}
                    onClick={() => ({})}
                  />
                </Group>
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
      height={maxHeight}
      x0={X0Y0}
      x0Scale={scaleXY0}
      x1Scale={scaleXY1}
      yScale={seriesAxis.scale}
      color={(_, i) => series.colors[i]!}
    >
      {barGroups => barGroups.map((barGroup) => {
        const sortedBars = sortBarsBy(barGroup.bars, sortBy, isHorizontal);

        return (
          <Group key={_.uniqueId()} left={barGroup.x0}>
            {sortedBars.map(bar => (
              <Group key={_.uniqueId()}>
                {hasBackground && (
                  <Bar
                    className={dynamicClassName(overLegend, bar.key)}
                    x={bar.x}
                    y={0}
                    width={bar.width}
                    height={maxHeight}
                    fill="lightGrey"
                    rx={background.rx}
                  />
                )}

                <Bar
                  className={dynamicClassName(overLegend, bar.key)}
                  key={_.uniqueId()}
                  x={bar.x}
                  y={bar.y}
                  width={bar.width}
                  height={bar.height}
                  fill={bar.color}
                  rx={barStyle.rx}
                  onClick={() => ({})}
                />
              </Group>
            ))}
          </Group>
        );
      })}
    </BarGroup>
  );
};

BarsSeries.displayName = 'BarSeries';

