import { Except } from 'type-fest';

import { extractDataFromArray } from '../../utils';
import { AxisProps } from '../cartesian-base';

export type Data = Array<Record<string, unknown>>;
export type DataCollection = unknown[][]

export type LineChartProps = {
  data: Data;
  top?: Except<AxisProps, 'domain'> & { dataKey: [string] };
  right?: Except<AxisProps, 'domain'> & { dataKey: [string] };
  bottom?: Except<AxisProps, 'domain'> & { dataKey: [string] };
  left?: Except<AxisProps, 'domain'> & { dataKey: [string] };
}

export const LineChart = ({
  data,
  top,
  right,
  bottom,
  left,
}: LineChartProps) => {
  // for every axis, for every group of dataKey: find min/max value to set domain

  const topA: any = top ? { ...top, domain: extractDataFromArray(data, top.dataKey[0]) } : undefined;
  const rightA: any = right ? { ...right, domain: extractDataFromArray(data, right.dataKey[0]) } : undefined;
  const bottomA: any = bottom ? { ...bottom, domain: extractDataFromArray(data, bottom.dataKey[0]) } : undefined;
  const leftA: any = left ? { ...left, domain: extractDataFromArray(data, left.dataKey[0]) } : undefined;

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
