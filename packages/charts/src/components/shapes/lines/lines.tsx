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

import { useCartesianContext } from '../../../providers/cartesian';
import { LinesAverage } from './lines-average';
import { LinesMarkerLabels } from './lines-marker-labels';
import { LinesOverlay } from './lines-overlay';
import { LinesSeries } from './lines-series';
import { LinesTooltip } from './lines-tooltip';

export const Lines: React.FC = () => {
  const { position } = useCartesianContext();
  return (
    <Group
      top={position.top}
      left={position.left}
    >
      <Group data-testid="lines">
        <LinesSeries />
        <LinesOverlay />
        <LinesAverage />
      </Group>

      <LinesTooltip />

      <LinesMarkerLabels />

    </Group>
  );
};

Lines.displayName = 'Lines';
