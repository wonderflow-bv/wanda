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

import { defaultLineChartPalette } from '../../style-config';
import {
  CartesianChartLayout, Charts, Data,
} from '../../types';
import { getLabelFromObjectPath, handleDomainAndScaleType } from '../../utils';
import { AxisProps } from '../cartesian-base';
import { CartesianBase, CartesianBaseProps } from '../cartesian-base/cartesian-base';

export type LineChartIndex = Partial<AxisProps> & { dataKey: string };

export type LineChartOverlay = Partial<AxisProps> & {
  dataKey: string;
  style?: LineStyle;
  rename?: string;
};

export type LineChartSeries = Partial<AxisProps> & {
  dataKey: string[];
  style?: Array<LineStyle | undefined>;
  rename?: (...args: any) => string;
};

export type LineChartTooltip = {
  extraSeriesData?: (...args: any) => string;
  extraOverlayData?: (...args: any) => string;
  extraContent?: React.ReactNode;
};

export type LineChartRenderType = 'lines' | 'curves' | 'steps';

export type LineStyle = {
  stroke?: string;
  strokeWidth?: string;
  strokeOpacity?: string;
  strokeDasharray?: string;
  showMarker?: boolean;
  showMarkerLabel?: boolean;
}

export type LineChartProps = {
  layout: CartesianChartLayout;
  data: Data;
  renderAs?: LineChartRenderType;
  index: LineChartIndex;
  series: LineChartSeries;
  overlay?: LineChartOverlay;
  tooltip?: LineChartTooltip;
  showMarker?: boolean;
  showMarkerLabel?: boolean;
} & Except<CartesianBaseProps, 'data' | 'metadata' | 'axis'>

export type LineChartMetadata = {
  type: Charts;
  layout: CartesianChartLayout;
  renderAs?: LineChartRenderType;
  index: string;
  series: string[];
  seriesNames: string[];
  seriesColors: Array<string | undefined>;
  overlay?: string;
  overlayName: string;
  overlayColor: string;
  tooltip?: LineChartTooltip;
  styleSeries?: Array<LineStyle | undefined>;
  styleOverlay?: LineStyle;
  showMarker?: boolean;
  showMarkerLabel?: boolean;
}

export const LineChart = ({
  theme = 'light',
  layout = CartesianChartLayout.HORIZONTAL,
  renderAs = 'curves',
  data,
  index,
  series,
  overlay,
  tooltip,
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

  const palette = useMemo(() => defaultLineChartPalette[theme], [theme]);

  const seriesColors = useMemo(() => series.dataKey.map((_, i: number) => (
    series.style?.[i] ? series.style[i]?.stroke : palette.series[i]
  )), [palette.series, series.dataKey, series.style]);

  const overlayColor = useMemo(
    () => overlay?.style?.stroke ?? palette.overlay, [overlay?.style?.stroke, palette.overlay],
  );

  const overlayName = useMemo(() => {
    if (overlay) {
      return overlay.rename
        ?? _.startCase(overlay?.label)
        ?? _.startCase(getLabelFromObjectPath(overlay.dataKey));
    }

    return '';
  }, [overlay]);

  const metadata = {
    type: Charts.LINE_CHART,
    renderAs,
    layout,
    index: index.dataKey,
    series: series.dataKey,
    seriesNames,
    seriesColors,
    overlay: overlay?.dataKey,
    overlayName,
    overlayColor,
    tooltip,
    styleSeries: series.style,
    styleOverlay: overlay?.style,
    showMarker,
    showMarkerLabel,
  };

  return (
    <CartesianBase
      theme={theme}
      data={data}
      metadata={metadata}
      axis={axis[layout]}
      grid={{
        hideRows: !isHorizontal,
        hideColumns: isHorizontal,
      }}
      {...otherProps}
    />
  );
};

LineChart.displayName = 'LineChart';
