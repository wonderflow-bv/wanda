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

import { useMemo } from 'react';
import { Except } from 'type-fest';

import {
  DataProvider, LayoutProvider,
  ThemeProvider,
} from '../../providers';
import { colorPaletteDefault } from '../../style-config';
import {
  CartesianChartLayout, Charts, Data, MarginProps, SortingType, ThemeVariants,
} from '../../types';
import {
  BarChartIndex, BarChartMetadata,
  BarChartSeries, BarChartTooltip,
} from '../../types/bar-chart';
import {
  handleBarChartSeriesColors,
  handleChartAxisLayout,
  handleChartDomainAndScaleType,
  handleSeriesNames,
} from '../../utils';
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
   * If true bars get stacked one upon each other.
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
   * Set extra data or custom content to be displayed in the tooltip.
   */
  tooltip?: BarChartTooltip;
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
  tooltip,
  hidePadding = false,
  ...otherProps
}: BarChartProps) => {
  const isHorizontal = layout === CartesianChartLayout.HORIZONTAL;

  const { index: i, series: s, overlay: o } = useMemo(
    () => handleChartDomainAndScaleType(data, index, series, overlay), [data, index, overlay, series],
  );

  const axis = useMemo(() => handleChartAxisLayout(i, s, o), [i, s, o]);

  const palette = useMemo(() => colorPaletteDefault[theme], [theme]);

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
      colors: handleBarChartSeriesColors(series, palette),
      style: series.style,
    },
    overlay: {
      dataKey: overlay?.dataKey,
      names: overlay ? handleSeriesNames(overlay) : undefined,
      colors: overlay ? handleBarChartSeriesColors(overlay, palette.reverse()) : undefined,
      style: overlay?.style,
    },
    tooltip,
    hidePadding,
  }), [isStacked, sortBy, index.dataKey, series, palette, overlay, tooltip, hidePadding]);

  return (
    <ThemeProvider theme={theme}>
      <LayoutProvider layout={layout}>
        <DataProvider data={data} metadata={metadata} filteredData={data}>
          <CartesianBase
            {...otherProps}
            axis={axis[layout]}
            axisFiltered={axis[layout]}
            grid={{
              hideRows: !isHorizontal,
              hideColumns: isHorizontal,
            }}
            margin={zeroPadding}
            onBrushChange={() => ({})}
          />
        </DataProvider>
      </LayoutProvider>
    </ThemeProvider>
  );
};

BarChart.displayName = 'BarChart';
