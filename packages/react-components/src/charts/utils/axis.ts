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

/* eslint-disable @typescript-eslint/naming-convention */

import {
  scaleBand, scaleLinear, scaleUtc,
} from '@visx/scale';
import { NumberValue } from '@visx/vendor/d3-scale';
import _ from 'lodash';

import { AxisProps } from '../components/cartesian-base/cartesian-base';
import {
  axisStyleConfig,
} from '../style-config';
import { CartesianStyleConfig, ScaleType, ViewportStyleConfig } from '../types';
import {
  AllAxisElementsValues,
  AllAxisInput,
  AllAxisProperties,
  AxisConfig,
  AxisOffsetConfig,
  AxisOrientation,
  AxisType,
  HorizontalAxisConfig,
  SingleAxisElementsValues,
  SingleAxisOffsetInput,
  VerticalAxisConfig,
} from '../types/axis';
import { truncate } from './format';
import {
  getMaxCharactersNum, getMinMaxDate, getMinMaxNumber, isArrayTypeDate, isArrayTypeNumber, isArrayTypeString,
} from './math';
import { manageViewport } from './viewport';

export const getAxisOffset = ({
  orientation,
  tick,
  tickOffset,
  tickLabelHeight,
  maxLength,
  axisLabel,
  axisLine,
}: {
  orientation: AxisOrientation;
  tick: number;
  tickOffset: number;
  tickLabelHeight: number;
  maxLength: number;
  axisLabel: number;
  axisLine: number;
}) => {
  const v = tick + Math.abs(tickOffset) + maxLength + axisLabel + axisLine;
  const h = tick + tickLabelHeight + axisLabel + axisLine;

  const offset = {
    top: h,
    right: v,
    bottom: h,
    left: v,
  };

  return offset[orientation];
};

export const getTickLabelSize = ({
  isVertical,
  hideTickLabel,
  maxLength,
  tickOffset,
  tickLabelHeight,
}: {
  isVertical: boolean;
  hideTickLabel: boolean | undefined;
  maxLength: number;
  tickOffset: number;
  tickLabelHeight: number;
}) => {
  if (hideTickLabel) {
    return isVertical
      ? maxLength + Math.abs(tickOffset)
      : tickLabelHeight + Math.abs(tickOffset);
  }

  return 0;
};

