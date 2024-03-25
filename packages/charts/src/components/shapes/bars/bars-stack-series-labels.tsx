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
  getLabelFromPath,
  getPrimitiveFromObjectByPath,
  getStackBarIndexPositionSeries,
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

  if (!isHorizontal) {
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
            {barStack.bars.map((bar: any, j) => {
              const thickness = getStackBarThickness(bar.height, maxSize, fixedBarSize, hasOverlay);
              const yPos = getStackBarIndexPositionSeries(bar, thickness, hasOverlay, isHorizontal);

              const value = getPrimitiveFromObjectByPath(bar.bar.data, series.dataKey[index]) ?? '';
              const separator = ' - ';
              const extra = series.extraData
                ? series.extraData(_.at(data[j], getLabelFromPath(series.dataKey[index]))[0])
                : '';
              const len = series.extraData
                ? (`${value}${separator}${extra}`).length
                : String(`${value}`).length;
              const labelSize = Math.round(len * 1.1 * 8);

              const xPosRect = Number(bar.x) + Number(bar.width) + 8;
              const yPosRect = Number(yPos) + 3;

              const xPosText = xPosRect + labelSize / 2;
              const yPosText = yPosRect + 13;

              return (
                <Group key={_.uniqueId()}>
                  {showLabel && (
                    <Group className={dynamicClassName(overLegend, bar.key)}>
                      <rect
                        x={xPosRect}
                        y={yPosRect}
                        width={labelSize}
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
      {barStacks => barStacks.map((barStack, index) => (
        <Group key={_.uniqueId()}>
          {barStack.bars.map((bar: any, j: number) => {
            const thickness = getStackBarThickness(bar.width, maxSize, fixedBarSize, hasOverlay);
            const xPos = getStackBarIndexPositionSeries(bar, thickness, hasOverlay, isHorizontal);

            const value = getPrimitiveFromObjectByPath(bar.bar.data, series.dataKey[index]) ?? '';
            const separator = ' - ';
            const extra = series.extraData
              ? series.extraData(_.at(data[j], getLabelFromPath(series.dataKey[index]))[0])
              : '';
            const len = series.extraData
              ? (`${value}${separator}${extra}`).length
              : String(`${value}`).length;
            const labelSize = Math.round(len * 1.1 * 8);

            const xPosRect = (Number(xPos) + (Number(thickness) - labelSize) / 2);
            const yPosRect = Number(bar.y) - 24;

            const xPosText = Number(xPos) + Number(thickness) / 2;
            const yPosText = Number(bar.y) - 10;

            return (
              <Group key={_.uniqueId()}>
                {showLabel && (
                  <Group className={dynamicClassName(overLegend, bar.key)}>
                    <rect
                      x={xPosRect}
                      y={yPosRect}
                      width={labelSize}
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

