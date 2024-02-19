/*
 * Copyright 2022-2024 Wonderflow Design Team
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

import { useMemo, useState } from 'react';
import { Except } from 'type-fest';

import { BarChartProps } from '../components';
import { colorPaletteDefault } from '../style-config';
import {
  BarChartMetadata,
  CartesianChartLayout, Charts, Data,
  MarginProps,
} from '../types';
import {
  computeAverage,
  computeTrendline,
  handleBarChartSeriesColors,
  handleChartAxisLayout,
  handleChartDomainAndScaleType,
  handleSeriesNames,
} from '../utils';

export type UseBarChartProps = Except<BarChartProps, 'otherProps'>

export const useBarChart = ({
  theme = 'light',
  layout = CartesianChartLayout.HORIZONTAL,
  isStacked = false,
  sortBy = 'as-is',
  data = [],
  index,
  series,
  overlay,
  tooltip,
  preventTooltipDisplay = false,
  showAverage = false,
  showTrendline = false,
  showLabel,
  hidePadding = false,
}: UseBarChartProps) => {
  const [brushFilteredData, setBrushFilteredData] = useState<Data>(data);

  const isHorizontal = layout === CartesianChartLayout.HORIZONTAL;

  const { index: i, series: s, overlay: o } = useMemo(
    () => handleChartDomainAndScaleType(data, index, series, overlay), [data, index, overlay, series],
  );

  const { index: iFiltered, series: sFiltered, overlay: oFiltered } = useMemo(
    () => handleChartDomainAndScaleType(brushFilteredData, index, series, overlay),
    [brushFilteredData, index, overlay, series],
  );

  const axis = useMemo(() => handleChartAxisLayout(i, s, o), [i, s, o]);

  const axisFiltered = useMemo(() => handleChartAxisLayout(iFiltered, sFiltered, oFiltered),
    [iFiltered, sFiltered, oFiltered]);

  const paletteSeries = colorPaletteDefault[theme];
  const paletteOverlay = useMemo(() => [...paletteSeries.slice(6), ...paletteSeries.slice(0, 6)], [paletteSeries]);

  const zeroPadding: MarginProps | undefined = hidePadding ? {
    top: 0, right: 12, bottom: 0, left: 0,
  } : undefined;

  const metadata: BarChartMetadata = useMemo(() => ({
    type: Charts.BAR_CHART,
    isStacked,
    sortBy,
    index: index.dataKey,
    series: {
      dataKey: series.dataKey,
      names: handleSeriesNames(series),
      colors: handleBarChartSeriesColors(series, paletteSeries),
      style: series.style,
      average: showAverage ? computeAverage(data, series.dataKey) : undefined,
      trendline: showTrendline ? computeTrendline(data, series.dataKey) : undefined,
    },
    overlay: {
      dataKey: overlay?.dataKey,
      names: overlay ? handleSeriesNames(overlay) : undefined,
      colors: overlay ? handleBarChartSeriesColors(overlay, paletteOverlay) : undefined,
      style: overlay?.style,
      average: (overlay?.dataKey && showAverage) ? computeAverage(data, overlay.dataKey) : undefined,
      trendline: (overlay?.dataKey && showTrendline) ? computeTrendline(data, overlay.dataKey) : undefined,
    },
    tooltip,
    preventTooltipDisplay,
    showAverage,
    showTrendline,
    showLabel,
    hidePadding,
  }), [
    isStacked,
    sortBy,
    index.dataKey,
    series,
    paletteSeries,
    showAverage,
    data,
    showTrendline,
    overlay,
    paletteOverlay,
    tooltip,
    preventTooltipDisplay,
    showLabel,
    hidePadding]);

  return {
    axis,
    axisFiltered,
    isHorizontal,
    metadata,
    zeroPadding,
    brushFilteredData,
    setBrushFilteredData,
  };
};
