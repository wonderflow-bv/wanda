/*
 * Copyright 2023-2024 Wonderflow Design Team
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

import { useBars, useSSR } from '@/hooks';

import { useCartesianContext, useLayoutContext } from '../../../providers';
import { BarsAverage } from './bars-average';
import { BarsLayout } from './bars-layout';
import { BarsOverlayLabels } from './bars-overlay-labels';
import { BarsSeriesLabels } from './bars-series-labels';
import { BarsTooltip } from './bars-tooltip';

export const Bars: React.FC = () => {
  const { isVertical } = useLayoutContext();
  const { position } = useCartesianContext();
  const { top, left } = position;
  const { isBrowser, isServer } = useSSR();
  const { isStacked } = useBars();

  return (
    <>
      <Group clipPath="url(#clip-path-cartesian-chart)">
        <Group
          top={top}
          left={left}
        >
          {isServer && <BarsLayout />}

          {isBrowser && (
            <BarsTooltip>
              <BarsLayout />
            </BarsTooltip>
          )}

          <BarsAverage />

        </Group>
      </Group>

      {(!isStacked && isVertical) && (
        <Group
          top={top}
          left={left}
        >
          <BarsSeriesLabels />
          <BarsOverlayLabels />
        </Group>
      )}
    </>
  );
};

Bars.displayName = 'Bars';
