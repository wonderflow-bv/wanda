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

import { Label } from '@visx/annotation';
import { Group } from '@visx/group';
import { Line } from '@visx/shape';
import { LineChartMetadata } from 'packages/charts/src/types';
import { useMemo } from 'react';

import {
  useCartesianContext, useDataContext, useLayoutContext, useStyleConfigContext, useThemeContext,
} from '../../../providers';

export type Point = { x: number; y: number };
export type LinePoints = { from: Point; to: Point }

export const LinesAverage: React.FC = () => {
  const theme = useThemeContext();
  const { lines: defaultStyle, themes } = useStyleConfigContext();
  const {
    // data,
    metadata,
  } = useDataContext();
  const { isHorizontal } = useLayoutContext();
  const {
    dimension,
  } = useCartesianContext();

  const { showAverage } = metadata! as LineChartMetadata;
  const { maxHeight, maxWidth } = dimension;
  const {
    strokeDasharray, strokeWidth, pointerEvents, opacity,
  } = defaultStyle.average;

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
            stroke={themes[theme].lines.average}
            strokeWidth={strokeWidth}
            pointerEvents={pointerEvents}
            strokeDasharray={strokeDasharray}
            opacity={opacity}
          />
          <Label
            backgroundFill="grey"
            x={coordinates.from.x + 4}
            y={coordinates.from.y}
            fontColor="white"
            title="Average: number"
            titleFontSize={14}
            titleFontWeight={400}
            titleProps={undefined}
            showAnchorLine={false}
            horizontalAnchor="start"
            verticalAnchor="middle"
            showBackground
            backgroundPadding={4}
            backgroundProps={{ rx: 4 }}
          />
        </Group>
      )}
    </>
  );
};

LinesAverage.displayName = 'LinesAverage';
