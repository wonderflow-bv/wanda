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
  tickLabelMaxCharLeft = 3,
  tickLabelMaxCharRight = 3,
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

