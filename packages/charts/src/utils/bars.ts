import _ from 'lodash';

import { CartesianAxis } from '../types/axis';
import { Bar } from '../types/bars';

export const getBarSize = (bar: Bar, axis: CartesianAxis, isHorizontal: boolean) => {
  const min = _.min(axis.domain);
  const scaleZero = axis.scale(0 as any) ?? 0;
  const scaleMin = axis.scale(min as any) ?? 0;
  const diffNegative = scaleMin - scaleZero;

  if (isHorizontal) {
    return (bar.value >= 0)
      ? (bar.height - diffNegative)
      : (diffNegative - bar.height);
  }

  return (bar.value >= 0)
    ? (bar.width + diffNegative)
    : Math.abs(bar.width + diffNegative);
};

export const getBarPosition = (bar: Bar, axis: CartesianAxis, isHorizontal: boolean) => {
  const scaleZero = axis.scale(0 as any) ?? 0;

  if (isHorizontal) {
    return (bar.value >= 0)
      ? bar.y
      : scaleZero;
  }

  return (bar.value >= 0)
    ? scaleZero
    : bar.width;
};

export const getBarSizeAndPosition = (bar: Bar, axis: CartesianAxis, isHorizontal: boolean) => {
  const size = getBarSize(bar, axis, isHorizontal);
  const position = getBarPosition(bar, axis, isHorizontal);
  return {
    x: isHorizontal ? undefined : position,
    y: isHorizontal ? position : undefined,
    width: isHorizontal ? undefined : size,
    height: isHorizontal ? size : undefined,
  };
};
