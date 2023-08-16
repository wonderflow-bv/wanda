import { scaleBand, scaleLinear, scaleUtc } from '@visx/scale';

import { AxisProps } from '../cartesian-base/cartesian-base';
import {
  getMaxCharactersNum, isArrayTypeDate,
} from './math';

type TextAnchor = 'start' | 'middle' | 'end';

type AxisOrientationType = 'top' | 'left' | 'right' | 'bottom';

type AllAxisOffsetInput = Pick<AxisProps, 'domain' | 'label'>

type SingleAxisOffsetInput = AllAxisOffsetInput & { orientation: AxisOrientationType }

export type AxisOffsetConfigType = {
  leftAxisOffset: number;
  rightAxisOffset: number;
  topAxisOffset: number;
  bottomAxisOffset: number;
  verticalAxisOffset: number;
  horizontalAxisOffset: number;
}

export type HorizontalAxisConfigType = {
  tickLabelProps: {
    dy: number;
  };
  labelOffset: number;
}

export type VerticalAxisConfigType = {
  tickLabelProps: {
    dx: number;
    dy: number;
    textAnchor: TextAnchor;
  };
  labelOffset: number;
}

export type LabelProps = {
  fill: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
}

export type AxisConfigType = {
  offset: AxisOffsetConfigType;
  tickLength: number;
  labelProps: LabelProps & { textAnchor: TextAnchor };
  tickLabelProps: LabelProps;
  top: HorizontalAxisConfigType;
  right: VerticalAxisConfigType;
  bottom: HorizontalAxisConfigType;
  left: VerticalAxisConfigType;

}

export type AxisSpacingConfigType = {
  labelCharExtimatedWidth: number;
  labelHeight: number;
  labelOffset: number;
  tickLabelHeight: number;
  tickOffset: number;
  tickLength: number;
}

export const axisSpacingConfig: AxisSpacingConfigType = {
  labelCharExtimatedWidth: 9,
  labelHeight: 14, // based on a 12px font size
  labelOffset: 16,
  tickLabelHeight: 16.5, // based on a 14px font size
  tickOffset: 4,
  tickLength: 4,
};

export const computeSingleAxisOffset = (
  axis: SingleAxisOffsetInput,
  config = axisSpacingConfig,
) => {
  const { domain, orientation, label } = axis;
  const hasValues = !!domain?.length;
  if (hasValues) {
    const isVertical = orientation === 'left' || orientation === 'right';
    const tickLabelMaxChar = (isVertical) ? getMaxCharactersNum(domain) : 0;

    const {
      labelCharExtimatedWidth: char,
      labelHeight: lh,
      labelOffset: lo,
      tickLabelHeight: tlh,
      tickOffset: to,
      tickLength: tl,
    } = config;

    const tick = tl + to;
    const axisLabel = label ? (lo + lh) : 0;
    const maxChar = char * tickLabelMaxChar;

    const v = tick + maxChar + axisLabel;
    const h = tick + tlh + axisLabel;

    return isVertical ? v : h;
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
  config = axisSpacingConfig,
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
  config = axisSpacingConfig,
) => {
  const {
    labelCharExtimatedWidth: lcw,
    labelOffset,
    tickOffset,
    tickLength,
  } = config;

  const offset = computeAllAxisOffset(axis, config);

  const hasLabelLeft = Boolean(axis.left?.label);
  const maxCharLeft = axis.left ? getMaxCharactersNum(axis.left.domain) : 0;

  const hasLabelRight = Boolean(axis.right?.label);
  const maxCharRight = axis.right ? getMaxCharactersNum(axis.right.domain) : 0;

  const main: {
    offset: AxisOffsetConfigType;
    tickLength: number;
    labelProps: LabelProps & { textAnchor: TextAnchor };
    tickLabelProps: LabelProps;
  } = {
    offset,
    tickLength,
    labelProps: {
      fill: 'var(--global-foreground)',
      fontFamily: 'system-ui, sans-serif',
      fontSize: 12,
      fontWeight: 400,
      textAnchor: 'middle',
    },
    tickLabelProps: {
      fill: 'var(--global-foreground)',
      fontFamily: 'system-ui, sans-serif',
      fontSize: 14,
      fontWeight: 400,
    },
  };

  const top: HorizontalAxisConfigType = {
    tickLabelProps: {
      dy: -tickOffset,
    },
    labelOffset,
  };

  const right: VerticalAxisConfigType = {
    tickLabelProps: {
      dx: tickOffset,
      dy: tickOffset,
      textAnchor: 'start',
    },
    labelOffset: hasLabelRight ? (labelOffset + lcw * maxCharRight) : 0,
  };

  const bottom: HorizontalAxisConfigType = {
    tickLabelProps: {
      dy: tickOffset,
    },
    labelOffset,
  };

  const left: VerticalAxisConfigType = {
    tickLabelProps: {
      dx: -tickOffset,
      dy: tickOffset,
      textAnchor: 'end',
    },
    labelOffset: hasLabelLeft ? (labelOffset + lcw * maxCharLeft) : 0,
  };

  const c: AxisConfigType = {
    ...main, top, right, bottom, left,
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
        domain: domain.map(v => v.toString()),
        range,
        paddingInner,
        paddingOuter,
      });
    }

    if (scaleType === 'linear') {
      return scaleLinear({
        domain: domain.map(v => Number(v)),
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

  return scaleBand({
    domain: domain.map(v => v.toString()),
    range,
    paddingInner,
    paddingOuter,
  });
};
