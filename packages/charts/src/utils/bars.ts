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
import { barsStyleConfig } from '../style-config/bars';
import { CartesianAxis } from '../types/axis';
import { BarChartMetadata, BarChartSeries } from '../types/bar-chart';
import {
  Bar, BarChartLabel, BarChartLabels, BarsStyleConfig,
  BarStackContent,
} from '../types/bars';
import { Data } from '../types/main';
import { clampLinearDomain } from './axis';
import { getDataKeyParentObject, getPrimitiveFromObjectByPath } from './data';

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
    const extraData = series.extraData?.(getDataKeyParentObject(datum, k)) ?? '';
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
      const extraData = overlay.extraData?.(getDataKeyParentObject(datum, k)) ?? '';
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

export const getBarLabelContent = (
  datum: Record<string, any>,
  bar: Record<string, any>,
  dataKey: string,
  extraData: ((datum: Record<string, any>) => string) | undefined,
) => {
  const { value } = bar;
  const separator = ' - ';
  const parentObj = getDataKeyParentObject(datum, dataKey);
  const extra = extraData
    ? extraData(parentObj)
    : '';

  return {
    value,
    separator,
    extra,
  };
};

export const getBarLabelMorphology = (
  bar: Record<string, any>,
  extraData: ((datum: Record<string, any>) => string) | undefined,
  content: BarStackContent,
  barChartLabelsMaxSize: number,
  thickness: number,
  position: { x: number | undefined; y: number | undefined },
  dimension: { xMax: number; yMax: number },
  isHorizontal: boolean,
) => {
  const { xMax, yMax } = dimension;
  const { x, y } = position;
  const { value, separator, extra } = content;

  const len = extraData
    ? (`${value}${separator}${extra}`).length
    : String(`${value}`).length;

  const labelHeight = barsStyleConfig.label.height;
  const labelWidth = Math.round(len * 1.2 * 8);

  const width = _.clamp(labelWidth, labelHeight, labelWidth);

  let xPosRect;
  let yPosRect;
  let xPosText;
  let yPosText;

  if (isHorizontal) {
    xPosText = Number(x) + Number(thickness) / 2;
    const yText = yMax - bar.height - 8;
    yPosText = _.clamp(yText, labelHeight, yMax);

    xPosRect = xPosText - (width / 2);
    yPosRect = yPosText - 13;
  } else {
    const padding = 16;
    xPosText = Number(xMax) + padding;
    yPosText = Number(y) + Number(thickness / 2) + 4;
  }

  return {
    text: {
      x: xPosText,
      y: yPosText,
    },
    rect: {
      x: xPosRect,
      y: yPosRect,
      width: isHorizontal ? width : barChartLabelsMaxSize,
    },
  };
};

export const getStackBarLabelContent = (
  datum: Record<string, any>,
  dataKey: string[],
  extraData: ((datum: Record<string, any>) => string) | undefined,
  index: number,
): BarStackContent => {
  const value = getPrimitiveFromObjectByPath(datum, dataKey[index]) ?? '';
  const separator = ' - ';
  const parentObj = getDataKeyParentObject(datum, dataKey[index]);
  const extra = extraData
    ? extraData(parentObj)
    : '';

  return { value, separator, extra };
};

export const getStackBarLabelMorphology = (
  bar: Record<string, any>,
  extraData: ((datum: Record<string, any>) => string) | undefined,
  content: BarStackContent,
  thickness: number,
  position: { x: number | undefined; y: number | undefined },
  dimension: { xMax: number; yMax: number },
  isHorizontal: boolean,
) => {
  let xPosRect;
  let yPosRect;
  let xPosText;
  let yPosText;

  const { value, separator, extra } = content;
  const { x, y } = position;
  const { xMax, yMax } = dimension;

  const len = extraData
    ? (`${value}${separator}${extra}`).length
    : String(`${value}`).length;

  const labelHeight = barsStyleConfig.label.height;
  const labelWidth = Math.round(len * 1.2 * 8);

  const width = _.clamp(labelWidth, labelHeight, labelWidth);

  if (isHorizontal) {
    xPosRect = (Number(x) + (Number(thickness) - width) / 2);
    const yRect = Number(bar.y) + (Number(bar.height) - labelHeight) / 2;
    yPosRect = _.clamp(yRect, labelHeight, yMax - labelHeight);

    xPosText = Number(x) + Number(thickness) / 2;
    yPosText = yPosRect + 13;
  } else {
    const xRect = Number(bar.x) + (Number(bar.width) - width) / 2;
    xPosRect = _.clamp(xRect, 0, xMax - labelWidth);
    yPosRect = Number(y) + (thickness - labelHeight) / 2;

    xPosText = xPosRect + width / 2;
    yPosText = yPosRect + 13;
  }

  return {
    rect: {
      x: xPosRect,
      y: yPosRect,
      width,
    },
    text: {
      x: xPosText,
      y: yPosText,
    },
  };
};
