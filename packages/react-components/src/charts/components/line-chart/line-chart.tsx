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
import { Except } from 'type-fest';

import { CartesianChartLayout, Charts, Data } from '../../types';
import { extractPrimitivesFromArray } from '../../utils';
import { AxisProps } from '../cartesian-base';
import { CartesianBase, CartesianBaseProps } from '../cartesian-base/cartesian-base';

export type LineChartAxis = Except<AxisProps, 'domain'> & { dataKey: string[] };

export type LineChartProps = {
  layout: CartesianChartLayout;
  data: Data;
  top?: LineChartAxis;
  right?: LineChartAxis;
  bottom?: LineChartAxis;
  left?: LineChartAxis;
} & Except<CartesianBaseProps, 'data' | 'top' | 'right' | 'bottom' | 'left'>

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
  const extractDomain = (data: Data, axis: LineChartAxis) => {
    let domain: Array<string | number> = [];
    if (axis) {
      const domainData = _.uniq(_.flattenDeep(axis.dataKey.map(k => extractPrimitivesFromArray(data, k))));
      domain = domainData.filter((d): d is string | number => !_.isNil(d));
    }

    return domain;
  };

  const topA = top ? { ...top, domain: extractDomain(data, top) } : undefined;
  const rightA = right ? { ...right, domain: extractDomain(data, right) } : undefined;
  const bottomA = bottom ? { ...bottom, domain: extractDomain(data, bottom) } : undefined;
  const leftA = left ? { ...left, domain: extractDomain(data, left) } : undefined;

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
