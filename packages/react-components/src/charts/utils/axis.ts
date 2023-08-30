/*
 * Copyright 2023 Wonderflow Design Team
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

import { scaleBand, scaleLinear, scaleUtc } from '@visx/scale';

import { AxisProps } from '../cartesian-base/cartesian-base';
import {
  axisStyleConfig,
} from '../style-config';
import {
  AllAxisOffsetInput, AxisConfig, HorizontalAxisConfig, SingleAxisOffsetInput, VerticalAxisConfig,
} from '../types/axis';
import {
  getMaxCharactersNum, getMinMaxNumber, isArrayTypeDate,
} from './math';

export const computeSingleAxisOffset = (
  axis: SingleAxisOffsetInput,
  config = axisStyleConfig.spacing,
) => {
  const {
    domain,
    orientation,
    label,
    tickFormat,
  } = axis;

  const hasValues = !!domain?.length;

  let diffLen = 0;
  if (tickFormat) {
    const formatObj = domain.map((e, i) => ({ value: e, index: i }));
    const domainFormatted = tickFormat ? domain.map((v, i) => tickFormat(v, i, formatObj)) : domain;
    const diff = domainFormatted.map((df, i) => (`${df as any}`).length - (`${domain[i]}`).length);
    const [highest] = diff.sort((a, b) => b - a);
    diffLen = highest;
  }

  if (hasValues) {
    const isVertical = orientation === 'left' || orientation === 'right';
    const tickLabelMaxChar = (isVertical) ? getMaxCharactersNum(domain) + diffLen : 0;

    const {
      labelCharExtimatedWidth: char,
      labelHeight: lh,
      labelOffset: lo,
      tickLabelHeight: tlh,
      tickOffset: to,
      tickLength: tl,
    } = config;

    const tick = tl + to;
    const axisLabel = label ? (lh / 2 + lo) : 0;
    const maxChar = char * tickLabelMaxChar;

    const v = tick + maxChar + axisLabel;
    const h = tick + tlh / 2 + axisLabel;

    const offset = {
      top: h - to,
      right: v - to,
      bottom: h + to,
      left: v - lo,
    };

    return offset[orientation];
  }

  return 0;
};

export const computeAllAxisOffset = (
  axis: {
    top?: AllAxisOffsetInput;
    right?: AllAxisOffsetInput;
    bottom?: AllAxisOffsetInput;
    left?: AllAxisOffsetInput;
  },
  config = axisStyleConfig.spacing,
) => {
  const {
    top, right, bottom, left,
  } = axis;

  const t = top ? computeSingleAxisOffset({ ...top, orientation: 'top' }, config) : 0;
  const r = right ? computeSingleAxisOffset({ ...right, orientation: 'right' }, config) : 0;
  const b = bottom ? computeSingleAxisOffset({ ...bottom, orientation: 'bottom' }, config) : 0;
  const l = left ? computeSingleAxisOffset({ ...left, orientation: 'left' }, config) : 0;

  return {
    leftAxisOffset: l,
    rightAxisOffset: r,
    topAxisOffset: t,
    bottomAxisOffset: b,
    verticalAxisOffset: l + r,
    horizontalAxisOffset: t + b,
  };
};

export const computeAxisConfig = (
  axis: {
    top?: AllAxisOffsetInput;
    right?: AllAxisOffsetInput;
    bottom?: AllAxisOffsetInput;
    left?: AllAxisOffsetInput;
  },
  config = axisStyleConfig,
) => {
  const {
    labelCharExtimatedWidth: lcw,
    labelOffset,
  } = config.spacing;

  const offset = computeAllAxisOffset(axis, config.spacing);

  const hasLabelLeft = Boolean(axis.left?.label);
  const maxCharLeft = axis.left ? getMaxCharactersNum(axis.left.domain) : 0;

  const hasLabelRight = Boolean(axis.right?.label);
  const maxCharRight = axis.right ? getMaxCharactersNum(axis.right.domain) : 0;

  const top: HorizontalAxisConfig = {
    ...config.top,
    labelOffset,
  };

  const right: VerticalAxisConfig = {
    ...config.right,
    labelOffset: hasLabelRight
      ? (labelOffset + lcw * maxCharRight)
      : 0,
  };

  const bottom: HorizontalAxisConfig = {
    ...config.bottom,
    labelOffset,
  };

  const left: VerticalAxisConfig = {
    ...config.left,
    labelOffset: hasLabelLeft
      ? (labelOffset + lcw * maxCharLeft)
      : 0,
  };

  const c: AxisConfig = {
    offset,
    style: config,
    top,
    right,
    bottom,
    left,
  };

  return c;
};

export const scaleDomainToAxis = (axis: Pick<AxisProps, 'domain' | 'range' | 'scaleType' | 'clamp' | 'nice' | 'round' | 'paddingInner' | 'paddingOuter' >) => {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    domain, range, scaleType, clamp, nice, round, paddingInner, paddingOuter,
  } = axis;

  const hasData = domain.length && range?.length && scaleType;

  if (hasData) {
    if (scaleType === 'label') {
      return scaleBand({
        domain: domain.map(v => `${v}`),
        range,
        paddingInner,
        paddingOuter,
      });
    }

    if (scaleType === 'linear') {
      return scaleLinear({
        domain: getMinMaxNumber(domain.map(v => Number(v))),
        range,
        round: round ?? true,
        nice,
        clamp,
      });
    }

    if (scaleType === 'time') {
      const d = domain.map(v => new Date(v));
      const isDates = isArrayTypeDate(d);

      return scaleUtc({
        domain: isDates ? d : [],
        range,
        round: round ?? true,
        nice,
        clamp,
      });
    }
  }

  return undefined;
};
