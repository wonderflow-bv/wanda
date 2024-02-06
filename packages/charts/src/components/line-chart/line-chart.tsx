/*
 * Copyright 2023-2024 Wonderflow Design Team
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

import { forwardRef } from 'react';
import { Except } from 'type-fest';

import { useLineChart } from '../../hooks';
import {
  DataProvider, LayoutProvider,
  ThemeProvider,
} from '../../providers';
import {
  CartesianChartLayout,
  Data,
  ThemeVariants,
} from '../../types';
import {
  LineChartIndex,
  LineChartRenderType, LineChartSeries, LineChartTooltip,
} from '../../types/line-chart';
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
  overlay?: LineChartSeries;
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
} & Except<CartesianBaseProps, 'axis' | 'axisFiltered' | 'onBrushChange'>

export const LineChart = forwardRef<HTMLElement, LineChartProps>(({
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
}, forwardedRef) => {
  const {
    axis,
    axisFiltered,
    isHorizontal,
    metadata,
    zeroPadding,
    brushFilteredData,
    setBrushFilteredData,
  } = useLineChart({
    theme,
    layout,
    renderAs,
    data,
    index,
    series,
    overlay,
    tooltip,
    showAverage,
    hideMissingDataConnection,
    showMarker,
    showMarkerLabel,
    hidePadding,
  });

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
            ref={forwardedRef}
          />
        </DataProvider>
      </LayoutProvider>
    </ThemeProvider>
  );
});

LineChart.displayName = 'LineChart';
