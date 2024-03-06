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
    hideMissingDataConnection, hasIndexReversed, preventTooltipDisplay,
    tooltip,
  } = metadata as LineChartMetadata;

  const reversedData = [...data].reverse();
  const updatedData = hasIndexReversed ? reversedData : data;

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
    updatedData,
  };
};
