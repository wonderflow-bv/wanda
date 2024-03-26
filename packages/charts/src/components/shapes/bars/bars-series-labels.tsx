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

export const BarsSeriesLabels = () => {
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
    series,
    showLabel,
    hasLabel,
    sortBy,
    seriesAxis,
    style,
    X0Y0,
  } = useBars();

  const { maxSize } = style;

  const { fontWeight, fontWeightValue } = bars.label;

  if (!hasLabel) return null;

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

                const weigth = series.extraData ? fontWeightValue : fontWeight;

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

              const weigth = series.extraData ? fontWeightValue : fontWeight;

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

BarsSeriesLabels.displayName = 'BarSeriesLabels';

