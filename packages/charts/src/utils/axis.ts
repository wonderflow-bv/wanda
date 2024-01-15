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

import {
  scaleBand, scaleLinear, scaleUtc,
} from '@visx/scale';
import { NumberValue, ScaleTime } from '@visx/vendor/d3-scale';
import _ from 'lodash';
import { Except } from 'type-fest';

import {
  axisStyleConfig,
} from '../style-config';
import {
  AxisProps, CartesianChartLayout, CartesianStyleConfig,
  ScaleType, ViewportStyleConfig,
} from '../types';
import {
  AxisConfig,
  AxisElements,
  AxisOffsetConfig,
  AxisOffsetProps,
  AxisOrientation,
  AxisSystemElements,
  CartesianAxis,
  CartesianxAxisSystem,
  HorizontalAxisOffsetConfig,
  VerticalAxisoffsetConfig,
} from '../types/axis';
import { truncate } from './format';
import {
  getMaxCharactersNum,
  getMinMaxDate,
  getMinMaxNumber,
  isArrayTypeDate,
  isArrayTypeNumber,
  isArrayTypeString,
  removeNilsFromDomain,
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

export const computeAxisOffset = (
  axis: AxisOffsetProps,
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

  let res: AxisElements = {
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

export const computeAxisSystemOffset = (
  axis: Record<AxisOrientation, AxisOffsetProps | undefined>,
  config = axisStyleConfig,
) => {
  const {
    top, right, bottom, left,
  } = axis;

  const t = top && computeAxisOffset(top, config);
  const r = right && computeAxisOffset(right, config);
  const b = bottom && computeAxisOffset(bottom, config);
  const l = left && computeAxisOffset(left, config);

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

  const a: AxisSystemElements = {
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

export const computeAxisStyleConfig = (
  axis: Record<AxisOrientation, AxisProps | undefined>,
  config = axisStyleConfig,
) => {
  const { offset, axis: ao } = computeAxisSystemOffset(axis, config);
  const {
    top: t, right: r, bottom: b, left: l,
  } = ao;

  const top: HorizontalAxisOffsetConfig = {
    ...config.top,
    labelOffset: t ? t.labelOffset : 0,
  };

  const right: VerticalAxisoffsetConfig = {
    ...config.right,
    labelOffset: r ? r.labelOffset : 0,
  };

  const bottom: HorizontalAxisOffsetConfig = {
    ...config.bottom,
    labelOffset: b ? b.labelOffset : 0,
  };

  const left: VerticalAxisoffsetConfig = {
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
  domain: Array<string | number | undefined>,
  scaleType?: ScaleType,
): ScaleType => {
  const d = removeNilsFromDomain(domain);

  if (scaleType) return scaleType;

  if (isArrayTypeNumber(d)) return 'linear';

  if (isArrayTypeString(d)) {
    const toDate = d.map(el => new Date(el));
    if (isArrayTypeDate(toDate)) return 'time';
  }

  return 'label';
};

export const scaleDomainToAxis = (axis: Except<AxisProps, 'orientation'>) => {
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

export const handleTickFormat = (axis: CartesianAxis) => {
  const {
    tickFormat, hideTickLabel, scaleType, scale,
  } = axis;

  if (hideTickLabel) {
    return () => ('');
  }

  const isLabel = scaleType === 'label';
  const isTime = scaleType === 'time';

  const doTruncate = (value: string | Date | NumberValue | undefined) => (isLabel ? truncate(value as string) : value);

  return (v: string | Date | NumberValue, i: number) => {
    if (tickFormat) {
      return doTruncate(tickFormat(v, i, [{ value: v, index: i }]));
    }

    if (isLabel) return doTruncate(v);

    if (isTime && typeof v !== 'string') {
      const s = scale as ScaleTime<number, number>;
      const f = s.tickFormat();
      return (f(v as Date));
    }

    return v;
  };
};

export const handleNumberOfTicks = (
  width: number,
  height: number,
  axis: CartesianAxis,
  config: ViewportStyleConfig,
) => manageViewport(width, height, axis, config).numTicks;

export const hasVerticalTickLabel = (
  width: number,
  axis: AxisProps,
  config: ViewportStyleConfig,
) => {
  const {
    domain, scaleType, numTicks, orientation,
  } = axis;

  const isLabel = scaleType === 'label';

  const isHorizontal = orientation === 'bottom' || orientation === 'top';

  const isSmall = _.inRange(width, 0, config.small.maxWidth);
  const isMedium = _.inRange(width, config.small.maxWidth, config.medium.maxWidth);

  if (isHorizontal) {
    if (isLabel) {
      const len = domain.join().length * 8;
      return width / len < 2;
    }

    if (isSmall) return false;
    if (isMedium) return true;
    if (numTicks && numTicks > 10) return true;
    if (!isSmall && !isMedium) return false;
  }

  return false;
};

export const handleVerticalTickLabelTransform = (
  t: any,
  isVertical: boolean,
  axis: CartesianAxis,
) => {
  const { orientation, scale } = axis;

  let res = {};

  if (orientation === 'bottom') {
    if (isVertical) {
      res = {
        transform: `translate(13, 6) rotate(90, ${scale(t) ?? 0}, 0)`,
      };
    } else {
      res = { transform: '', textAnchor: 'middle' };
    }
  }

  if (orientation === 'top') {
    if (isVertical) {
      res = {
        transform: `translate(9, -4) rotate(-90, ${scale(t) ?? 0}, 0)`,
      };
    } else {
      res = { transform: '', textAnchor: 'middle' };
    }
  }

  return res;
};

export const handleVerticalTickLabelOffset = (
  width: number,
  config: CartesianStyleConfig,
  axis?: AxisProps,
) => {
  let res = 0;

  if (!axis) return res;

  const { viewport, axis: aConfig } = config;
  const {
    domain, tickFormat, scaleType,
  } = axis;
  const { maxCharactersLength: l, omission: o } = aConfig.formatting;
  const { labelCharExtimatedWidth: w } = aConfig.spacing;

  if (hasVerticalTickLabel(width, axis, viewport)) {
    const num = getMaxCharactersNum(domain, tickFormat);
    if (scaleType === 'label') res = _.clamp(num, 0, l - o.length);
    else if (scaleType === 'linear') res = num;
    else res = _.clamp(num, 0, 8);
  }

  return res * w;
};

export const computeAxisProperties = ({
  axis,
  maxRangeX,
  maxRangeY,
  positionTop,
  positionRight,
  positionBottom,
  positionLeft,
}: {
  axis?: AxisProps;
  maxRangeX: number;
  maxRangeY: number;
  positionTop: number;
  positionRight: number;
  positionBottom: number;
  positionLeft: number;
}): CartesianAxis | undefined => {
  if (axis) {
    const { orientation } = axis;

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

export const computeAxisSystemProperties = (
  axis: Record<AxisOrientation, AxisProps | undefined>,
  dimension: {
    maxWidth: number;
    maxHeight: number;
  },
  position: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  },
) => {
  const shared = {
    maxRangeX: dimension.maxWidth,
    maxRangeY: dimension.maxHeight,
    positionTop: position.top,
    positionRight: position.right,
    positionBottom: position.bottom,
    positionLeft: position.left,
  };

  const t = computeAxisProperties({
    axis: axis.top,
    ...shared,
  });
  const r = computeAxisProperties({
    axis: axis.right,
    ...shared,
  });
  const b = computeAxisProperties({
    axis: axis.bottom,
    ...shared,
  });
  const l = computeAxisProperties({
    axis: axis.left,
    ...shared,
  });

  const a: CartesianxAxisSystem = {
    top: t,
    right: r,
    bottom: b,
    left: l,
  };

  return a;
};

export const handleChartAxisLayout = (
  index: Except<AxisProps, 'orientation'>,
  series: Except<AxisProps, 'orientation'>,
  overlay?: Except<AxisProps, 'orientation'>,
): Record<CartesianChartLayout, Record<AxisOrientation, AxisProps | undefined>> => ({
  vertical: {
    left: { ...index, orientation: 'left' },
    bottom: { ...series, orientation: 'bottom' },
    top: overlay ? { ...overlay, orientation: 'top' } : undefined,
    right: undefined,
  },
  horizontal: {
    bottom: { ...index, orientation: 'bottom' },
    left: { ...series, orientation: 'left' },
    right: overlay ? { ...overlay, orientation: 'right' } : undefined,
    top: undefined,
  },
});

