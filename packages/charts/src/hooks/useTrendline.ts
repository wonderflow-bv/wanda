/*
 * Copyright 2024 Wonderflow Design Team
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
