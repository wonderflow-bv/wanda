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

import { LineChartProps } from '../components';
import { colorPaletteDefault } from '../style-config';
import {
  CartesianChartLayout, Charts, Data,
  LineChartMetadata,
  MarginProps,
} from '../types';
import {
  computeAverage,
  handleChartAxisLayout,
  handleChartDomainAndScaleType,
  handleLineChartSeriesColors,
  handleSeriesNames,
} from '../utils';

export type UseLineChartProps = Except<LineChartProps, 'otherProps'>

export const useLineChart = ({
  theme = 'light',
  layout = CartesianChartLayout.HORIZONTAL,
  renderAs = 'curves',
  data = [],
  index,
  series,
  overlay,
  tooltip,
  showAverage = false,
  showTrend = false,
  hideMissingDataConnection = false,
  showMarker = false,
  showMarkerLabel = false,
  hidePadding = false,
}: UseLineChartProps) => {
  const [brushFilteredData, setBrushFilteredData] = useState<Data>(data);

  const isHorizontal = layout === CartesianChartLayout.HORIZONTAL;

  const zeroPadding: MarginProps | undefined = hidePadding
    ? {
      top: 0, right: 12, bottom: 0, left: 0,
    }
    : undefined;

  const { index: i, series: s, overlay: o } = useMemo(
    () => handleChartDomainAndScaleType(data, index, series, overlay),
    [data, index, overlay, series],
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

  const metadata: LineChartMetadata = useMemo(() => ({
    type: Charts.LINE_CHART,
    renderAs,
    index: index.dataKey,
    series: {
      dataKey: series.dataKey,
      names: handleSeriesNames(series),
      colors: handleLineChartSeriesColors(series, paletteSeries),
      style: series.style,
      average: computeAverage(data, series.dataKey),
      trend: [],
    },
    overlay: {
      dataKey: overlay?.dataKey,
      names: overlay ? handleSeriesNames(overlay) : undefined,
      colors: overlay ? handleLineChartSeriesColors(overlay, paletteOverlay) : undefined,
      style: overlay?.style,
      average: overlay?.dataKey ? computeAverage(data, overlay.dataKey) : undefined,
      trend: overlay?.dataKey ? [] : undefined,
    },
    tooltip,
    showAverage,
    showTrend,
    hideMissingDataConnection,
    showMarker,
    showMarkerLabel,
    hidePadding,
  }), [
    data,
    hideMissingDataConnection,
    hidePadding,
    index.dataKey,
    overlay,
    paletteOverlay,
    paletteSeries,
    renderAs,
    series,
    showAverage,
    showTrend,
    showMarker,
    showMarkerLabel,
    tooltip]);

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
