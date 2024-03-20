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
  extractStackBarValueFromNestedKey,
  getStackBarIndexPositionOverlay,
  getStackBarThickness,
} from '@/utils';

import { useCartesianContext } from '../../../providers';
import { BarsItem, BarsItemBlurred } from './bars.module.css';

export const BarsStackOverlay = () => {
  const { hoveredLegendItem: overLegend } = useCartesianContext();
  const {
    data,
    isHorizontal,
    overlay,
    // sortBy,
    maxWidth,
    maxHeight,
    X0Y0,
    scaleXY0,
    style,
    fixedBarSize,
    scaleColorStackOverlay,
    scaleStackOverlay,
    hasOverlay,
  } = useBars();

  const { bar: barStyle, maxSize } = style;

  const dynamicClassName = useCallback((overLegend: string, dataKey: string) => ((overLegend === dataKey || overLegend === '')
    ? BarsItem
    : BarsItemBlurred), []);

  if (!hasOverlay) return null;

  if (!isHorizontal) {
    return (
      <BarStackHorizontal
        data={data}
        keys={overlay.dataKey}
        height={maxHeight}
        y={X0Y0}
        yScale={scaleXY0}
        xScale={scaleStackOverlay as any}
        color={scaleColorStackOverlay}
      >
        {barStacks => barStacks.map((barStack, index) => {
          const updatedStack = extractStackBarValueFromNestedKey(
            barStack as any,
            index,
            overlay.dataKey!,
            data,
            scaleStackOverlay as any,
            scaleXY0,
            isHorizontal,
          );

          return (
            <Group key={_.uniqueId()}>
              {updatedStack.bars.map((bar: any) => {
                const thickness = getStackBarThickness(bar.height, maxSize, fixedBarSize, hasOverlay);
                const yPos = getStackBarIndexPositionOverlay(bar, thickness, isHorizontal);

                return (
                  <Group key={_.uniqueId()}>
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
          );
        })
          }
      </BarStackHorizontal>
    );
  }

  return (
    <BarStack
      data={data}
      keys={overlay.dataKey}
      width={maxWidth}
      x={X0Y0}
      xScale={scaleXY0}
      yScale={scaleStackOverlay as any}
      color={scaleColorStackOverlay}
    >
      {barStacks => barStacks.map((barStack, index) => {
        const updatedStack = extractStackBarValueFromNestedKey(
          barStack as any,
          index,
          overlay.dataKey!,
          data,
          scaleXY0,
          scaleStackOverlay as any,
          isHorizontal,
        );

        return (
          <Group key={_.uniqueId()}>
            {updatedStack.bars.map((bar: any) => {
              const thickness = getStackBarThickness(bar.width, maxSize, fixedBarSize, hasOverlay);
              const xPos = getStackBarIndexPositionOverlay(bar, thickness, isHorizontal);

              return (
                <Group key={_.uniqueId()}>
                  <Bar
                    className={dynamicClassName(overLegend, bar.key)}
                    key={_.uniqueId()}
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
        );
      })}
    </BarStack>
  );
};

BarsStackOverlay.displayName = 'BarsStackOverlay';

