/* eslint-disable @typescript-eslint/naming-convention */
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
  AllAxisElementsValues,
  AllAxisInput,
  AxisConfig,
  AxisOffsetConfig,
  HorizontalAxisConfig,
  SingleAxisElementsValues,
  SingleAxisOffsetInput,
  VerticalAxisConfig,
} from '../types/axis';
import {
  getMaxCharactersNum, getMinMaxNumber, isArrayTypeDate,
} from './math';

export const computeSingleAxisOffset = (
  axis: SingleAxisOffsetInput,
  config = axisStyleConfig,
) => {
  const {
    domain,
    orientation,
    label,
    hideAxisLine,
    hideTickLabel,
    hideTicks,
    tickFormat,
  } = axis;

  const hasValues = !!domain?.length;

  let res: SingleAxisElementsValues = {
    orientation: 'left',
    offset: 0,
    tickLabelMaxChar: 0,
    tickLabelMaxLength: 0,
    tickLength: 0,
    tickLabelOffset: 0,
    tickLabelHeight: 0,
    tickLabelSize: 0,
    labelOffset: 0,
    axisLabel: 0,
    axisLine: 0,
  };

  if (hasValues) {
    const isVertical = orientation === 'left' || orientation === 'right';

    const tickLabelMaxChar = (isVertical) ? getMaxCharactersNum(domain, tickFormat) : 0;

    const {
      labelCharExtimatedWidth: char,
      labelHeight,
      labelOffset,
      tickLabelHeight,
      tickLength,
    } = config.spacing;

    const tickOffset = isVertical
      ? config[orientation].tickLabelProps.dx
      : config[orientation].tickLabelProps.dy;

    const extraChar = orientation === 'right' ? 1 : 0;

    const tick = hideTicks ? 0 : tickLength;
    const to = Math.abs(tickOffset);
    const tlh = hideTickLabel ? 0 : tickLabelHeight + to;

    const lo = label ? labelOffset : 0;
    const axisLabel = label ? (labelHeight + lo) : 0;

    const maxLength = hideTickLabel ? 0 : char * (tickLabelMaxChar + extraChar);

    const axisLine = hideAxisLine ? 0 : config.axisLineProps.strokeWidth;

    const v = tick + to + maxLength + axisLabel + axisLine;
    const h = tick + tlh + axisLabel + axisLine;

    const offset = {
      top: h,
      right: v,
      bottom: h,
      left: v,
    };

    const tls = isVertical
      ? maxLength + to
      : tickLabelHeight + to;

    const tickLabelSize = hideTickLabel ? tls : 0;

    const loff = {
      top: labelOffset + (-tickOffset) - tickLabelSize,
      right: labelOffset + maxLength + tickOffset - tickLabelSize,
      bottom: labelOffset + tickOffset - tickLabelSize,
      left: labelOffset + maxLength + (-tickOffset) - tickLabelSize,
    };

    res = {
      orientation,
      offset: offset[orientation],
      tickLabelMaxChar,
      tickLabelMaxLength: maxLength,
      tickLength,
      tickLabelOffset: tickOffset,
      tickLabelHeight: tlh,
      tickLabelSize,
      axisLabel,
      labelOffset: loff[orientation],
      axisLine,
    };
  }

  return res;
};

export const computeAllAxisOffset = (
  axis: AllAxisInput,
  config = axisStyleConfig,
) => {
  const {
    top, right, bottom, left,
  } = axis;

  const t = top && computeSingleAxisOffset({ ...top, orientation: 'top' }, config);
  const r = right && computeSingleAxisOffset({ ...right, orientation: 'right' }, config);
  const b = bottom && computeSingleAxisOffset({ ...bottom, orientation: 'bottom' }, config);
  const l = left && computeSingleAxisOffset({ ...left, orientation: 'left' }, config);

  const to = t ? t.offset : 0;
  const ro = r ? r.offset : 0;
  const bo = b ? b.offset : 0;
  const lo = l ? l.offset : 0;

  const offset: AxisOffsetConfig = {
    leftAxisOffset: lo,
    rightAxisOffset: ro,
    topAxisOffset: to,
    bottomAxisOffset: bo,
    verticalAxisOffset: lo + ro,
    horizontalAxisOffset: to + bo,
  };

  const a: AllAxisElementsValues = {
    top: t,
    right: r,
    bottom: b,
    left: l,
  };

  return ({
    offset,
    axis: a,
  });
};

export const computeAxisConfig = (
  axis: {
    top?: AxisProps;
    right?: AxisProps;
    bottom?: AxisProps;
    left?: AxisProps;
  },
  config = axisStyleConfig,
) => {
  const { offset, axis: ao } = computeAllAxisOffset(axis, config);
  const {
    top: t, right: r, bottom: b, left: l,
  } = ao;

  const top: HorizontalAxisConfig = {
    ...config.top,
    labelOffset: t ? t.labelOffset : 0,
  };

  const right: VerticalAxisConfig = {
    ...config.right,
    labelOffset: r ? r.labelOffset : 0,
  };

  const bottom: HorizontalAxisConfig = {
    ...config.bottom,
    labelOffset: b ? b.labelOffset : 0,
  };

  const left: VerticalAxisConfig = {
    ...config.left,
    labelOffset: l ? l.labelOffset : 0,
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
    domain,
    range,
    scaleType,
    clamp,
    nice,
    round,
    paddingInner,
    paddingOuter,
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
