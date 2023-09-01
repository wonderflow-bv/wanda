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
  AllAxisOffsetInput,
  AxisConfig,
  AxisHideElementsConfig,
  HorizontalAxisConfig,
  SingleAxisOffsetInput,
  VerticalAxisConfig,
} from '../types/axis';
import {
  getMaxCharactersNum, getMinMaxNumber, isArrayTypeDate,
} from './math';

export const hideConfig: AxisHideElementsConfig = {
  tick: false,
  tickLabel: false,
  axisLabel: false,
  axisLine: false,
};

export const computeSingleAxisOffset = (
  axis: SingleAxisOffsetInput,
  config = axisStyleConfig,
  hide = hideConfig,
) => {
  const {
    domain,
    orientation,
    label,
    tickFormat,
  } = axis;

  const hasValues = !!domain?.length;

  if (hasValues) {
    const isVertical = orientation === 'left' || orientation === 'right';
    const tickLabelMaxChar = (isVertical) ? getMaxCharactersNum(domain, tickFormat) : 0;

    const {
      labelCharExtimatedWidth: char,
      labelHeight: lh,
      labelOffset: lo,
      tickLabelHeight,
      tickLength: tl,
    } = config.spacing;

    const tickOffset = isVertical ? config[orientation].tickLabelProps.dx : config[orientation].tickLabelProps.dy;
    const extraChar = orientation === 'right' ? 1 : 0;

    const tick = hide.tick ? 0 : tl + Math.abs(tickOffset);
    const axisLabel = (label && !hide.axisLabel) ? (lh / 2 + lo) : 0;
    const maxChar = hide.tickLabel ? 0 : char * (tickLabelMaxChar + extraChar);
    const tlh = hide.tickLabel ? 0 : tickLabelHeight / 2;
    const axisLine = hide.axisLine ? 0 : config.axisLineProps.strokeWidth;

    const v = tick + maxChar + axisLabel + axisLine;
    const h = tick + tlh + axisLabel + axisLine;

    const offset = {
      top: h - tickOffset,
      right: v - tickOffset,
      bottom: h + tickOffset,
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
  config = axisStyleConfig,
  hide = {
    top: hideConfig,
    right: hideConfig,
    bottom: hideConfig,
    left: hideConfig,
  },
) => {
  const {
    top, right, bottom, left,
  } = axis;

  const t = top ? computeSingleAxisOffset({ ...top, orientation: 'top' }, config, hide.top) : 0;
  const r = right ? computeSingleAxisOffset({ ...right, orientation: 'right' }, config, hide.right) : 0;
  const b = bottom ? computeSingleAxisOffset({ ...bottom, orientation: 'bottom' }, config, hide.bottom) : 0;
  const l = left ? computeSingleAxisOffset({ ...left, orientation: 'left' }, config, hide.left) : 0;

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
  hide = {
    top: hideConfig,
    right: hideConfig,
    bottom: hideConfig,
    left: hideConfig,
  },
) => {
  const {
    labelCharExtimatedWidth: lcw,
    labelOffset,
  } = config.spacing;

  const offset = computeAllAxisOffset(axis, config, hide);

  const hasLabelLeft = Boolean(axis.left?.label);
  const maxCharLeft = axis.left ? getMaxCharactersNum(axis.left.domain, axis.left.tickFormat) : 0;

  const hasLabelRight = Boolean(axis.right?.label);
  const extraChar = 1;
  const maxCharRight = axis.right ? getMaxCharactersNum(axis.right.domain, axis.right.tickFormat) + extraChar : 0;

  const top: HorizontalAxisConfig = {
    ...config.top,
    labelOffset: labelOffset - config.top.tickLabelProps.dy,
  };

  const right: VerticalAxisConfig = {
    ...config.right,
    labelOffset: hasLabelRight
      ? (labelOffset + lcw * maxCharRight + config.right.tickLabelProps.dx)
      : 0,
  };

  const bottom: HorizontalAxisConfig = {
    ...config.bottom,
    labelOffset: labelOffset + config.bottom.tickLabelProps.dy,
  };

  const left: VerticalAxisConfig = {
    ...config.left,
    labelOffset: hasLabelLeft
      ? (labelOffset + lcw * maxCharLeft + config.left.tickLabelProps.dx)
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
