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
  BarChartSeries,
} from '../../types/bar-chart';
import { CartesianBase, CartesianBaseProps } from '../cartesian-base/cartesian-base';

export type BarChartProps = {
  /**
   * Set the theme of the chart. This is set to `light` by default.
   */
  theme?: ThemeVariants;
  /**
   * Set the layout of the chart. `Index`, `Series` and eventually `Overlay` will be automatically rearranged.
   * Layout is Horizontal when Index is on the bottom axis, and is Vertical when index is on the left one.
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
   * Set how data should be sorted by:
   * 'descending-key': dataKey alphabetical order;
   * 'ascending-key': dataKey reverse alphabetical order;
   * 'descending-value': by data value;
   * 'ascending-value': by reverse data value;
   * 'as-is': as set in series/overlay dataKey;
   * Values organized on different axis will be independent one from another
   * and will be treated like independent groups sorted by the same logic.
   */
  sortBy?: SortingType;
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
   * Display a trend line for every single series of bars when `true`.
   */
  showTrendline?: boolean;
  /**
   * Display a background color behind the bars to highlight the entire possible occupancy area.
   */
  showBackground?: boolean;
  /**
   * Set custom content to be displayed in the tooltip below the default information.
   */
  tooltipExtraContent?: React.ReactNode;
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
  /**
   * If set to `true`, in the horizontal layout the bars resize up to the maximum thickness (default 24px),
   * while in the vertical layout they have a fixed thickness, forcing the graph to resize in height.
   */
  fixedBarSize?: boolean;
} & Except<CartesianBaseProps, 'axis' | 'axisFiltered' | 'onBrushChange'>

export const BarChart: React.FC<BarChartProps> = ({
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
  ...otherProps
}: BarChartProps) => {
  const {
    axis,
    axisFiltered,
    fixedHeight,
    isHorizontal,
    metadata,
    zeroPadding,
    brushFilteredData,
    setBrushFilteredData,
  } = useBarChart({
    theme,
    layout,
    height,
    isStacked,
    sortBy,
    data,
    index,
    series,
    overlay,
    tooltipExtraContent,
    preventTooltipDisplay,
    showAverage,
    showTrendline,
    showLabel,
    showBackground,
    hidePadding,
    fixedBarSize,
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
            overrideInnerHeight={fixedHeight}
          />
        </DataProvider>
      </LayoutProvider>
    </ThemeProvider>
  );
};

BarChart.displayName = 'BarChart';
