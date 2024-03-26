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
  getBarLabelContent,
  getBarLabelMorphology,
  getBarSizeAndPosition, getBarThickness,
  sortBarsBy,
} from '@/utils';

import { useCartesianContext, useStyleConfigContext, useThemeContext } from '../../../providers';
import { BarsItem, BarsItemBlurred } from './bars.module.css';

export const BarsSeriesLabels = () => {
  const { hoveredLegendItem: overLegend } = useCartesianContext();
  const theme = useThemeContext();
  const { themes, bars } = useStyleConfigContext();
  const {
    barChartLabelsMaxSize,
    data,
    isHorizontal,
    isVertical,
    fixedBarSize,
    maxWidth,
    maxHeight,
    scaleXY0,
    scaleXY1,
    series,
    showLabel,
    sortBy,
    seriesAxis,
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

  if (isVertical) {
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
              {sortedBars.map((bar, j) => {
                const thickness = getBarThickness(bar.height, maxSize, fixedBarSize);
                const { y } = getBarSizeAndPosition(bar, seriesAxis, thickness, isHorizontal);

                const { value, separator, extra } = getBarLabelContent(
                  data[i],
                  bar,
                  series.dataKey![j],
                  series.extraData,
                );

                const { text } = getBarLabelMorphology(
                  bar,
                  series.extraData,
                  { value, separator, extra },
                  barChartLabelsMaxSize,
                  thickness,
                  { x: undefined, y },
                  { xMax: maxWidth, yMax: maxHeight },
                  isHorizontal,
                );

                return (
                  <Group key={_.uniqueId()}>
                    {showLabel && (
                      <Group className={dynamicClassName(overLegend, bar.key)}>
                        <text
                          x={text.x}
                          y={text.y}
                          fontSize={fontSize}
                          fontWeight={fontWeight}
                          fontFamily={fontFamily}
                          fill={themes[theme].axis.tickLabel}
                          alignmentBaseline={alignmentBaseline}
                        >
                          <tspan fontWeight={fontWeightValue}>{value}</tspan>
                          {
                            series.extraData && (
                              <>
                                <tspan>{separator}</tspan>
                                <tspan>
                                  {extra}
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
            {sortedBars.map((bar, j) => {
              const thickness = getBarThickness(bar.width, maxSize, fixedBarSize);
              const { x } = getBarSizeAndPosition(bar, seriesAxis, thickness, isHorizontal);

              const { value, separator, extra } = getBarLabelContent(
                data[i],
                bar,
                series.dataKey![j],
                series.extraData,
              );

              const { rect, text } = getBarLabelMorphology(
                bar,
                series.extraData,
                { value, separator, extra },
                barChartLabelsMaxSize,
                thickness,
                { x, y: undefined },
                { xMax: maxWidth, yMax: maxHeight },
                isHorizontal,
              );

              return (
                <Group key={_.uniqueId()}>
                  {showLabel && (
                    <Group className={dynamicClassName(overLegend, bar.key)}>
                      <rect
                        x={rect.x}
                        y={rect.y}
                        width={rect.width}
                        height={height}
                        fill={themes[theme].markerLabel.background}
                        fillOpacity={fillOpacity}
                        rx={rx}
                      />
                      <text
                        x={text.x}
                        y={text.y}
                        fontSize={fontSize}
                        fontWeight={fontWeight}
                        fontFamily={fontFamily}
                        fill={themes[theme].axis.tickLabel}
                        alignmentBaseline={alignmentBaseline}
                        textAnchor="middle"
                      >
                        <tspan fontWeight={fontWeightValue}>{value}</tspan>
                        {
                            series.extraData && (
                              <>
                                <tspan>{separator}</tspan>
                                <tspan>
                                  {extra}
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

BarsSeriesLabels.displayName = 'BarSeriesLabels';

