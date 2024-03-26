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
  getStackBarIndexPositionOverlay,
  getStackBarLabelContent,
  getStackBarLabelMorphology,
  getStackBarThickness,
} from '@/utils';

import { useStyleConfigContext } from '../../../providers';
import { BarsLabel } from './bars-label';

export const BarsStackOverlayLabels = () => {
  const { bars } = useStyleConfigContext();

  const {
    data,
    isHorizontal,
    isVertical,
    sortStackBy,
    maxWidth,
    maxHeight,
    X0Y0,
    scaleXY0,
    style,
    showLabel,
    fixedBarSize,
    scaleColorStackOverlay,
    scaleStackOverlay,
    hasOverlay,
    hasLabel,
    overlay,
  } = useBars();

  const { maxSize } = style;

  const { fontWeight, fontWeightValue } = bars.label;

  if (!hasOverlay || !hasLabel) return null;

  if (isVertical) {
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
        {barStacks => barStacks.map((barStack, i) => (
          <Group key={_.uniqueId()}>
            {barStack.bars.map((bar: any, j) => {
              const thickness = getStackBarThickness(bar.height, maxSize, fixedBarSize, hasOverlay);
              const yPos = getStackBarIndexPositionOverlay(bar, thickness, isHorizontal);

              const { value, separator, extra } = getStackBarLabelContent(
                data[j],
                overlay.dataKey!,
                overlay.extraData,
                i,
              );

              const { rect, text } = getStackBarLabelMorphology(
                bar,
                overlay.extraData,
                { value, separator, extra },
                thickness,
                { x: undefined, y: yPos },
                { xMax: maxWidth, yMax: maxHeight },
                isHorizontal,
              );

              const weigth = overlay.extraData ? fontWeightValue : fontWeight;

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
      {barStacks => barStacks.map((barStack, i) => (
        <Group key={_.uniqueId()}>
          {barStack.bars.map((bar: any, j: number) => {
            const thickness = getStackBarThickness(bar.width, maxSize, fixedBarSize, hasOverlay);
            const xPos = getStackBarIndexPositionOverlay(bar, thickness, isHorizontal);

            const { value, separator, extra } = getStackBarLabelContent(
              data[j],
              overlay.dataKey!,
              overlay.extraData,
              i,
            );

            const { rect, text } = getStackBarLabelMorphology(
              bar,
              overlay.extraData,
              { value, separator, extra },
              thickness,
              { x: xPos, y: undefined },
              { xMax: maxWidth, yMax: maxHeight },
              isHorizontal,
            );

            const weigth = overlay.extraData ? fontWeightValue : fontWeight;

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

BarsStackOverlayLabels.displayName = 'BarsStackOverlayLabels';

