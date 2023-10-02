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

import { Except } from 'type-fest';

import {
  CartesianChartLayout, Charts, Data,
} from '../../types';
import { extractDomainFromData } from '../../utils';
import { AxisProps } from '../cartesian-base';
import { CartesianBase, CartesianBaseProps } from '../cartesian-base/cartesian-base';

export type LineChartIndex = Except<AxisProps, 'domain'> & {
  dataKey: string;
  domain?: Array<string | number>;
};

export type LineChartSeries = Except<AxisProps, 'domain'> & {
  dataKey: string[];
  domain?: Array<string | number>;
};

export type LineChartProps = {
  layout: CartesianChartLayout;
  data: Data;
  index: LineChartIndex;
  series: LineChartSeries;
  overlay?: LineChartIndex;
} & Except<CartesianBaseProps, 'data' | 'metadata' | 'axis'>

export type LineChartMetadata = {
  type: Charts;
  layout: CartesianChartLayout;
  index: string;
  series: string[];
  overlay?: string;
}

export const LineChart = ({
  layout = CartesianChartLayout.HORIZONTAL,
  data,
  index,
  series,
  overlay,
  ...rest
}: LineChartProps) => {
  const axis = {
    vertical: {
      left: {
        ...index,
        domain: extractDomainFromData(data, index, index.domain),
      },
      bottom: {
        ...series,
        domain: extractDomainFromData(data, series, series.domain),
      },
      top: overlay ? {
        ...overlay,
        domain: extractDomainFromData(data, overlay, overlay.domain),
      } : undefined,
    },
    horizontal: {
      bottom: {
        ...index,
        domain: extractDomainFromData(data, index, index.domain),
      },
      left: {
        ...series,
        domain: extractDomainFromData(data, series, series.domain),
      },
      right: overlay ? {
        ...overlay,
        domain: extractDomainFromData(data, overlay, overlay.domain),
      } : undefined,
    },
  };

  const metadata = {
    type: Charts.LINE_CHART,
    layout,
    index: index.dataKey,
    series: series.dataKey,
    overlay: overlay?.dataKey,
  };

  return (
    <CartesianBase
      data={data}
      metadata={metadata}
      axis={axis[layout]}
      {...rest}
    />
  );
};

LineChart.displayName = 'LineChart';
