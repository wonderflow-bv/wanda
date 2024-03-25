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
import { BarGroup, BarGroupHorizontal } from '@visx/shape';
import _ from 'lodash';
import { useCallback } from 'react';

import { useBars } from '@/hooks';
import {
  extractBarValueFromNestedKey,
  getBarSizeAndPosition, getBarThickness,
  getLabelFromPath,
  sortBarsBy,
} from '@/utils';

import { useCartesianContext, useStyleConfigContext, useThemeContext } from '../../../providers';
import { BarsItem, BarsItemBlurred } from './bars.module.css';

export const BarsOverlayLabels = () => {
  const { hoveredLegendItem: overLegend } = useCartesianContext();
  const theme = useThemeContext();
  const { themes, bars } = useStyleConfigContext();
  const {
    barChartLabelsMaxSize,
    data,
    isHorizontal,
    fixedBarSize,
    maxWidth,
    maxHeight,
    scaleXY0,
    scaleXY1,
    // series,
    showLabel,
    sortBy,
    // seriesAxis,
    hasOverlay,
    overlay,
    overlayAxis,
    style,
    X0Y0,
  } = useBars();

  const { maxSize } = style;
  const {
    fontFamily, fontWeight, fontSize, alignmentBaseline, fontWeightValue, height, fillOpacity, rx,
  } = bars.label;

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
              {sortedBars.map((bar, j) => {
                const thickness = getBarThickness(bar.height, maxSize, fixedBarSize);
                const { y } = getBarSizeAndPosition(bar, overlayAxis, thickness, isHorizontal);
                const xShifted = Number(maxWidth) + 16;
                const yShifted = Number(y) + Number(thickness / 2) + 4;

                return (
                  <Group key={_.uniqueId()}>
                    {showLabel && (
                      <Group className={dynamicClassName(overLegend, bar.key)}>
                        <text
                          x={xShifted}
                          y={yShifted}
                          fontSize={fontSize}
                          fontWeight={fontWeight}
                          fontFamily={fontFamily}
                          fill={themes[theme].axis.tickLabel}
                          alignmentBaseline={alignmentBaseline}
                        >
                          <tspan fontWeight={fontWeightValue}>{bar.value}</tspan>
                          {
                            overlay.extraData && (
                              <>
                                <tspan>{' '}</tspan>
                                <tspan>
                                  {overlay.extraData(_.at(data[i], getLabelFromPath(overlay.dataKey![j]))[0])}
                                </tspan>
                              </>
                            )
                          }
                        </text>
                      </Group>
                    )}
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
            {sortedBars.map((bar, j) => {
              const thickness = getBarThickness(bar.width, maxSize, fixedBarSize);
              const { x } = getBarSizeAndPosition(bar, overlayAxis, thickness, isHorizontal);
              const xPosText = Number(x) + Number(thickness) / 2;
              const yPosText = maxHeight - bar.height - 8;
              const xPosRect = (Number(x) + Number(thickness) / 2) - (barChartLabelsMaxSize / 2);
              const yPosRect = yPosText - 14;

              return (
                <Group key={_.uniqueId()}>
                  {showLabel && (
                    <Group className={dynamicClassName(overLegend, bar.key)}>
                      <rect
                        x={xPosRect}
                        y={yPosRect}
                        width={barChartLabelsMaxSize}
                        height={height}
                        fill={themes[theme].markerLabel.background}
                        fillOpacity={fillOpacity}
                        rx={rx}
                      />
                      <text
                        x={xPosText}
                        y={yPosText}
                        fontSize={fontSize}
                        fontWeight={fontWeight}
                        fontFamily={fontFamily}
                        fill={themes[theme].axis.tickLabel}
                        alignmentBaseline={alignmentBaseline}
                        textAnchor="middle"
                      >
                        <tspan fontWeight={fontWeightValue}>{bar.value}</tspan>
                        {
                            overlay.extraData && (
                              <>
                                <tspan>{' '}</tspan>
                                <tspan>
                                  {overlay.extraData(_.at(data[i], getLabelFromPath(overlay.dataKey![j]))[0])}
                                </tspan>
                              </>
                            )
                          }
                      </text>

                    </Group>
                  )}
                </Group>
              );
            })}
          </Group>
        );
      })}
    </BarGroup>
  );
};

BarsOverlayLabels.displayName = 'BarOverlayLabels';

