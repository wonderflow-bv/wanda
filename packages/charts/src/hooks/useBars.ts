import { scaleBand } from '@visx/scale';

import { useCartesianContext, useDataContext, useLayoutContext } from '@/providers';
import { BarChartMetadata, CartesianAxis } from '@/types';

export const useBars = () => {
  const { data, metadata } = useDataContext<BarChartMetadata>();
  const { isHorizontal } = useLayoutContext();
  const { axis, dimension } = useCartesianContext();

  const {
    left, bottom, right, top,
  } = axis;

  const { maxWidth, maxHeight } = dimension;

  const {
    series, index, overlay, sortBy,
  } = metadata as BarChartMetadata;

  const { hasBackground } = series;

  const seriesAxis = isHorizontal
    ? left as CartesianAxis
    : bottom as CartesianAxis;

  const hasOverlay = Boolean(overlay && (right || top));

  const overlayAxis = isHorizontal
    ? right as CartesianAxis
    : top as CartesianAxis;

  const X0Y0 = (d: Record<string, any>) => d[index];

  const scaleXY0 = scaleBand<string>({
    domain: data.map((d: any) => d[index]),
    paddingOuter: 1,
    paddingInner: 0.1,
  });

  scaleXY0.rangeRound((isHorizontal ? [0, maxWidth] : [maxHeight, 0]));

  const combinedDataKeys = hasOverlay ? [...series.dataKey, ...overlay.dataKey!] : series.dataKey;

  const scaleXY1 = scaleBand<string>({ domain: combinedDataKeys });

  scaleXY1.rangeRound([0, scaleXY0.bandwidth()]);

  return {
    data,
    isHorizontal,
    series,
    overlay,
    sortBy,
    hasBackground,
    seriesAxis,
    overlayAxis,
    hasOverlay,
    maxWidth,
    maxHeight,
    X0Y0,
    scaleXY0,
    scaleXY1,
  };
};
