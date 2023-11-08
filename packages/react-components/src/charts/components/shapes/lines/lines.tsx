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

import { Group } from '@visx/group';

import {
  AxisType,
  Data, ThemeVariants,
} from '../../../types';
import { LineChartMetadata } from '../../line-chart/line-chart';
import {
  LinesItemGroup,
} from './lines.module.css';
import { LinesMarkerLabels } from './lines-marker-labels';
import { LinesOverlay } from './lines-overlay';
import { LinesSeries } from './lines-series';
import { LinesTooltip } from './lines-tooltip';

export type LinesProps = {
  theme: ThemeVariants;
  data: Data;
  metadata: LineChartMetadata;
  topPosition: number;
  leftPosition: number;
  maxWidth: number;
  maxHeight: number;
  axis: {
    top?: AxisType;
    right?: AxisType;
    bottom?: AxisType;
    left?: AxisType;
  };
}

export const Lines = ({
  theme,
  data,
  metadata,
  topPosition: tPos,
  leftPosition: lPos,
  maxWidth: xMax,
  maxHeight: yMax,
  axis,
}: LinesProps) => (
  <Group
    top={tPos}
    left={lPos}
  >
    <Group className={LinesItemGroup}>
      <LinesOverlay
        theme={theme}
        data={data}
        metadata={metadata}
        axis={axis}
      />

      <LinesSeries
        theme={theme}
        data={data}
        metadata={metadata}
        axis={axis}
      />
    </Group>

    <LinesTooltip
      theme={theme}
      data={data}
      metadata={metadata}
      axis={axis}
      maxWidth={xMax}
      maxHeight={yMax}
    />

    <LinesMarkerLabels
      theme={theme}
      data={data}
      metadata={metadata}
      axis={axis}
      maxWidth={xMax}
      maxHeight={yMax}
    />
  </Group>
);

Lines.displayName = 'Lines';
