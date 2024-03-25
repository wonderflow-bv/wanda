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
  getStackBarIndexPositionOverlay,
  getStackBarThickness,
} from '@/utils';

import { useCartesianContext, useStyleConfigContext, useThemeContext } from '../../../providers';
import { BarsItem, BarsItemBlurred } from './bars.module.css';

export const BarsStackOverlay = () => {
  const { hoveredLegendItem: overLegend } = useCartesianContext();
  const theme = useThemeContext();
  const { themes } = useStyleConfigContext();

  const {
    data,
    isHorizontal,
    overlay,
    sortStackBy,
    maxWidth,
    maxHeight,
    X0Y0,
    scaleXY0,
    style,
    fixedBarSize,
    scaleColorStackOverlay,
    scaleStackOverlay,
    hasOverlay,
    hasBackgroundOverlay,
  } = useBars();

  const { bar: barStyle, maxSize, background } = style;
  const bgColor = themes[theme].bars.backgroundColor;

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
        xScale={scaleStackOverlay as any}
        yScale={scaleXY0}
        color={scaleColorStackOverlay}
        value={(d, k) => getPrimitiveFromObjectByPath(d, k) ?? 0 as any}
        order={sortStackBy}
        offset="diverging"
      >
        {barStacks => barStacks.map((barStack, index) => (
          <Group key={_.uniqueId()}>
            {barStack.bars.map((bar: any) => {
              const thickness = getStackBarThickness(bar.height, maxSize, fixedBarSize, hasOverlay);
              const yPos = getStackBarIndexPositionOverlay(bar, thickness, isHorizontal);

              return (
                <Group key={_.uniqueId()}>
                  {(hasBackgroundOverlay && index === 0) && (
                    <Bar
                      className={dynamicClassName(overLegend, bar.key)}
                      x={0}
                      y={yPos}
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
      keys={overlay.dataKey}
      width={maxWidth}
      x={X0Y0}
      xScale={scaleXY0}
      yScale={scaleStackOverlay as any}
      color={scaleColorStackOverlay}
      value={(d, k) => getPrimitiveFromObjectByPath(d, k) ?? 0 as any}
      order={sortStackBy}
      offset="diverging"
    >
      {barStacks => barStacks.map((barStack, index) => (
        <Group key={_.uniqueId()}>
          {barStack.bars.map((bar: any) => {
            const thickness = getStackBarThickness(bar.width, maxSize, fixedBarSize, hasOverlay);
            const xPos = getStackBarIndexPositionOverlay(bar, thickness, isHorizontal);

            return (
              <Group key={_.uniqueId()}>
                {(hasBackgroundOverlay && index === 0) && (
                  <Bar
                    className={dynamicClassName(overLegend, bar.key)}
                    x={xPos}
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

BarsStackOverlay.displayName = 'BarsStackOverlay';

