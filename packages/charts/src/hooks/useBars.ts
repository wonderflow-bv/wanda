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

import { scaleBand } from '@visx/scale';
import { useMemo } from 'react';

import {
  useCartesianContext, useDataContext, useLayoutContext, useStyleConfigContext,
} from '@/providers';
import { Bar, BarChartMetadata, CartesianAxis } from '@/types';

export const useBars = () => {
  const { data, metadata } = useDataContext<BarChartMetadata>();
  const { isHorizontal } = useLayoutContext();
  const { axis, dimension } = useCartesianContext();
  const { bars } = useStyleConfigContext();

  const {
    left, bottom, right, top,
  } = axis;

  const { maxWidth, maxHeight } = dimension;

  const {
    series,
    index,
    overlay,
    sortBy,
    showBackground: hasBackground,
    hasIndexReversed,
    fixedBarSize,
  } = metadata as BarChartMetadata;

  const reversedData = [...data].reverse();
  const updatedData = hasIndexReversed ? reversedData : data;

  const { showBackground: hasBackgroundSeries } = series;
  const { showBackground: hasBackgroundOverlay } = overlay;

  const seriesAxis = isHorizontal
    ? left as CartesianAxis
    : bottom as CartesianAxis;

  const hasOverlay = Boolean(overlay && (right || top));

  const overlayAxis = isHorizontal
    ? right as CartesianAxis
    : top as CartesianAxis;

  const {
    maxSize,
    paddingInner,
    paddingOuter,
    paddingInnerGroup,
    paddingOuterGroup,
    bar,
    background,
  } = bars;

  const X0Y0 = (d: Record<string, any>) => d[index];

  const scaleXY0 = scaleBand<string>({
    domain: updatedData.map((d: any) => d[index]),
    paddingOuter,
    paddingInner,
  });

  scaleXY0.rangeRound((isHorizontal ? [0, maxWidth] : [maxHeight, 0]));

  const combinedDataKeys = useMemo(() => (hasOverlay
    ? [...series.dataKey, ...overlay.dataKey!]
    : series.dataKey), [hasOverlay, overlay.dataKey, series.dataKey]);

  const scaleXY1 = scaleBand<string>({
    domain: combinedDataKeys,
    paddingInner: paddingInnerGroup,
    paddingOuter: paddingOuterGroup,
  });

  scaleXY1.rangeRound([0, scaleXY0.bandwidth()]);

  const handleEvents = (event: React.SyntheticEvent, bar: Bar) => {
    const { key, value } = bar;
    if (event.type === 'mouseover') {
      console.log('hover', key, value);
    }

    if (event.type === 'click') {
      console.log('click', key, value);
    }
  };

  return {
    data: updatedData,
    isHorizontal,
    series,
    overlay,
    sortBy,
    handleEvents,
    hasBackgroundSeries: (hasBackgroundSeries || hasBackground),
    hasBackgroundOverlay: (hasBackgroundOverlay || hasBackground),
    seriesAxis,
    overlayAxis,
    hasOverlay,
    maxWidth,
    maxHeight,
    X0Y0,
    scaleXY0,
    scaleXY1,
    fixedBarSize: Boolean(fixedBarSize),
    style: {
      bar,
      background,
      maxSize,
    },
  };
};
