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
import { Bar, BarStack, BarStackHorizontal } from '@visx/shape';
import _ from 'lodash';
import { useCallback } from 'react';

import { useBars } from '@/hooks';
import {
  getBarThickness,
} from '@/utils';

import { useCartesianContext } from '../../../providers';
import { BarsItem, BarsItemBlurred } from './bars.module.css';

export const BarsStackSeries = () => {
  const { hoveredLegendItem: overLegend } = useCartesianContext();
  const {
    data,
    isHorizontal,
    series,
    // sortBy,
    maxWidth,
    maxHeight,
    X0Y0,
    scaleXY0,
    style,
    fixedBarSize,
    scaleColorStackSeries,
    scaleStackSeries,
  } = useBars();

  const { bar: barStyle, maxSize } = style;

  const dynamicClassName = useCallback((overLegend: string, dataKey: string) => ((overLegend === dataKey || overLegend === '')
    ? BarsItem
    : BarsItemBlurred), []);

  if (!isHorizontal) {
    return (
      <BarStackHorizontal
        data={data}
        keys={series.dataKey}
        height={maxHeight}
        y={X0Y0}
        yScale={scaleXY0}
        xScale={scaleStackSeries as any}
        color={scaleColorStackSeries}
      >
        {barStacks => barStacks.map((barStack) => {
          console.log('barStack', barStack.bars);
          return (
            <Group key={_.uniqueId()}>
              {barStack.bars.map((bar) => {
                // const { x, width } = getBarSizeAndPosition(bar, seriesAxis, isHorizontal);
                const thickness = getBarThickness(bar.height, maxSize, fixedBarSize);
                // console.log(sortedBars);
                return (
                  <Group key={_.uniqueId()}>
                    <Bar
                      className={dynamicClassName(overLegend, bar.key)}
                      x={bar.x}
                      y={bar.y}
                      width={bar.width}
                      height={thickness}
                      fill={bar.color}
                      rx={0}
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
      </BarStackHorizontal>
    );
  }

  return (
    <BarStack
      data={data}
      keys={series.dataKey}
      width={maxWidth}
      x={X0Y0}
      xScale={scaleXY0}
      yScale={scaleStackSeries as any}
      color={scaleColorStackSeries}
    >
      {barStacks => barStacks.map((barStack) => {
        console.log('barStack', barStack.bars);
        return (
          <Group key={_.uniqueId()}>
            {barStack.bars.map((bar) => {
              const thickness = getBarThickness(bar.width, maxSize, fixedBarSize);

              return (
                <Group key={_.uniqueId()}>
                  <Bar
                    className={dynamicClassName(overLegend, bar.key)}
                    key={_.uniqueId()}
                    x={bar.x}
                    y={bar.y}
                    width={thickness}
                    height={bar.height}
                    fill={bar.color}
                    opacity={barStyle.opacity}
                    rx={0}
                    onClick={() => ({})}
                  />
                </Group>
              );
            })}
          </Group>
        );
      })}
    </BarStack>
  );
};

BarsStackSeries.displayName = 'BarsStackSeries';

