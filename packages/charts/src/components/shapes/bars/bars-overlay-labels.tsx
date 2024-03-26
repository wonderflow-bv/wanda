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

import { useBars } from '@/hooks';
import {
  extractBarValueFromNestedKey,
  getBarLabelContent,
  getBarLabelMorphology,
  getBarSizeAndPosition, getBarThickness,
  sortBarsBy,
} from '@/utils';

import { useStyleConfigContext } from '../../../providers';
import { BarsLabel } from './bars-label';

export const BarsOverlayLabels = () => {
  const { bars } = useStyleConfigContext();
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
    showLabel,
    sortBy,
    hasOverlay,
    hasLabel,
    overlay,
    overlayAxis,
    style,
    X0Y0,
  } = useBars();

  const { maxSize } = style;

  const { fontWeight, fontWeightValue } = bars.label;

  if (!hasOverlay || !hasLabel) return null;

  if (isVertical) {
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

                const { value, separator, extra } = getBarLabelContent(
                  data[i],
                  bar,
                  overlay.dataKey![j],
                  overlay.extraData,
                );

                const { text } = getBarLabelMorphology(
                  bar,
                  overlay.extraData,
                  { value, separator, extra },
                  barChartLabelsMaxSize,
                  thickness,
                  { x: undefined, y },
                  { xMax: maxWidth, yMax: maxHeight },
                  isHorizontal,
                );

                const weigth = overlay.extraData ? fontWeightValue : fontWeight;

                return (
                  <Group key={_.uniqueId()}>
                    {showLabel && (
                      <BarsLabel
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

              const { value, separator, extra } = getBarLabelContent(
                data[i],
                bar,
                overlay.dataKey![j],
                overlay.extraData,
              );

              const { rect, text } = getBarLabelMorphology(
                bar,
                overlay.extraData,
                { value, separator, extra },
                barChartLabelsMaxSize,
                thickness,
                { x, y: undefined },
                { xMax: maxWidth, yMax: maxHeight },
                isHorizontal,
              );

              const weigth = overlay.extraData ? fontWeightValue : fontWeight;

              return (
                <Group key={_.uniqueId()}>
                  {showLabel && (
                    <BarsLabel
                      wrapper={{
                        x: rect.x ?? 0,
                        y: rect.y ?? 0,
                        width: rect.width,
                      }}
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
        );
      })}
    </BarGroup>
  );
};

BarsOverlayLabels.displayName = 'BarOverlayLabels';

