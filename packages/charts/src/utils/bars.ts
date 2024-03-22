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

import { axisStyleConfig } from '../style-config/axis';
import { CartesianAxis } from '../types/axis';
import { BarChartMetadata, BarChartSeries } from '../types/bar-chart';
import {
  Bar, BarChartLabel, BarChartLabels, BarsStyleConfig,
} from '../types/bars';
import { Data } from '../types/main';
import { clampLinearDomain } from './axis';
import { getLabelFromPath, getPrimitiveFromObjectByPath } from './data';

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

export const getBarIndexPositionSeries = (
  bar: Bar,
  thickness: number,
  isHorizontal: boolean,
) => {
  const {
    width, height, x, y,
  } = bar;

  if (isHorizontal) {
    const hasCustomWidth = width !== thickness;
    let xPos = x;

    if (hasCustomWidth) {
      const diff = (width - thickness) / 2;
      xPos += diff;
    }

    return xPos;
  }

  const hasCustomHeight = height !== thickness;
  let yPos = y;

  if (hasCustomHeight) {
    const diff = (height - thickness) / 2;
    yPos += diff;
  }

  return yPos;
};

export const getBarSizeAndPosition = (
  bar: Bar,
  axis: CartesianAxis,
  thickness: number,
  isHorizontal: boolean,
) => {
  const size = getBarSize(bar, axis, isHorizontal);
  const position = getBarPosition(bar, axis, isHorizontal);
  const indexPosition = getBarIndexPositionSeries(bar, thickness, isHorizontal);

  return {
    x: isHorizontal ? indexPosition : position,
    y: isHorizontal ? position : indexPosition,
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

export const getStackBarIndexPositionSeries = (
  bar: Bar,
  thickness: number,
  hasOverlay: boolean,
  isHorizontal: boolean,
) => {
  const {
    width, height, x, y,
  } = bar;

  if (isHorizontal) {
    const hasCustomWidth = width !== thickness;
    let xPos = x;

    if (hasCustomWidth) {
      const diff = (width - thickness) / 2;
      xPos += diff;

      if (hasOverlay) xPos -= (thickness / 2 + 1);
    } else if (hasOverlay) {
      xPos -= (width / 2 + 1);
    }

    return xPos;
  }

  const hasCustomHeight = height !== thickness;
  let yPos = y;

  if (hasCustomHeight) {
    const diff = (height - thickness) / 2;
    yPos += diff;

    if (hasOverlay) yPos -= (thickness / 2 + 1);
  } else if (hasOverlay) {
    yPos -= (height / 2 + 1);
  }

  return yPos;
};

export const getStackBarIndexPositionOverlay = (
  bar: Bar,
  thickness: number,
  isHorizontal: boolean,
) => {
  const {
    width, height, x, y,
  } = bar;

  if (isHorizontal) {
    const hasCustomWidth = width !== thickness;
    let xPos = x;

    if (hasCustomWidth) {
      const diff = (width - thickness) / 2;
      xPos += diff;
      xPos += thickness / 2 + 1;
    } else {
      xPos += (width / 2) + 1;
    }

    return xPos;
  }

  const hasCustomHeight = height !== thickness;
  let yPos = y;

  if (hasCustomHeight) {
    const diff = (height - thickness) / 2;
    yPos += diff;
    yPos += (thickness / 2 + 1);
  } else {
    yPos += (height / 2 + 1);
  }

  return yPos;
};

export const getStackBarThickness = (
  thickness: number,
  maxSize: number,
  fixedBarSize: boolean,
  hasOverlay: boolean,
) => {
  const t = hasOverlay ? (thickness - 1) / 2 : thickness;

  if (fixedBarSize) {
    return _.clamp(t, 2, maxSize);
  }

  return t;
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

export const getLinearDomainStackSeries = (data: Data, dataKeys: string[], currentDomain?: number[]) => {
  if (dataKeys.length === 1 && currentDomain) return currentDomain;

  const domainStackSum = data.map((datum) => {
    const values: number[] = [];
    dataKeys.forEach(k => values.push(_.at(datum, k)[0]));
    return _.sum(values);
  });

  const domainStackSeries = [_.min(domainStackSum)!, _.max(domainStackSum)!];

  const clampedDomain = clampLinearDomain(domainStackSeries);

  const minClamped = _.min(clampedDomain) ?? 0;
  const maxClamped = _.max(clampedDomain) ?? 0;

  const minCurrent = _.min(currentDomain) ?? 0;
  const maxCurrent = _.max(currentDomain) ?? 0;

  const stackDomain = [_.min([minCurrent, minClamped]) ?? 0, _.max([maxCurrent, maxClamped]) ?? 0];

  return clampLinearDomain(stackDomain);
};

export const getBarChartLabels = (
  data: Data,
  series: BarChartSeries,
  overlay?: BarChartSeries,
): BarChartLabels => {
  const seriesLabels = data.map(datum => series.dataKey.map((k) => {
    const value = getPrimitiveFromObjectByPath(datum, k) ?? '';
    const extraData = series.extraData?.(_.at(datum, getLabelFromPath(k))[0]) ?? '';
    const { length } = (`${value} ${extraData}`);

    return ({
      value,
      extraData,
      length,
    });
  }));

  const overlayLabels = overlay
    ? data.map(datum => overlay.dataKey.map((k) => {
      const value = getPrimitiveFromObjectByPath(datum, k) ?? '';
      const extraData = overlay.extraData?.(_.at(datum, getLabelFromPath(k))[0]) ?? '';
      const { length } = (`${value} ${extraData}`);

      return ({
        value,
        extraData,
        length,
      });
    }))
    : undefined;

  return { series: seriesLabels, overlay: overlayLabels };
};

export const getBarChartLabelsMaxLength = (labels: BarChartLabels) => {
  const { series, overlay } = labels;
  const flatSeries = _.flattenDeep<BarChartLabel>(series) as BarChartLabel[];
  const flatOverlay = overlay ? _.flattenDeep<BarChartLabel>(overlay) as BarChartLabel[] : [];
  const lengths = flatSeries.concat(flatOverlay).map(el => el.length);
  return _.max(lengths);
};

export const getBarChartLabelsMaxSize = (length: number) => {
  const charSize = axisStyleConfig.spacing.labelCharExtimatedWidth;
  const extraSpace = 1.20;
  return Math.round(length * charSize * extraSpace);
};
