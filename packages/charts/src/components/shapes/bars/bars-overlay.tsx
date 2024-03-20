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
import { extractBarValueFromNestedKey, getBarSizeAndPosition, getBarThickness } from '@/utils';

import {
  useCartesianContext, useStyleConfigContext, useThemeContext,
} from '../../../providers';
import { sortBarsBy } from '../../../utils';
import { BarsItem, BarsItemBlurred } from './bars.module.css';

export const BarsOverlay = () => {
  const { hoveredLegendItem: overLegend } = useCartesianContext();
  const theme = useThemeContext();
  const { themes } = useStyleConfigContext();

  const {
    data,
    isHorizontal,
    overlay,
    sortBy,
    hasBackgroundOverlay,
    overlayAxis,
    hasOverlay,
    maxWidth,
    maxHeight,
    X0Y0,
    scaleXY0,
    scaleXY1,
    fixedBarSize,
    style,
  } = useBars();

  const { bar: barStyle, background, maxSize } = style;
  const bgColor = themes[theme].bars.backgroundColor;

  const dynamicClassName = useCallback((overLegend: string, dataKey: string) => ((overLegend === dataKey || overLegend === '')
    ? BarsItem
    : BarsItemBlurred), []);

  if (!hasOverlay) return null;

  if (!isHorizontal) {
    return (
      <BarGroupHorizontal
        data={data}
        keys={overlay.dataKey!}
        width={maxWidth}
        y0={X0Y0}
        y0Scale={scaleXY0}
        y1Scale={scaleXY1}
        xScale={overlayAxis.scale}
        color={(_, i) => overlay.colors![i]}
      >
        {barGroups => barGroups.map((barGroup, i) => {
          const updatedBars = extractBarValueFromNestedKey(
            barGroup, i, data, overlayAxis.scale, maxWidth, isHorizontal,
          );
          const sortedBars = sortBarsBy(updatedBars, sortBy, isHorizontal);

          return (
            <Group key={_.uniqueId()} top={barGroup.y0}>
              {sortedBars.map((bar) => {
                const thickness = getBarThickness(bar.height, maxSize, fixedBarSize);
                const { x, width } = getBarSizeAndPosition(bar, overlayAxis, isHorizontal);

                return (
                  <Group key={_.uniqueId()}>
                    {hasBackgroundOverlay && (
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
      keys={overlay.dataKey!}
      height={maxHeight}
      x0={X0Y0}
      x0Scale={scaleXY0}
      x1Scale={scaleXY1}
      yScale={overlayAxis.scale}
      color={(_, i) => overlay.colors![i]}
    >
      {barGroups => barGroups.map((barGroup, i) => {
        const updatedBars = extractBarValueFromNestedKey(barGroup, i, data, overlayAxis.scale, maxHeight, isHorizontal);
        const sortedBars = sortBarsBy(updatedBars, sortBy, isHorizontal);

        return (
          <Group key={_.uniqueId()} left={barGroup.x0}>
            {sortedBars.map((bar) => {
              const thickness = getBarThickness(bar.width, maxSize, fixedBarSize);
              const { y, height } = getBarSizeAndPosition(bar, overlayAxis, isHorizontal);

              return (
                <Group key={_.uniqueId()}>
                  { hasBackgroundOverlay && (
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

BarsOverlay.displayName = 'BarOverlay';

