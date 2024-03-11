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

import { useCartesianContext, useDataContext, useLayoutContext } from '@/providers';
import { CartesianAxis, LineChartMetadata } from '@/types';
import { getCoordinates, getLinesRenderer } from '@/utils';

export const useLines = () => {
  const { data, metadata } = useDataContext<LineChartMetadata>();
  const { isHorizontal } = useLayoutContext();
  const { axis, dimension, preventTooltipOpening } = useCartesianContext();

  const { maxHeight, maxWidth } = dimension;

  const {
    index, series, renderAs, showMarker, showMarkerLabel, overlay,
    hideMissingDataConnection, preventTooltipDisplay,
    tooltip,
  } = metadata as LineChartMetadata;

  const {
    top, right, left, bottom,
  } = axis;

  const indexAxis = isHorizontal ? bottom : left;
  const seriesAxis = isHorizontal ? left : bottom;
  const overlayAxis = isHorizontal ? right : top;

  const hasOverlay = Boolean(overlayAxis && overlay.dataKey && overlay.dataKey.length);

  const renderer = useMemo(() => getLinesRenderer(renderAs, isHorizontal), [isHorizontal, renderAs]);

  const getSeriesCoordinates = useMemo(() => (
    datum: Record<string, unknown>,
    dataKey: string,
    isHorizontal: boolean,
  ) => getCoordinates({
    datum,
    indexAxis: indexAxis as CartesianAxis,
    indexDataKey: index,
    otherAxis: seriesAxis as CartesianAxis,
    otherDataKey: dataKey,
    isHorizontal,
  }), [index, indexAxis, seriesAxis]);

  const getOverlayCoordinates = useMemo(() => (
    datum: Record<string, unknown>,
    dataKey: string,
    isHorizontal: boolean,
  ) => getCoordinates({
    datum,
    indexAxis: indexAxis as CartesianAxis,
    indexDataKey: index,
    otherAxis: overlayAxis as CartesianAxis,
    otherDataKey: dataKey,
    isHorizontal,
  }), [index, indexAxis, overlayAxis]);

  return {
    dimension,
    hasOverlay,
    hideMissingDataConnection,
    getOverlayCoordinates,
    getSeriesCoordinates,
    index,
    isHorizontal,
    indexAxis,
    seriesAxis,
    overlayAxis,
    overlay,
    maxHeight,
    maxWidth,
    preventTooltipDisplay,
    preventTooltipOpening,
    renderer,
    series,
    showMarker,
    showMarkerLabel,
    tooltip,
    data,
  };
};
