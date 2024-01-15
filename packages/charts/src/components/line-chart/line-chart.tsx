/*
 * Copyright 2023 Wonderflow Design Team
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

import {
  DataProvider, LayoutProvider,
  ThemeProvider,
} from '../../providers';
import { defaultLineChartPalette } from '../../style-config';
import {
  CartesianChartLayout, Charts, Data, MarginProps, ThemeVariants,
} from '../../types';
import {
  LineChartIndex, LineChartMetadata, LineChartOverlay, LineChartRenderType, LineChartSeries, LineChartTooltip,
} from '../../types/line-chart';
import {
  computeAverage,
  handleChartAxisLayout,
  handleChartDomainAndScaleType,
  handleLineChartOverlayColor,
  handleLineChartSeriesColors,
  handleOverlayName,
  handleSeriesNames,
} from '../../utils';
import { CartesianBase, CartesianBaseProps } from '../cartesian-base/cartesian-base';

export type LineChartProps = {
  /**
   * Set the theme of the chart. This is set to `light` by default.
   */
  theme?: ThemeVariants;
  /**
   * Set the layout of the chart. `Index`, `Series` and eventually `Overlay` will be automatically rearranged.
   */
  layout?: CartesianChartLayout;
  /**
   * Set the data structure that will be used to render the chart.
   */
  data: Data;
  /**
   * Set the type of render function used to draw any chart line.
   */
  renderAs?: LineChartRenderType;
  /**
   * Set the properties associated with the Index Axis.
   */
  index: LineChartIndex;
  /**
   * Set the properties associated with any Series of lines.
   */
  series: LineChartSeries;
  /**
   * Set the properties associated with the Overlay Axis.
   */
  overlay?: LineChartOverlay;
  /**
   * Display an average line and label when true.
   */
  showAverage?: boolean;
  /**
   * Set extra data or custom content to be displayed in the tooltip.
   */
  tooltip?: LineChartTooltip;
  /**
   * Prevent showing a connecting line between points when data is missing.
   */
  hideMissingDataConnection?: boolean;
  /**
   * Show a marker for every single data point.
   */
  showMarker?: boolean;
  /**
   * Show a label and a marker for every single data point.
   */
  showMarkerLabel?: boolean;
  /**
   * Remove the padding from the chart container.
   */
  hidePadding?: boolean;
} & Except<CartesianBaseProps, 'axis'>

export const LineChart: React.FC<LineChartProps> = ({
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
  ...otherProps
}: LineChartProps) => {
  const [brushFilteredData, setBrushFilteredData] = useState<Data>(data);

  const isHorizontal = layout === CartesianChartLayout.HORIZONTAL;

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

  const palette = useMemo(() => defaultLineChartPalette[theme], [theme]);

  const zeroPadding: MarginProps | undefined = hidePadding
    ? {
      top: 0, right: 12, bottom: 0, left: 0,
    }
    : undefined;

  const metadata: LineChartMetadata = useMemo(() => ({
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
  }), [renderAs,
    index.dataKey,
    series,
    palette.series,
    palette.overlay,
    data, overlay,
    tooltip,
    showAverage,
    hideMissingDataConnection,
    showMarker,
    showMarkerLabel,
    hidePadding]);

  return (
    <ThemeProvider theme={theme}>
      <LayoutProvider layout={layout}>
        <DataProvider data={data} metadata={metadata} filteredData={brushFilteredData}>
          <CartesianBase
            {...otherProps}
            axis={axis[layout]}
            axisFiltered={axisFiltered[layout]}
            grid={{
              hideRows: !isHorizontal,
              hideColumns: isHorizontal,
            }}
            margin={zeroPadding}
            onBrushChange={setBrushFilteredData}
          />
        </DataProvider>
      </LayoutProvider>
    </ThemeProvider>
  );
};

LineChart.displayName = 'LineChart';
