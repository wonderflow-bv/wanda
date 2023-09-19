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

import { curveBasis } from '@visx/curve';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';

import { CartesianChartLayout, Data } from '../../../types';
import { Axis } from '../../cartesian-base/cartesian-base';
import { LineChartMetadata } from '../../line-chart/line-chart';

export type LinesProps = {
  data: Data;
  metadata: LineChartMetadata;
  topPosition: number;
  leftPosition: number;
  top?: Axis;
  right?: Axis;
  bottom?: Axis;
  left?: Axis;
}

export const Lines = ({
  data,
  metadata,
  topPosition: tPos,
  leftPosition: lPos,
  top,
  right,
  bottom,
  left,
}: LinesProps) => {
  const { index, collection, layout } = metadata;

  const isHorizontal = layout === CartesianChartLayout.HORIZONTAL;
  const hasIndex = isHorizontal ? Boolean(bottom ?? top) : Boolean(left ?? right);
  const hasCollection = isHorizontal ? (left ?? right) : (bottom ?? top);

  const accessor = (axis: Axis, dataKey: string, d?: Record<string, unknown>) => {
    let value = 0;
    if (axis.scale && d && d[dataKey]) {
      const t = axis.scaleType === 'time' ? new Date(d[dataKey] as string | number) : d[dataKey];
      value = axis.scale(t as any) ?? 0;
    }

    return value;
  };

  if (!(hasIndex && hasCollection)) return null;

  return (
    <Group top={tPos} left={lPos}>
      <LinePath
        data={data}
        curve={curveBasis}
        x={(d: Record<string, unknown>) => accessor(bottom!, index, d)}
        y={(d: Record<string, unknown>) => accessor(left!, collection[0], d)}
        stroke="#cf1c1c"
        strokeWidth={1.5}
        strokeOpacity={0.8}
        strokeDasharray="1,2"
      />
    </Group>
  );
};

Lines.displayName = 'Lines';
