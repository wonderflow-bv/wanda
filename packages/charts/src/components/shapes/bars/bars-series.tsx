/*
 * Copyright 2024 Wonderflow Design Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Group } from '@visx/group';
import { Bar, BarGroup, BarGroupHorizontal } from '@visx/shape';
import _ from 'lodash';
import { useCallback } from 'react';

import { useBars } from '@/hooks';
import {
  extractBarValueFromNestedKey,
  getBarSizeAndPosition, getBarThickness,
  sortBarsBy,
} from '@/utils';

import { useCartesianContext, useStyleConfigContext, useThemeContext } from '../../../providers';
import { BarsItem, BarsItemBlurred } from './bars.module.css';

export const BarsSeries = () => {
  const { hoveredLegendItem: overLegend } = useCartesianContext();
  const theme = useThemeContext();
  const { themes } = useStyleConfigContext();
  const {
    data,
    isHorizontal,
    series,
    sortBy,
    hasBackgroundSeries,
    seriesAxis,
    maxWidth,
    maxHeight,
    X0Y0,
    scaleXY0,
    scaleXY1,
    style,
    fixedBarSize,
  } = useBars();

  const { bar: barStyle, background, maxSize } = style;
  const bgColor = themes[theme].bars.backgroundColor;

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
        {barGroups => barGroups.map((barGroup, i) => {
          const updatedBars = extractBarValueFromNestedKey(barGroup, i, data, seriesAxis.scale, maxWidth, isHorizontal);
          const sortedBars = sortBarsBy(updatedBars, sortBy, isHorizontal);

          return (
            <Group key={_.uniqueId()} top={barGroup.y0}>
              {sortedBars.map((bar) => {
                const thickness = getBarThickness(bar.height, maxSize, fixedBarSize);
                const { x, width } = getBarSizeAndPosition(bar, seriesAxis, isHorizontal);

                return (
                  <Group key={_.uniqueId()}>
                    {hasBackgroundSeries && (
                      <Bar
                        className={dynamicClassName(overLegend, bar.key)}
                        x={0}
                        y={bar.y}
                        width={maxWidth}
                        height={thickness}
                        fill={bgColor}
                        opacity={background.opacity}
                        rx={background.rx}
                      />
                    )}

                    <Bar
                      className={dynamicClassName(overLegend, bar.key)}
                      x={x}
                      y={bar.y}
                      width={width}
                      height={thickness}
                      fill={bar.color}
                      rx={barStyle.rx}
                      opacity={barStyle.opacity}
                      onClick={() => ({})}
                    />
                  </Group>
                );
              })}
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
      {barGroups => barGroups.map((barGroup, i) => {
        const updatedBars = extractBarValueFromNestedKey(barGroup, i, data, seriesAxis.scale, maxHeight, isHorizontal);
        const sortedBars = sortBarsBy(updatedBars, sortBy, isHorizontal);

        return (
          <Group key={_.uniqueId()} left={barGroup.x0}>
            {sortedBars.map((bar) => {
              const thickness = getBarThickness(bar.width, maxSize, fixedBarSize);
              const { y, height } = getBarSizeAndPosition(bar, seriesAxis, isHorizontal);

              return (
                <Group key={_.uniqueId()}>
                  {hasBackgroundSeries && (
                    <Bar
                      className={dynamicClassName(overLegend, bar.key)}
                      x={bar.x}
                      y={0}
                      width={thickness}
                      height={maxHeight}
                      fill={bgColor}
                      opacity={background.opacity}
                      rx={background.rx}
                    />
                  )}

                  <Bar
                    className={dynamicClassName(overLegend, bar.key)}
                    key={_.uniqueId()}
                    x={bar.x}
                    y={y}
                    width={thickness}
                    height={height}
                    fill={bar.color}
                    opacity={barStyle.opacity}
                    rx={barStyle.rx}
                    onClick={() => ({})}
                  />
                </Group>
              );
            })}
          </Group>
        );
      })}
    </BarGroup>
  );
};

BarsSeries.displayName = 'BarSeries';

