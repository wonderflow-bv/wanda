export type AxisSpacingConfigType = {
  labelCharHeight: number;
  labelHeight: number;
  labelOffset: number;
  tickLabelHeight: number;
  tickOffset: number;
  tickLength: number;
}

export const axisSpacingConfig: AxisSpacingConfigType = {
  labelCharHeight: 9,
  labelHeight: 14,
  labelOffset: 12,
  tickLabelHeight: 14,
  tickOffset: 4,
  tickLength: 4,
};

export const computeAxisOffset = (
  orientation: 'vertical' | 'horizontal',
  tickLabelMaxCharactersNum = 3,
  config = axisSpacingConfig,
) => {
  const {
    labelCharHeight: lch,
    labelHeight: lh,
    labelOffset: lo,
    tickLabelHeight: tlh,
    tickOffset: to,
    tickLength: tl,
  } = config;

  const f = lh + lo + to + tl;
  const v = lch * tickLabelMaxCharactersNum + f;
  const h = tlh + f;

  return orientation === 'vertical' ? v : h;
};

