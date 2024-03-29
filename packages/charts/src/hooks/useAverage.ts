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

import { useMemo } from 'react';

import {
  useCartesianContext, useDataContext, useLayoutContext, useStyleConfigContext,
} from '@/providers';
import { CartesianChartMetadata } from '@/types';

export const useAverage = <T extends CartesianChartMetadata>() => {
  const { lines: defaultStyle, viewport } = useStyleConfigContext();
  const { metadata } = useDataContext<T>();
  const { isHorizontal } = useLayoutContext();
  const { axis, dimension } = useCartesianContext();

  const {
    top, right, bottom, left,
  } = axis;

  const seriesAxis = isHorizontal ? left : bottom;
  const overlayAxis = isHorizontal ? right : top;

  const { showAverage, series, overlay } = metadata as T;

  const { maxHeight, maxWidth } = dimension;

  const {
    backgroundPadding,
    backgroundProps,
    maxLabelWidth,
    opacity,
    pointerEvents,
    strokeDasharray,
    strokeWidth,
    titleFontSize,
    titleFontWeight,
    titleProps,
  } = defaultStyle.average;

  const averageSeries: any = series.average?.average;
  const averageOverlay: any = overlay.average?.average;

  const averageSeriesScale = (seriesAxis && averageSeries) ? seriesAxis.scale(averageSeries) : 0;
  const averageOverlayScale = (overlayAxis && averageOverlay) ? overlayAxis.scale(averageOverlay) : 0;

  const hasAverageSeries = Boolean(showAverage && averageSeries);
  const hasAverageOverlay = Boolean(showAverage && averageOverlay);

  const hasAverageSeriesLabel = (dimension.maxWidth > viewport.small.maxWidth) && hasAverageSeries;

  const hasAverageOverlayLabel = (dimension.maxWidth > viewport.small.maxWidth) && hasAverageOverlay;

  const coordinates = useMemo(() => (isHorizontal
    ? {
      series: {
        from: { x: 0, y: averageSeriesScale },
        to: { x: maxWidth, y: averageSeriesScale },
        label: { x: 4, y: averageSeriesScale },
      },
      overlay: {
        from: { x: 0, y: averageOverlayScale },
        to: { x: maxWidth, y: averageOverlayScale },
        label: { x: maxWidth - 4, y: averageOverlayScale },
      },
    }
    : {
      series: {
        from: { x: averageSeriesScale, y: 0 },
        to: { x: averageSeriesScale, y: maxHeight },
        label: { x: averageSeriesScale, y: maxHeight - 16 },
      },
      overlay: {
        from: { x: averageOverlayScale ?? 0, y: 0 },
        to: { x: averageOverlayScale ?? 0, y: maxHeight },
        label: { x: averageOverlayScale, y: 16 },
      },
    }), [isHorizontal, averageSeriesScale, maxWidth, averageOverlayScale, maxHeight]);

  return {
    averageSeries,
    averageOverlay,
    hasAverageSeries,
    hasAverageOverlay,
    hasAverageSeriesLabel,
    hasAverageOverlayLabel,
    coordinates,
    style: {
      backgroundPadding,
      backgroundProps,
      maxLabelWidth,
      opacity,
      pointerEvents,
      strokeDasharray,
      strokeWidth,
      titleFontSize,
      titleFontWeight,
      titleProps,
    },
  };
};

