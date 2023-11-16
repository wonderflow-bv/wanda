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

import _ from 'lodash';
import { useMemo } from 'react';
import { Except } from 'type-fest';

import {
  DataProvider, LayoutProvider, StyleConfigProvider, ThemeProvider,
} from '../../providers';
import { defaultLineChartPalette } from '../../style-config';
import {
  CartesianChartLayout, Charts, Data, ThemeVariants,
} from '../../types';
import {
  LineChartIndex, LineChartMetadata, LineChartOverlay, LineChartRenderType, LineChartSeries, LineChartTooltip,
} from '../../types/line-chart';
import { getLabelFromObjectPath, handleDomainAndScaleType } from '../../utils';
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
  data,
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

  const i = useMemo(() => handleDomainAndScaleType(data, index), [data, index]);
  const s = useMemo(() => handleDomainAndScaleType(data, series), [data, series]);
  const o = useMemo(() => (overlay ? handleDomainAndScaleType(data, overlay) : undefined), [data, overlay]);

  const axis = useMemo(() => ({
    vertical: {
      left: i,
      bottom: s,
      top: o,
    },
    horizontal: {
      bottom: i,
      left: s,
      right: o,
    },
  }), [i, o, s]);

  const seriesNames = useMemo(() => series.dataKey.map((s: string, i: number) => (series.rename
    ? `${_.startCase(series.rename(s, i))}`
    : `${_.startCase(getLabelFromObjectPath(s))}`)), [series]);

  const overlayName = overlay?.rename
    ?? _.startCase(overlay?.label)
    ?? _.startCase(getLabelFromObjectPath(overlay?.dataKey ?? ''))
    ?? '';

  const palette = useMemo(() => defaultLineChartPalette[theme], [theme]);

  const seriesColors = useMemo(() => series.dataKey.map((_: string, i: number) => (
    series.style?.[i] ? series.style[i]?.stroke : palette.series[i]
  )), [palette.series, series.dataKey, series.style]);

  const overlayColor = overlay?.style?.stroke ?? palette.overlay;

  const metadata: LineChartMetadata = {
    type: Charts.LINE_CHART,
    renderAs,
    index: index.dataKey,
    series: {
      dataKey: series.dataKey,
      names: seriesNames,
      colors: seriesColors,
      style: series.style,
    },
    overlay: {
      dataKey: overlay?.dataKey,
      name: overlayName,
      color: overlayColor,
      style: overlay?.style,
    },
    tooltip,
    hideMissingDataConnection,
    showMarker,
    showMarkerLabel,
  };

  return (
    <StyleConfigProvider>
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
    </StyleConfigProvider>
  );
};

LineChart.displayName = 'LineChart';
