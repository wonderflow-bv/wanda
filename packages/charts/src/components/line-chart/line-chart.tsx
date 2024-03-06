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
   * By default, the data will grow from the lower left Cartesian origin ({x:0, y:0})
   * in both the horizontal and vertical layouts, so that the values will increase upward and rightward.
   * By setting this parameter `true`,
   * the order of the index will be reversed, but only in the vertical layout (left axis).
   */
  reverseIndex?: boolean;
  /**
   * When set to 'true' zero will be in the middle of the axis and
   * the min/max domain value will be derived from the min/max data value or
   * min/max value of custom domain.
   */
  mirrorDomains?: boolean;
  /**
   * Set the properties associated with the `Index` axis.
   */
  index: LineChartIndex;
  /**
   * Set properties associated with any `Series` of lines.
   */
  series: LineChartSeries;
  /**
   * Set properties associated with the `Overlay` axis.
   */
  overlay?: LineChartSeries;
  /**
   * Display an average line and label when `true`.
   */
  showAverage?: boolean;
  /**
   * Display a trend line for every single line when `true`.
   */
  showTrendline?: boolean;
  /**
   * Set extra data or custom content to be displayed in the `tooltip`.
   */
  tooltip?: LineChartTooltip;
  /**
   * Prevent from displaying the tooltip on the chart when `true`.
   */
  preventTooltipDisplay?: boolean;
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
  reverseIndex = false,
  mirrorDomains = false,
  data = [],
  index,
  series,
  overlay,
  tooltip,
  preventTooltipDisplay = false,
  showAverage = false,
  showTrendline = false,
  hidePadding = false,
  hideMissingDataConnection = false,
  showMarker = false,
  showMarkerLabel = false,
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
    reverseIndex,
    mirrorDomains,
    data,
    index,
    series,
    overlay,
    tooltip,
    preventTooltipDisplay,
    hidePadding,
    showAverage,
    showTrendline,
    hideMissingDataConnection,
    showMarker,
    showMarkerLabel,
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
