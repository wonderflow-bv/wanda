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
  CartesianChartLayout, Charts, Data,
} from '../../types';
import { handleDomainAndScaleType } from '../../utils';
import { AxisProps } from '../cartesian-base';
import { CartesianBase, CartesianBaseProps } from '../cartesian-base/cartesian-base';

export type LineChartIndex = Partial<AxisProps> & { dataKey: string };

export type LineChartOverlay = Partial<AxisProps> & {
  dataKey: string;
  style?: LineStyle;
};

export type LineChartSeries = Partial<AxisProps> & {
  dataKey: string[];
  style?: Array<LineStyle | undefined>;
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
  showMarker?: boolean;
  showMarkerLabel?: boolean;
} & Except<CartesianBaseProps, 'data' | 'metadata' | 'axis'>

export type LineChartMetadata = {
  type: Charts;
  layout: CartesianChartLayout;
  renderAs?: LineChartRenderType;
  index: string;
  series: string[];
  overlay?: string;
  styleSeries?: Array<LineStyle | undefined>;
  styleOverlay?: LineStyle;
  showMarker?: boolean;
  showMarkerLabel?: boolean;
}

export const LineChart = ({
  layout = CartesianChartLayout.HORIZONTAL,
  renderAs = 'curves',
  data,
  index,
  series,
  overlay,
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

  const metadata = {
    type: Charts.LINE_CHART,
    renderAs,
    layout,
    index: index.dataKey,
    series: series.dataKey,
    overlay: overlay?.dataKey,
    styleSeries: series.style,
    styleOverlay: overlay?.style,
    showMarker,
    showMarkerLabel,
  };

  return (
    <CartesianBase
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
