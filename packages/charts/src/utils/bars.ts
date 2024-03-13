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

import _ from 'lodash';

import { CartesianAxis } from '../types/axis';
import { BarChartMetadata } from '../types/bar-chart';
import { Bar, BarsStyleConfig } from '../types/bars';
import { Data } from '../types/main';
import { clampLinearDomain } from './axis';

export const getBarSize = (bar: Bar, axis: CartesianAxis, isHorizontal: boolean) => {
  const clampedDomain = clampLinearDomain(axis.domain as number[]);
  const min = _.min(clampedDomain);
  const scaleZero = axis.scale(0 as any) ?? 0;
  const scaleMin = axis.scale(min as any) ?? 0;
  const diffNegative = scaleMin - scaleZero;

  if (isHorizontal) {
    return (bar.value >= 0)
      ? (bar.height - diffNegative)
      : (diffNegative - bar.height);
  }

  return (bar.value >= 0)
    ? (bar.width + diffNegative)
    : Math.abs(bar.width + diffNegative);
};

export const getBarPosition = (bar: Bar, axis: CartesianAxis, isHorizontal: boolean) => {
  const scaleZero = axis.scale(0 as any) ?? 0;

  if (isHorizontal) {
    return (bar.value >= 0)
      ? bar.y
      : scaleZero;
  }

  return (bar.value >= 0)
    ? scaleZero
    : bar.width;
};

export const getBarSizeAndPosition = (bar: Bar, axis: CartesianAxis, isHorizontal: boolean) => {
  const size = getBarSize(bar, axis, isHorizontal);
  const position = getBarPosition(bar, axis, isHorizontal);
  return {
    x: isHorizontal ? undefined : position,
    y: isHorizontal ? position : undefined,
    width: isHorizontal ? undefined : size,
    height: isHorizontal ? size : undefined,
  };
};

export const getBarThickness = (
  thickness: number,
  maxSize: number,
  fixedBarSize: boolean,
) => {
  if (fixedBarSize) {
    return _.clamp(thickness, 2, maxSize);
  }

  return thickness;
};

export const getHeightForVerticalChartWithFixedBarSize = (
  config: BarsStyleConfig,
  data: Data,
  metadata: BarChartMetadata,
) => {
  const { series, overlay } = metadata;

  const indexLen = data.length;

  const seriesBarsNum = series.dataKey.length;
  const overlayBarsNum = overlay.dataKey?.length ?? 0;
  const totalBarsNum = seriesBarsNum + overlayBarsNum;

  const {
    maxSize, paddingInnerGroup, paddingOuterGroup, paddingInner, paddingOuter,
  } = config;

  const barGroup = totalBarsNum * maxSize * (1 + paddingInnerGroup) * (1 + paddingOuterGroup);
  const allGroups = (indexLen + 2) * barGroup * (1 + paddingInner) + barGroup * (2 + paddingOuter);

  const h = _.round(allGroups);

  return h;
};

