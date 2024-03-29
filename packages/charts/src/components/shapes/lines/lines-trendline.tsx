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
import { Line } from '@visx/shape';
import _ from 'lodash';
import { useCallback } from 'react';

import { useTrendline } from '@/hooks';

import {
  useCartesianContext,
} from '../../../providers';
import { TrendlineType } from '../../../types';
import {
  LinesItem, LinesItemBlurred,
} from './lines.module.css';

export const LinesTrendline: React.FC = () => {
  const { hoveredLegendItem: overLegend } = useCartesianContext();
  const {
    series,
    overlay,
    seriesAxis,
    overlayAxis,
    hasTrendlineSeries,
    hasTrendlineOverlay,
    getCoordinates,
    style,
  } = useTrendline();

  const {
    opacity,
    pointerEvents,
    strokeDasharray,
    strokeWidth,
  } = style;

  const dynamicClassName = useCallback((overLegend: string, dataKey: string) => ((overLegend === dataKey || overLegend === '')
    ? LinesItem
    : LinesItemBlurred), []);

  return (
    <Group>
      {hasTrendlineSeries && series.trendline!.map((t: TrendlineType, i: number) => {
        const from = seriesAxis?.scale(t.from as any) ?? 0;
        const to = seriesAxis?.scale(t.to as any) ?? 0;

        const coordinates = getCoordinates(from, to);

        return (
          <Line
            key={_.uniqueId()}
            className={dynamicClassName(overLegend, series.dataKey[i])}
            from={coordinates.from}
            to={coordinates.to}
            stroke={series.colors[i]}
            strokeWidth={strokeWidth}
            pointerEvents={pointerEvents}
            strokeDasharray={strokeDasharray}
            opacity={opacity}
          />
        );
      })}

      {hasTrendlineOverlay && overlay.trendline!.map((t: TrendlineType, i: number) => {
        const from = overlayAxis?.scale(t.from as any) ?? 0;
        const to = overlayAxis?.scale(t.to as any) ?? 0;

        const coordinates = getCoordinates(from, to);

        return (
          <Line
            key={_.uniqueId()}
            className={dynamicClassName(overLegend, overlay.dataKey![i])}
            from={coordinates.from}
            to={coordinates.to}
            stroke={overlay.colors![i]}
            strokeWidth={strokeWidth}
            pointerEvents={pointerEvents}
            strokeDasharray={strokeDasharray}
            opacity={opacity}
          />
        );
      })}
    </Group>
  );
};

LinesTrendline.displayName = 'LinesTrendline';
