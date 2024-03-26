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

import { useBars } from '@/hooks';
import {
  getPrimitiveFromObjectByPath,
  getStackBarIndexPositionSeries,
  getStackBarLabelContent,
  getStackBarLabelMorphology,
  getStackBarThickness,
} from '@/utils';

import { useStyleConfigContext } from '../../../providers';
import { BarsLabel } from './bars-label';

export const BarsStackSeriesLabels = () => {
  const { bars } = useStyleConfigContext();

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
    hasLabel,
  } = useBars();

  const { maxSize } = style;

  const { fontWeight, fontWeightValue } = bars.label;

  if (!hasLabel) return null;

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

              const weigth = series.extraData ? fontWeightValue : fontWeight;

              return (
                <Group key={_.uniqueId()}>
                  {showLabel && (
                    <BarsLabel
                      wrapper={{ ...rect }}
                      text={text}
                      value={value}
                      separator={separator}
                      extraData={extra}
                      fontWeightValue={weigth}
                      dataKey={bar.key}
                    />
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

            const weigth = series.extraData ? fontWeightValue : fontWeight;

            return (
              <Group key={_.uniqueId()}>
                {showLabel && (
                  <BarsLabel
                    wrapper={{ ...rect }}
                    text={text}
                    value={value}
                    separator={separator}
                    extraData={extra}
                    fontWeightValue={weigth}
                    dataKey={bar.key}
                  />
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