export const getLabelOffset = ({
  orientation,
  labelOffset,
  tickOffset,
  tickLabelSize,
  maxLength,
}: {
  orientation: AxisOrientation;
  labelOffset: number;
  tickOffset: number;
  tickLabelSize: number;
  maxLength: number;
}) => {
  const off = {
    top: labelOffset + (-tickOffset) - tickLabelSize,
    right: labelOffset + maxLength + tickOffset - tickLabelSize,
    bottom: labelOffset + tickOffset - tickLabelSize,
    left: labelOffset + maxLength + (-tickOffset) - tickLabelSize,
  };

  return off[orientation];
};

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
    const tlh = hideTickLabel ? 0 : tickLabelHeight + Math.abs(tickOffset);
    const axisLabel = label ? (labelHeight + labelOffset) : 0;
    const maxLength = hideTickLabel ? 0 : char * (tickLabelMaxChar + extraChar);
    const axisLine = hideAxisLine ? 0 : config.axisLineProps.strokeWidth;

    const offset = getAxisOffset({
      orientation,
      axisLabel,
      axisLine,
      maxLength,
      tick,
      tickOffset,
      tickLabelHeight: tlh,
    });

    const tickLabelSize = getTickLabelSize({
      isVertical,
      hideTickLabel,
      maxLength,
      tickLabelHeight,
      tickOffset,
    });

    const lo = getLabelOffset({
      orientation,
      labelOffset,
      maxLength,
      tickLabelSize,
      tickOffset,
    });

    res = {
      orientation,
      offset,
      tickLabelMaxChar,
      tickLabelMaxLength: maxLength,
      tickLength,
      tickLabelOffset: tickOffset,
      tickLabelHeight: tlh,
      tickLabelSize,
      axisLabel,
      labelOffset: lo,
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

export const inferScaleTypeFromDomain = (
  domain: Array<string | number>,
  scaleType?: ScaleType,
): ScaleType => {
  if (scaleType) return scaleType;
  if (isArrayTypeNumber(domain)) return 'linear';
  if (isArrayTypeString(domain)) {
    const toDate = domain.map(el => new Date(el));
    if (isArrayTypeDate(toDate)) return 'time';
  }

  return 'label';
};

export const scaleDomainToAxis = (axis: Pick<AxisProps, 'domain' | 'range' | 'scaleType' | 'clamp' | 'nice' | 'round' | 'paddingInner' | 'paddingOuter' >) => {
  const {
    domain,
    range,
    scaleType,
    clamp,
    nice,
    round = true,
    paddingInner,
    paddingOuter,
  } = axis;

  const hasData = domain.length && range?.length && scaleType;

  if (hasData) {
    if (scaleType === 'label') {
      return scaleBand({
        domain: domain.map(v => `${v}`),
        range,
        paddingInner: paddingInner ?? 1,
        paddingOuter: paddingOuter ?? 1,
      });
    }

    if (scaleType === 'linear') {
      return scaleLinear({
        domain: getMinMaxNumber(domain.map(v => Number(v))),
        range,
        round,
        nice,
        clamp,
      });
    }

    if (scaleType === 'time') {
      const d = domain.map(v => new Date(v));
      const isDates = isArrayTypeDate(d);

      return scaleUtc({
        domain: isDates ? getMinMaxDate(d) : [],
        range,
        round,
        nice,
        clamp,
      });
    }
  }

  return undefined;
};

export const handleTickFormat = (axis: AxisType) => {
  const {
    tickFormat, hideTickLabel, scaleType,
  } = axis;

  const isLabel = scaleType === 'label';

  const doTruncate = (value: string | Date | NumberValue | undefined) => (isLabel ? truncate(value as string) : value);

  if (hideTickLabel) {
    return () => ('');
  }

  if (tickFormat) {
    return (v: string | Date | NumberValue, i: number) => doTruncate(
      (tickFormat(v, i, [{ value: v, index: i }])),
    );
  }

  if (!tickFormat && isLabel) return (v: string | Date | NumberValue) => doTruncate(v);

  return undefined;
};

export const handleTickNumber = (
  width: number,
  height: number,
  axis: AxisType,
  config: ViewportStyleConfig,
) => manageViewport(width, height, axis, config).numTicks;

export const hasVerticalTickLabel = (
  width: number,
  orientation: AxisOrientation,
  axis: AxisProps,
  config: ViewportStyleConfig,
) => {
  const {
    domain, scaleType, numTicks,
  } = axis;

  const isLabel = scaleType === 'label';

  const isHorizontal = orientation === 'bottom' || orientation === 'top';

  const isTiny = _.inRange(width, 0, config.tiny.maxWidth);
  const isSmall = _.inRange(width, config.tiny.maxWidth!, config.small.maxWidth);

  if (isHorizontal) {
    if (isLabel) {
      const len = domain.join().length * 8;
      return len / width > 2;
    }

    if (isTiny) return false;
    if (isSmall) return true;
    if (!isTiny && !isSmall) return false;
    if (numTicks && numTicks > 10) return true;
  }

  return false;
};

export const handleVerticalTickLabelTransform = (t: any, isVertical: boolean, axis: AxisType) => {
  const { orientation, scale } = axis;

  let res = {};

  if (orientation === 'bottom') {
    if (isVertical) {
      res = {
        transform: `translate(13, 6) rotate(90, ${scale(t) as any}, 0)`,
      };
    } else {
      res = { transform: '', textAnchor: 'middle' };
    }
  }

  if (orientation === 'top') {
    if (isVertical) {
      res = {
        transform: `translate(9, -4) rotate(-90, ${scale(t) as any}, 0)`,
      };
    } else {
      res = { transform: '', textAnchor: 'middle' };
    }
  }

  return res;
};

export const handleVerticalTickLabelOffset = (
  width: number,
  orientation: AxisOrientation,
  axis: AxisProps,
  config: CartesianStyleConfig,
) => {
  const { viewport, axis: aConfig } = config;
  const {
    domain, tickFormat, scaleType,
  } = axis;
  const { maxCharactersLength: l, omission: o } = aConfig.formatting;
  const { labelCharExtimatedWidth: w } = aConfig.spacing;

  let res = 0;

  if (hasVerticalTickLabel(width, orientation, axis, viewport)) {
    const num = getMaxCharactersNum(domain, tickFormat);
    if (scaleType === 'label') res = _.clamp(num, 0, l - o.length);
    else if (scaleType === 'linear') res = num;
    else res = _.clamp(num, 0, 8);
  }

  return res * w;
};

export const computeAxisProperties = ({
  axis,
  orientation,
  maxRangeX,
  maxRangeY,
  positionTop,
  positionRight,
  positionBottom,
  positionLeft,
}: {
  axis?: AxisProps;
  orientation: AxisOrientation;
  maxRangeX: number;
  maxRangeY: number;
  positionTop: number;
  positionRight: number;
  positionBottom: number;
  positionLeft: number;
}): AxisType | undefined => {
  if (axis) {
    if (orientation === 'top') {
      return {
        ...axis,
        orientation,
        scale: scaleDomainToAxis({ ...axis, range: [0, maxRangeX] })!,
        top: positionTop,
        left: positionLeft,
      };
    }

    if (orientation === 'right') {
      return {
        ...axis,
        orientation,
        scale: scaleDomainToAxis({ ...axis, range: [maxRangeY, 0] })!,
        top: positionTop,
        left: positionRight,
      };
    }

    if (orientation === 'bottom') {
      return {
        ...axis,
        orientation,
        scale: scaleDomainToAxis({ ...axis, range: [0, maxRangeX] })!,
        top: positionBottom,
        left: positionLeft,
      };
    }

    if (orientation === 'left') {
      return {
        ...axis,
        orientation,
        scale: scaleDomainToAxis({ ...axis, range: [maxRangeY, 0] })!,
        top: positionTop,
        left: positionLeft,
      };
    }
  }

  return undefined;
};

export const computeAllAxisProperties = ({
  top,
  right,
  bottom,
  left,
  maxRangeX,
  maxRangeY,
  positionTop,
  positionRight,
  positionBottom,
  positionLeft,
}: {
  top?: AxisProps;
  right?: AxisProps;
  bottom?: AxisProps;
  left?: AxisProps;
  maxRangeX: number;
  maxRangeY: number;
  positionTop: number;
  positionRight: number;
  positionBottom: number;
  positionLeft: number;
}) => {
  const shared = {
    maxRangeX,
    maxRangeY,
    positionTop,
    positionRight,
    positionBottom,
    positionLeft,
  };
  const t = computeAxisProperties({
    axis: top,
    orientation: 'top',
    ...shared,
  });
  const r = computeAxisProperties({
    axis: right,
    orientation: 'right',
    ...shared,
  });
  const b = computeAxisProperties({
    axis: bottom,
    orientation: 'bottom',
    ...shared,
  });
  const l = computeAxisProperties({
    axis: left,
    orientation: 'left',
    ...shared,
  });

  const a: AllAxisProperties = {
    top: t,
    right: r,
    bottom: b,
    left: l,
  };

  return a;
};
