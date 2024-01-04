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
import { Line } from '@visx/shape';
import { LineChartMetadata } from 'packages/charts/src/types';
import { useMemo } from 'react';

import {
  useCartesianContext, useDataContext, useLayoutContext,
} from '../../../providers';

export type Point = { x: number; y: number };
export type LinePoints = { from: Point; to: Point }

export const LinesAverage: React.FC = () => {
  // const theme = useThemeContext();
  // const { lines: defaultStyle, themes } = useStyleConfigContext();
  const {
    // data,
    metadata,
  } = useDataContext();
  const { isHorizontal } = useLayoutContext();
  const {
    // axis,
    dimension,
  } = useCartesianContext();

  const { showAverage } = metadata! as LineChartMetadata;
  const { maxHeight, maxWidth } = dimension;

  const coordinates = useMemo(() => (isHorizontal
    ? {
      from: { x: 0, y: 100 },
      to: { x: maxWidth, y: 100 },
    }
    : {
      from: { x: 100, y: 0 },
      to: { x: 100, y: maxHeight },
    }), [maxHeight, maxWidth, isHorizontal]);

  return (
    <>
      {showAverage && (
        <Group>
          <Line
            from={coordinates.from}
            to={coordinates.to}
            stroke="red"
            strokeWidth={2}
            pointerEvents="none"
            strokeDasharray="5,2"
          />
        </Group>
      )}
    </>
  );
};

LinesAverage.displayName = 'LinesAverage';
