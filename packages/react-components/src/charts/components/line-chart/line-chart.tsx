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

export type LineChartAxis = Except<AxisProps, 'domain'> & {
  dataKey: string[];
  domain?: Array<string | number>;
};

export type LineChartProps = {
  layout: CartesianChartLayout;
  data: Data;
  top?: LineChartAxis;
  right?: LineChartAxis;
  bottom?: LineChartAxis;
  left?: LineChartAxis;
} & Except<CartesianBaseProps, 'data' | 'metadata' | 'top' | 'right' | 'bottom' | 'left'>

export type LineChartMetadata = {
  type: Charts;
  layout: CartesianChartLayout;
  index: string;
  collection: string[];
  overlay?: string[];
}

export const LineChart = ({
  layout = CartesianChartLayout.HORIZONTAL,
  data,
  top,
  right,
  bottom,
  left,
  ...rest
}: LineChartProps) => {
  const topA = top ? {
    ...top,
    domain: extractDomainFromData(data, top, top.domain),
  } : undefined;
  const rightA = right ? {
    ...right,
    domain: extractDomainFromData(data, right, right.domain),
  } : undefined;
  const bottomA = bottom ? {
    ...bottom,
    domain: extractDomainFromData(data, bottom, bottom.domain),
  } : undefined;
  const leftA = left ? {
    ...left,
    domain: extractDomainFromData(data, left, left.domain),
  } : undefined;

  const c = {
    type: Charts.LINE_CHART,
    layout,
  };

  const hr: LineChartMetadata = {
    ...c,
    index: bottom?.dataKey[0] ?? top?.dataKey[0] ?? '',
    collection: left?.dataKey ?? [],
    overlay: right?.dataKey,
  };

  const vr: LineChartMetadata = {
    ...c,
    index: left?.dataKey[0] ?? right?.dataKey[0] ?? '',
    collection: bottom?.dataKey ?? [],
    overlay: top?.dataKey,
  };

  const metadata = layout === CartesianChartLayout.HORIZONTAL ? hr : vr;

  return (
    <CartesianBase
      data={data}
      metadata={metadata}
      top={topA}
      right={rightA}
      bottom={bottomA}
      left={leftA}
      {...rest}
    />
  );
};

LineChart.displayName = 'LineChart';
