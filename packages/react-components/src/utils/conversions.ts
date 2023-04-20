export const cssRelativeUnitsToPixel = (size: string): number => {
  if ((/[0-9]+(em|rem)/g).test(size)) {
    const re = /\d+/g;
    const m = size.match(re);
    const v = m ?? +m![0];
    return v as number * 16;
  }

  return -1;
};
