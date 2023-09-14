import { Except } from 'type-fest';

import { extractDataFromArray } from '../../utils';
import { AxisProps } from '../cartesian-base';

export type Data = Array<Record<string, unknown>>;
export type DataCollection = unknown[][]

export type LineChartProps = {
  data: Data;
  collection: string[];
  top?: Except<AxisProps, 'domain'> & { dataKey: string };
  right?: Except<AxisProps, 'domain'> & { dataKey: string };
  bottom?: Except<AxisProps, 'domain'> & { dataKey: string };
  left?: Except<AxisProps, 'domain'> & { dataKey: string };
}

export const LineChart = ({
  data,
  collection,
  top,
  right,
  bottom,
  left,
}: LineChartProps) => {
  const dataC: DataCollection = collection.map(k => extractDataFromArray(data, k));
  const topA: any = top ? { ...top, domain: extractDataFromArray(data, top.dataKey) } : undefined;
  const rightA: any = right ? { ...right, domain: extractDataFromArray(data, right.dataKey) } : undefined;
  const bottomA: any = bottom ? { ...bottom, domain: extractDataFromArray(data, bottom.dataKey) } : undefined;
  const leftA: any = left ? { ...left, domain: extractDataFromArray(data, left.dataKey) } : undefined;

  return (
    // <CartesianBase />
    <div>
      {JSON.stringify({
        dataCollection: dataC,
        topA,
        rightA,
        bottomA,
        leftA,
      })}

    </div>
  );
};

LineChart.displayName = 'LineChart';
