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

import { useBars } from '@/hooks';

import { useLayoutContext } from '../../../providers';
import { BarsOverlay } from './bars-overlay';
import { BarsOverlayLabels } from './bars-overlay-labels';
import { BarsSeries } from './bars-series';
import { BarsSeriesLabels } from './bars-series-labels';
import { BarsStackOverlay } from './bars-stack-overlay';
import { BarsStackOverlayLabels } from './bars-stack-overlay-labels';
import { BarsStackSeries } from './bars-stack-series';
import { BarsStackSeriesLabels } from './bars-stack-series-labels';
import { BarsTrendline } from './bars-trendline';

export const BarsLayout: React.FC = () => {
  const { isHorizontal } = useLayoutContext();
  const { isStacked } = useBars();

  return (
    <Group data-testid="bars">
      <BarsTrendline />

      {isStacked
        ? (
          <>
            <BarsStackSeries data-testid="bars-stack-series" />
            <BarsStackSeriesLabels />
          </>
        )
        : (
          <>
            <BarsSeries data-testid="bars-series" />
            {isHorizontal && <BarsSeriesLabels />}
          </>
        )
                }

      {isStacked
        ? (
          <>
            <BarsStackOverlay data-testid="bars-overlay" />
            <BarsStackOverlayLabels />
          </>
        )
        : (
          <>
            <BarsOverlay data-testid="bars-overlay" />
            {isHorizontal && <BarsOverlayLabels />}
          </>
        )
                }
    </Group>
  );
};

BarsLayout.displayName = 'BarsLayout';
