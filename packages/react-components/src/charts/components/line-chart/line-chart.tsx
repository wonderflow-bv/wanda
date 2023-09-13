import { curveBasis } from '@visx/curve';
import { LinePath } from '@visx/shape';

import { extractDataFromArray } from '../../utils';
import { AxisProps } from '../cartesian-base';

export type LineChartProps = {
  data: Array<Record<string, unknown>>;
  top?: AxisProps;
  right?: AxisProps;
  bottom?: AxisProps;
  left?: AxisProps;
}

export const LineChart = ({
  data,
  top,
  right,
  bottom,
  left,
}: LineChartProps) => {
  const topA: any = top ? { ...top, domain: extractDataFromArray(data, top.dataKey as string) } : undefined;
  const rightA: any = right ? { ...right, domain: extractDataFromArray(data, right.dataKey as string) } : undefined;
  const bottomA: any = bottom ? { ...bottom, domain: extractDataFromArray(data, bottom.dataKey as string) } : undefined;
  const leftA: any = left ? { ...left, domain: extractDataFromArray(data, left.dataKey as string) } : undefined;

  console.log('y axis:', topA);
  console.log('y axis:', rightA);
  console.log('x axis:', bottomA);
  console.log('y axis:', leftA);

  return (

    <LinePath
      data={data}
      curve={curveBasis}
      x={(d: any) => d.date ?? 0}
      y={(d: any) => d.value ?? 0}
      stroke="#cd1313"
      strokeWidth={1.5}
      strokeOpacity={0.8}
      strokeDasharray="1,2"
    />
  );
};

LineChart.displayName = 'LineChart';
