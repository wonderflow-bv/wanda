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
import { ScaleBand, ScaleLinear, ScaleTime } from '@visx/vendor/d3-scale';

import { CartesianChartLayout, Data } from '../../../types';
import { LineChartMetadata } from '../../line-chart/line-chart';

type Scales = ScaleBand<string> | ScaleLinear<number, number> | ScaleTime<number, number>;

export type LinesProps = {
  data: Data;
  metadata: LineChartMetadata;
  topPosition: number;
  leftPosition: number;
  topScale?: Scales;
  rightScale?: Scales;
  bottomScale?: Scales;
  leftScale?: Scales;
}

export const Lines = ({
  data,
  metadata,
  topPosition: tPos,
  leftPosition: lPos,
  topScale,
  rightScale,
  bottomScale,
  leftScale,
}: LinesProps) => {
  const isHorizontal = metadata.layout === CartesianChartLayout.HORIZONTAL;
  console.log(isHorizontal, topScale, rightScale);
  return (
    <Group top={tPos} left={lPos}>
      <LinePath
        data={data}
        curve={curveBasis}
        x={(d: any) => (bottomScale ? bottomScale(new Date(d.date) as any) as any : 0)}
        y={(d: any) => (leftScale ? leftScale(d.value) as any : 0)}
        stroke="#cf1c1c"
        strokeWidth={1.5}
        strokeOpacity={0.8}
        strokeDasharray="1,2"
      />
    </Group>
  );
};

Lines.displayName = 'Lines';
