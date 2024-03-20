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

import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { useCallback, useMemo } from 'react';

import {
  useCartesianContext, useDataContext, useLayoutContext, useStyleConfigContext,
} from '@/providers';
import { BarChartMetadata, CartesianAxis } from '@/types';
import { getPrimitiveFromObjectByPath } from '@/utils';

import { getLinearDomainStackSeries } from '../utils/bars';

export const useBars = () => {
  const { data, metadata } = useDataContext<BarChartMetadata>();
  const { isHorizontal } = useLayoutContext();
  const {
    axis, dimension, preventTooltipOpening, hasReversedIndex,
  } = useCartesianContext();
  const { bars } = useStyleConfigContext();

  const {
    left, bottom, right, top,
  } = axis;

  const { maxWidth, maxHeight } = dimension;

  const {
    series,
    index,
    overlay,
    isStacked,
    sortBy,
    showBackground: hasBackground,
    fixedBarSize,
    preventTooltipDisplay,
    tooltipExtraContent,
  } = metadata as BarChartMetadata;

  const { showBackground: hasBackgroundSeries } = series;
  const { showBackground: hasBackgroundOverlay } = overlay;

  const indexAxis = isHorizontal
    ? bottom as CartesianAxis
    : left as CartesianAxis;

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

  const X0Y0 = useCallback((d: Record<string, any>) => (`${getPrimitiveFromObjectByPath(d, index)}`), [index]);

  const scaleXY0 = scaleBand<string>({
    domain: hasReversedIndex ? data.map(X0Y0).reverse() : data.map(X0Y0),
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

  const scaleColorStackSeries = useMemo(() => scaleOrdinal({
    domain: series.dataKey,
    range: series.colors,
  }), [series.colors, series.dataKey]);

  const scaleColorStackOverlay = useMemo(() => scaleOrdinal({
    domain: overlay.dataKey,
    range: overlay.colors,
  }), [overlay.colors, overlay.dataKey]);

  const scaleStackSeries = useMemo(() => scaleLinear({
    domain: getLinearDomainStackSeries(data, series.dataKey, seriesAxis.domain as number[]),
    nice: true,
  }), [data, series.dataKey, seriesAxis.domain]);

  scaleStackSeries.rangeRound((isHorizontal ? [maxHeight, 0] : [0, maxWidth]));

  const scaleStackOverlay = useMemo(() => (overlayAxis && overlay.dataKey) && scaleLinear({
    domain: getLinearDomainStackSeries(data, overlay.dataKey, overlayAxis.domain as number[]),
    nice: true,
  }), [data, overlay.dataKey, overlayAxis]);

  scaleStackOverlay?.rangeRound((isHorizontal ? [maxHeight, 0] : [0, maxWidth]));

  return {
    data,
    isHorizontal,
    isStacked,
    index,
    series,
    overlay,
    sortBy,
    hasBackgroundSeries: (hasBackgroundSeries || hasBackground),
    hasBackgroundOverlay: (hasBackgroundOverlay || hasBackground),
    indexAxis,
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
    preventTooltipOpening,
    preventTooltipDisplay,
    scaleColorStackSeries,
    scaleColorStackOverlay,
    scaleStackSeries,
    scaleStackOverlay,
    tooltipExtraContent,
  };
};
