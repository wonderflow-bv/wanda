import { getMaxCharactersNum } from './math';

type TextAnchor = 'start' | 'middle' | 'end'

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
  labelCharacterExtimatedWidth: number;
  labelHeight: number;
  labelOffset: number;
  tickLabelHeight: number;
  tickOffset: number;
  tickLength: number;
}

export const axisSpacingConfig: AxisSpacingConfigType = {
  labelCharacterExtimatedWidth: 9,
  labelHeight: 14, // based on a 12px font size
  labelOffset: 16,
  tickLabelHeight: 16.5, // based on a 14px font size
  tickOffset: 4,
  tickLength: 4,
};

export const computeAxisOffset = (
  tickLabelMaxCharLeft = 0,
  tickLabelMaxCharRight = 0,
  config = axisSpacingConfig,
) => {
  const {
    labelCharacterExtimatedWidth: lcw,
    labelHeight: lh,
    labelOffset: lo,
    tickLabelHeight: tlh,
    tickOffset: to,
    tickLength: tl,
  } = config;

  const f = lh + lo + to + tl;
  const vl = lcw * tickLabelMaxCharLeft + f;
  const vr = lcw * tickLabelMaxCharRight + f;
  const h = tlh + f;

  return {
    leftAxisOffset: vl,
    rightAxisOffset: vr,
    topAxisOffset: h,
    bottomAxisOffset: h,
    verticalAxisOffset: vl + vr,
    horizontalAxisOffset: h + h,
  };
};

export const computeAxisConfig = (
  domainRight?: Array<number | string >,
  domainLeft?: Array<number | string>,
  config = axisSpacingConfig,
) => {
  const {
    labelCharacterExtimatedWidth: lcw,
    labelOffset,
    tickOffset,
    tickLength,
  } = config;

  const tickLabelMaxCharLeft = domainLeft && getMaxCharactersNum(domainLeft);
  const tickLabelMaxCharRight = domainRight && getMaxCharactersNum(domainRight);
  const offset = computeAxisOffset(tickLabelMaxCharLeft, tickLabelMaxCharRight, config);

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
    labelOffset: labelOffset + lcw * (tickLabelMaxCharRight ?? 0), // this is influenced by the num of tick label chars
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
    labelOffset: labelOffset + lcw * (tickLabelMaxCharLeft ?? 0), // this is influenced by the num of tick label chars
  };

  const c: AxisConfigType = {
    ...main, top, right, bottom, left,
  };
  return c;
};
