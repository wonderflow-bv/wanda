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
import { BarStack, BarStackHorizontal } from '@visx/shape';
import _ from 'lodash';
import { useCallback } from 'react';

import { useBars } from '@/hooks';
import {
  getPrimitiveFromObjectByPath,
  getStackBarIndexPositionSeries,
  getStackBarLabelContent,
  getStackBarLabelMorphology,
  getStackBarThickness,
} from '@/utils';

import { useCartesianContext, useStyleConfigContext, useThemeContext } from '../../../providers';
import { BarsItem, BarsItemBlurred } from './bars.module.css';

export const BarsStackSeriesLabels = () => {
  const { hoveredLegendItem: overLegend } = useCartesianContext();
  const theme = useThemeContext();
  const { themes, bars } = useStyleConfigContext();

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
    showLabel,
    fixedBarSize,
    scaleColorStackSeries,
    scaleStackSeries,
    hasOverlay,
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
        {barStacks => barStacks.map((barStack, i) => (
          <Group key={_.uniqueId()}>
            {barStack.bars.map((bar: any, j) => {
              const thickness = getStackBarThickness(bar.height, maxSize, fixedBarSize, hasOverlay);
              const yPos = getStackBarIndexPositionSeries(bar, thickness, hasOverlay, isHorizontal);
              const { value, separator, extra } = getStackBarLabelContent(data[j], series.dataKey, series.extraData, i);

              const { rect, text } = getStackBarLabelMorphology(
                bar,
                series.extraData,
                { value, separator, extra },
                thickness,
                { x: undefined, y: yPos },
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
      {barStacks => barStacks.map((barStack, i) => (
        <Group key={_.uniqueId()}>
          {barStack.bars.map((bar: any, j: number) => {
            const thickness = getStackBarThickness(bar.width, maxSize, fixedBarSize, hasOverlay);
            const xPos = getStackBarIndexPositionSeries(bar, thickness, hasOverlay, isHorizontal);

            const { value, separator, extra } = getStackBarLabelContent(data[j], series.dataKey, series.extraData, i);

            const { rect, text } = getStackBarLabelMorphology(
              bar,
              series.extraData,
              { value, separator, extra },
              thickness,
              { x: xPos, y: undefined },
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
      ))}
    </BarStack>
  );
};

BarsStackSeriesLabels.displayName = 'BarsStackSeriesLabels';

