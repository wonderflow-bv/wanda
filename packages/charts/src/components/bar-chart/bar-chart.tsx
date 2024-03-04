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

import { Except } from 'type-fest';

import { useBarChart } from '../../hooks/useBarChart';
import {
  DataProvider, LayoutProvider,
  ThemeProvider,
} from '../../providers';
import {
  CartesianChartLayout,
  Data,
  SortingType, ThemeVariants,
} from '../../types';
import {
  BarChartIndex,
  BarChartSeries, BarChartTooltip,
} from '../../types/bar-chart';
import { CartesianBase, CartesianBaseProps } from '../cartesian-base/cartesian-base';

export type BarChartProps = {
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
   * If true bars get stacked one upon the other.
   */
  isStacked?: boolean;
  /**
   * Set the order data should be sorted by:
   * 'descending-key': dataKey alphabetical order;
   * 'ascending-key': reverse dataKey alphabetical order;
   * 'descending-value': by data value;
   * 'ascending-value': by reverse data value;
   * 'as-is': as set in series/overlay dataKey;
   */
  sortBy?: SortingType;

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
   * Set the properties associated with the Index Axis.
   */
  index: BarChartIndex;
  /**
   * Set the properties associated with any Series of lines.
   */
  series: BarChartSeries;
  /**
   * Set the properties associated with the Overlay Axis.
   */
  overlay?: BarChartSeries;
  /**
   * Display an average line and label when `true`.
   */
  showAverage?: boolean;
  /**
   * Display a trend line for every single set of bars when `true`.
   */
  showTrendline?: boolean;
  /**
   * Display a background color behind the bars to highlight the entire possible occupancy area.
   */
  showBackground?: boolean;
  /**
   * Set extra data or custom content to be displayed in the tooltip.
   */
  tooltip?: BarChartTooltip;
  /**
   * Prevent from displaying the tooltip on the chart when `true`.
   */
  preventTooltipDisplay?: boolean;
  /**
   * Show a label for every single bar.
   */
  showLabel?: boolean;
  /**
   * Remove the padding from the chart container.
   */
  hidePadding?: boolean;
} & Except<CartesianBaseProps, 'axis' | 'axisFiltered' | 'onBrushChange'>

export const BarChart: React.FC<BarChartProps> = ({
  theme = 'light',
  layout = CartesianChartLayout.HORIZONTAL,
  isStacked = false,
  sortBy = 'as-is',
  data = [],
  index,
  series,
  overlay,
  reverseIndex,
  mirrorDomains,
  tooltip,
  preventTooltipDisplay = false,
  showAverage = false,
  showTrendline = false,
  showLabel = false,
  showBackground = false,
  hidePadding = false,
  ...otherProps
}: BarChartProps) => {
  const {
    axis,
    axisFiltered,
    isHorizontal,
    metadata,
    zeroPadding,
    brushFilteredData,
    setBrushFilteredData,
  } = useBarChart({
    theme,
    layout,
    isStacked,
    sortBy,
    data,
    reverseIndex,
    mirrorDomains,
    index,
    series,
    overlay,
    tooltip,
    preventTooltipDisplay,
    showAverage,
    showTrendline,
    showLabel,
    showBackground,
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
          />
        </DataProvider>
      </LayoutProvider>
    </ThemeProvider>
  );
};

BarChart.displayName = 'BarChart';
