import { useCallback } from 'react';

import {
  useCartesianContext, useDataContext, useLayoutContext, useStyleConfigContext,
} from '@/providers';
import { CartesianChartMetadata } from '@/types';

export const useTrendline = < T extends CartesianChartMetadata>() => {
  const { lines: defaultStyle } = useStyleConfigContext();
  const { metadata } = useDataContext<T>();
  const { isHorizontal } = useLayoutContext();
  const { axis, dimension } = useCartesianContext();

  const {
    top, right, bottom, left,
  } = axis;

  const seriesAxis = isHorizontal ? left : bottom;
  const overlayAxis = isHorizontal ? right : top;

  const { showTrendline, series, overlay } = metadata as T;

  const { maxHeight, maxWidth } = dimension;

  const {
    opacity,
    pointerEvents,
    strokeDasharray,
    strokeWidth,
  } = defaultStyle.trendline;

  const trendlineSeries = series.trendline;
  const trendlineOverlay = overlay.trendline;

  const hasTrendlineSeries = Boolean(showTrendline && trendlineSeries?.length);
  const hasTrendlineOverlay = Boolean(showTrendline && trendlineOverlay?.length);

  const getCoordinates = useCallback((from: number, to: number) => (isHorizontal
    ? {
      from: {
        x: 0,
        y: from,
      },
      to: {
        x: maxWidth,
        y: to,
      },
    }
    : {
      from: {
        x: to,
        y: 0,
      },
      to: {
        x: from,
        y: maxHeight,
      },
    }), [isHorizontal, maxHeight, maxWidth]);

  return {
    series,
    overlay,
    seriesAxis,
    overlayAxis,
    hasTrendlineSeries,
    hasTrendlineOverlay,
    getCoordinates,
    style: {
      opacity,
      pointerEvents,
      strokeDasharray,
      strokeWidth,
    },
  };
};
