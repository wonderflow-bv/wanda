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

import { useMemo } from 'react';
import { Except } from 'type-fest';

import {
  DataProvider, LayoutProvider,
  ThemeProvider,
} from '../../providers';
import { defaultLineChartPalette } from '../../style-config';
import {
  CartesianChartLayout, Charts, Data, ThemeVariants,
} from '../../types';
import {
  LineChartIndex, LineChartMetadata, LineChartOverlay, LineChartRenderType, LineChartSeries, LineChartTooltip,
} from '../../types/line-chart';
import {
  handleChartAxisLayout,
  handleChartDomainAndScaleType,
  handleOverlayColor,
  handleOverlayName,
  handleSeriesColors,
  handleSeriesNames,
} from '../../utils';
import { CartesianBase, CartesianBaseProps } from '../cartesian-base/cartesian-base';

export type LineChartProps = {
  /**
   * Set the theme of the chart. This is set to light by default.
   */
  theme: ThemeVariants;
  /**
   * Set the layout of the chart. `Index`, `Series` and eventually `Overlay` will be automatically rearranged.
   */
  layout: CartesianChartLayout;
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
  tooltip?: LineChartTooltip;
  hideMissingDataConnection?: boolean;
  showMarker?: boolean;
  showMarkerLabel?: boolean;
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
  hideMissingDataConnection = false,
  showMarker = false,
  showMarkerLabel = false,
  ...otherProps
}: LineChartProps) => {
  const isHorizontal = layout === CartesianChartLayout.HORIZONTAL;

  const { index: i, series: s, overlay: o } = useMemo(
    () => handleChartDomainAndScaleType(data, index, series, overlay), [data, index, overlay, series],
  );

  const axis = useMemo(() => handleChartAxisLayout(i, s, o), [i, s, o]);

  const palette = useMemo(() => defaultLineChartPalette[theme], [theme]);

  const metadata: LineChartMetadata = useMemo(() => ({
    type: Charts.LINE_CHART,
    renderAs,
    index: index.dataKey,
    series: {
      dataKey: series.dataKey,
      names: handleSeriesNames(series),
      colors: handleSeriesColors(series, palette.series),
      style: series.style,
    },
    overlay: {
      dataKey: overlay?.dataKey,
      name: handleOverlayName(overlay),
      color: handleOverlayColor(overlay, palette.overlay),
      style: overlay?.style,
    },
    tooltip,
    hideMissingDataConnection,
    showMarker,
    showMarkerLabel,
  }), [renderAs,
    index.dataKey,
    series,
    palette.series,
    palette.overlay,
    overlay,
    tooltip,
    hideMissingDataConnection,
    showMarker,
    showMarkerLabel]);

  return (
    <ThemeProvider theme={theme}>
      <LayoutProvider layout={layout}>
        <DataProvider data={data} metadata={metadata}>
          <CartesianBase
            axis={axis[layout]}
            grid={{
              hideRows: !isHorizontal,
              hideColumns: isHorizontal,
            }}
            {...otherProps}
          />
        </DataProvider>
      </LayoutProvider>
    </ThemeProvider>
  );
};

LineChart.displayName = 'LineChart';
