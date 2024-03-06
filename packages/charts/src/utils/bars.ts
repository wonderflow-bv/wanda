import _ from 'lodash';

import { CartesianAxis } from '../types/axis';
import { BarChartMetadata } from '../types/bar-chart';
import { Bar, BarsStyleConfig } from '../types/bars';
import { Data } from '../types/main';

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

export const getBarThickness = (
  thickness: number,
  maxSize: number,
  fixedBarSize: boolean,
) => {
  if (fixedBarSize) {
    return _.clamp(thickness, 2, maxSize);
  }

  return thickness;
};

export const getHeightForVerticalChartWithFixedBarSize = (
  config: BarsStyleConfig,
  data: Data,
  metadata: BarChartMetadata,
) => {
  const { series, overlay } = metadata;

  const indexLen = data.length;

  const seriesBarsNum = series.dataKey.length;
  const overlayBarsNum = overlay.dataKey?.length ?? 0;
  const totalBarsNum = seriesBarsNum + overlayBarsNum;

  const {
    maxSize, paddingInnerGroup, paddingOuterGroup, paddingInner, paddingOuter,
  } = config;

  const barGroup = totalBarsNum * maxSize * (1 + paddingInnerGroup) * (1 + paddingOuterGroup);
  const allGroups = (indexLen + 2) * barGroup * (1 + paddingInner) + barGroup * (2 + paddingOuter);

  const h = _.round(allGroups);

  return h;
};
