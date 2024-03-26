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
  getPrimitiveFromObjectByPath,
  getStackBarIndexPositionSeries,
  getStackBarThickness,
} from '@/utils';

import { useCartesianContext, useStyleConfigContext, useThemeContext } from '../../../providers';
import { BarsItem, BarsItemBlurred } from './bars.module.css';

export const BarsStackSeries = () => {
  const { hoveredLegendItem: overLegend } = useCartesianContext();
  const theme = useThemeContext();
  const { themes } = useStyleConfigContext();

  const {
    data,
    isHorizontal,
    isVertical,
    series,
    sortStackBy,
    maxWidth,
    maxHeight,
    X0Y0,
    scaleXY0,
    style,
    fixedBarSize,
    scaleColorStackSeries,
    scaleStackSeries,
    hasOverlay,
    hasBackgroundSeries,
  } = useBars();

  const { bar: barStyle, maxSize, background } = style;
  const bgColor = themes[theme].bars.backgroundColor;

  const dynamicClassName = useCallback((overLegend: string, dataKey: string) => ((overLegend === dataKey || overLegend === '')
    ? BarsItem
    : BarsItemBlurred), []);

  if (isVertical) {
    return (
      <BarStackHorizontal
        data={data}
        keys={series.dataKey}
        height={maxHeight}
        y={X0Y0}
        xScale={scaleStackSeries as any}
        yScale={scaleXY0}
        color={scaleColorStackSeries}
        value={(d, k) => getPrimitiveFromObjectByPath(d, k) ?? 0 as any}
        order={sortStackBy}
        offset="diverging"
      >
        {barStacks => barStacks.map((barStack, index) => (
          <Group key={_.uniqueId()}>
            {barStack.bars.map((bar: any) => {
              const thickness = getStackBarThickness(bar.height, maxSize, fixedBarSize, hasOverlay);
              const yPos = getStackBarIndexPositionSeries(bar, thickness, hasOverlay, isHorizontal);

              return (
                <Group key={_.uniqueId()}>
                  {(hasBackgroundSeries && index === 0) && (
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
                    x={bar.x}
                    y={yPos}
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
        ))
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
      value={(d, k) => getPrimitiveFromObjectByPath(d, k) ?? 0 as any}
      order={sortStackBy}
      offset="diverging"
    >
      {barStacks => barStacks.map((barStack, index) => (
        <Group key={_.uniqueId()}>
          {barStack.bars.map((bar: any) => {
            const thickness = getStackBarThickness(bar.width, maxSize, fixedBarSize, hasOverlay);
            const xPos = getStackBarIndexPositionSeries(bar, thickness, hasOverlay, isHorizontal);

            return (
              <Group key={_.uniqueId()}>
                {(hasBackgroundSeries && index === 0) && (
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
                  x={xPos}
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
      ))}
    </BarStack>
  );
};

BarsStackSeries.displayName = 'BarsStackSeries';

