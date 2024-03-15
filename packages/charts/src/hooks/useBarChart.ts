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
import { useStyleConfigContext } from '../providers/style-config';
import { colorPaletteDefault } from '../style-config';
import {
  BarChartMetadata,
  CartesianChartLayout, Charts, Data,
  MarginProps,
} from '../types';
import {
  computeAverage,
  computeTrendline,
  getHeightForVerticalChartWithFixedBarSize,
  handleBarChartDomainAndScaleType,
  handleBarChartSeriesColors,
  handleChartAxisLayout,
  handleSeriesNames,
} from '../utils';

export type UseBarChartProps = Except<BarChartProps, 'otherProps'>

export const useBarChart = ({
  theme = 'light',
  layout = CartesianChartLayout.HORIZONTAL,
  height,
  isStacked = false,
  sortBy = 'as-is',
  data = [],
  index,
  series,
  overlay,
  tooltipExtraContent,
  preventTooltipDisplay = false,
  showAverage = false,
  showTrendline = false,
  showLabel = false,
  showBackground = false,
  hidePadding = false,
  fixedBarSize = false,
}: UseBarChartProps) => {
  const { bars: barsStyleConfig } = useStyleConfigContext();
  const [brushFilteredData, setBrushFilteredData] = useState<Data>(data);

  const isHorizontal = layout === CartesianChartLayout.HORIZONTAL;

  const { index: i, series: s, overlay: o } = useMemo(
    () => handleBarChartDomainAndScaleType(
      data,
      index,
      series,
      overlay,
      isStacked,
    ),
    [data, index, overlay, series, isStacked],
  );

  const { index: iFiltered, series: sFiltered, overlay: oFiltered } = useMemo(
    () => handleBarChartDomainAndScaleType(
      brushFilteredData,
      index,
      series,
      overlay,
      isStacked,
    ),
    [brushFilteredData, index, overlay, series, isStacked],
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
      extraData: series.extraData,
      names: handleSeriesNames(series),
      colors: handleBarChartSeriesColors(series, paletteSeries),
      style: series.style,
      average: showAverage ? computeAverage(data, series.dataKey) : undefined,
      trendline: showTrendline ? computeTrendline(data, series.dataKey) : undefined,
      showBackground: series.showBackground,
    },
    overlay: {
      dataKey: overlay?.dataKey,
      extraData: overlay?.extraData,
      names: overlay ? handleSeriesNames(overlay) : undefined,
      colors: overlay ? handleBarChartSeriesColors(overlay, paletteOverlay) : undefined,
      style: overlay?.style,
      average: (overlay?.dataKey && showAverage) ? computeAverage(data, overlay.dataKey) : undefined,
      trendline: (overlay?.dataKey && showTrendline) ? computeTrendline(data, overlay.dataKey) : undefined,
      showBackground: overlay?.showBackground,
    },
    tooltipExtraContent,
    preventTooltipDisplay,
    showAverage,
    showTrendline,
    showLabel,
    showBackground,
    hidePadding,
    fixedBarSize,
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
    tooltipExtraContent,
    preventTooltipDisplay,
    showLabel,
    showBackground,
    hidePadding,
    fixedBarSize,
  ]);

  const hasVerticalFixedBarSize = Boolean(fixedBarSize && !isHorizontal);

  const fixedHeight = useMemo(() => (hasVerticalFixedBarSize
    ? getHeightForVerticalChartWithFixedBarSize(barsStyleConfig, data, metadata)
    : undefined), [barsStyleConfig, data, hasVerticalFixedBarSize, metadata]);

  return {
    axis,
    axisFiltered,
    fixedHeight: height ?? fixedHeight,
    isHorizontal,
    metadata,
    zeroPadding,
    brushFilteredData,
    setBrushFilteredData,
  };
};
