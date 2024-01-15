/*
 * Copyright 2022-2023 Wonderflow Design Team
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

import { useEffect, useMemo, useState } from 'react';
import { Except } from 'type-fest';

import { LineChartProps } from '../components';
import { defaultLineChartPalette } from '../style-config';
import {
  CartesianChartLayout, Charts, Data, LineChartMetadata, MarginProps,
} from '../types';
import {
  computeAverage,
  handleChartAxisLayout,
  handleChartDomainAndScaleType,
  handleLineChartOverlayColor,
  handleLineChartSeriesColors,
  handleOverlayName,
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
  hideMissingDataConnection = false,
  showMarker = false,
  showMarkerLabel = false,
  hidePadding = false,
}: UseLineChartProps) => {
  const [metadata, setMetadata] = useState<LineChartMetadata>();
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

  useEffect(() => {
    const palette = defaultLineChartPalette[theme];

    setMetadata({
      type: Charts.LINE_CHART,
      renderAs,
      index: index.dataKey,
      series: {
        dataKey: series.dataKey,
        names: handleSeriesNames(series),
        colors: handleLineChartSeriesColors(series, palette.series),
        style: series.style,
        average: computeAverage(data, series.dataKey),
      },
      overlay: {
        dataKey: overlay?.dataKey,
        name: handleOverlayName(overlay),
        color: handleLineChartOverlayColor(overlay, palette.overlay),
        style: overlay?.style,
        average: overlay?.dataKey ? computeAverage(data, [overlay.dataKey]) : undefined,
      },
      tooltip,
      showAverage,
      hideMissingDataConnection,
      showMarker,
      showMarkerLabel,
      hidePadding,
    });
  }, [data,
    hideMissingDataConnection,
    hidePadding,
    index.dataKey,
    overlay,
    renderAs,
    series,
    showAverage,
    showMarker,
    showMarkerLabel,
    theme,
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
