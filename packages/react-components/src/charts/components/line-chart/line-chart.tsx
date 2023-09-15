import _ from 'lodash';
import { Except } from 'type-fest';

import { extractPrimitivesFromArray } from '../../utils';
import { AxisProps } from '../cartesian-base';
import { Charts } from '../cartesian-base/cartesian-base';

export type Data = Array<Record<string, unknown>>;
export type DataCollection = unknown[][];
export enum CartesianChartLayout {
  VERTICAL = 'VERTICAL',
  HORIZONTAL = 'HORIZONTAL',
}

export type LineChartProps = {
  layout: CartesianChartLayout;
  data: Data;
  top?: Except<AxisProps, 'domain'> & { dataKey: string[] };
  right?: Except<AxisProps, 'domain'> & { dataKey: string[] };
  bottom?: Except<AxisProps, 'domain'> & { dataKey: string[] };
  left?: Except<AxisProps, 'domain'> & { dataKey: string[] };
}

export type LineChartMetadata = {
  type: Charts;
  layout: CartesianChartLayout;
  index?: string;
  collection?: string[];
  overlay?: string[];
}

export const LineChart = ({
  layout = CartesianChartLayout.HORIZONTAL,
  data,
  top,
  right,
  bottom,
  left,
}: LineChartProps) => {
  const topDomain = top
    ? _.uniq(_.flattenDeep(top.dataKey.map(k => extractPrimitivesFromArray(data, k))))
    : undefined;
  const rightDomain = right
    ? _.uniq(_.flattenDeep(right.dataKey.map(k => extractPrimitivesFromArray(data, k))))
    : undefined;
  const bottomDomain = bottom
    ? _.uniq(_.flattenDeep(bottom.dataKey.map(k => extractPrimitivesFromArray(data, k))))
    : undefined;
  const leftDomain = left
    ? _.uniq(_.flattenDeep(left.dataKey.map(k => extractPrimitivesFromArray(data, k))))
    : undefined;

  const topA = top ? { ...top, domain: topDomain } : undefined;
  const rightA = right ? { ...right, domain: rightDomain } : undefined;
  const bottomA = bottom ? { ...bottom, domain: bottomDomain } : undefined;
  const leftA = left ? { ...left, domain: leftDomain } : undefined;

  const c = {
    type: Charts.LINE_CHART,
    layout,
  };

  const hr: LineChartMetadata = {
    ...c,
    index: bottom?.dataKey[0] ?? top?.dataKey[0],
    collection: left?.dataKey ?? [],
    overlay: right?.dataKey ?? [],
  };

  const vr = {
    ...c,
    index: left?.dataKey[0] ?? right?.dataKey[0],
    collection: bottom?.dataKey ?? [],
    overlay: top?.dataKey ?? [],
  };

  console.log('data:', layout === CartesianChartLayout.HORIZONTAL ? hr : vr);

  return (
    // <CartesianBase />
    <div>
      {JSON.stringify({
        topA,
        rightA,
        bottomA,
        leftA,
      })}

    </div>
  );
};

LineChart.displayName = 'LineChart';
