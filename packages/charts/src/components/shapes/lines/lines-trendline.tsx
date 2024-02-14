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
import { useCallback } from 'react';

import {
  useCartesianContext, useDataContext, useLayoutContext, useStyleConfigContext,
} from '../../../providers';
import { LineChartMetadata, TrendlineType } from '../../../types';
import {
  LinesItem, LinesItemBlurred,
} from './lines.module.css';

export const LinesTrendline: React.FC = () => {
  const { lines: defaultStyle } = useStyleConfigContext();
  const { metadata } = useDataContext<LineChartMetadata>();
  const { isHorizontal } = useLayoutContext();
  const { axis, dimension, hoveredLegendItem: overLegend } = useCartesianContext();

  const {
    top, right, bottom, left,
  } = axis!;

  const seriesAxis = isHorizontal ? left : bottom;
  const overlayAxis = isHorizontal ? right : top;

  const { showTrendline, series, overlay } = metadata!;

  const { maxHeight, maxWidth } = dimension;

  const {
    opacity,
    pointerEvents,
    strokeDasharray,
    strokeWidth,
  } = defaultStyle.trendline;

  const trendlineSeries = series.trendline;
  const trendlineOverlay = overlay.trendline;

  const hasTrendlineSeries = Boolean(showTrendline && trendlineSeries?.length);
  const hasTrendlineOverlay = Boolean(showTrendline && trendlineOverlay?.length);

  const dynamicClassName = useCallback((overLegend: string, dataKey: string) => ((overLegend === dataKey || overLegend === '')
    ? LinesItem
    : LinesItemBlurred), []);

  const getCoordinates = useCallback((from: number, to: number) => (isHorizontal
    ? {
      from: {
        x: 0,
        y: from,
      },
      to: {
        x: maxWidth,
        y: to,
      },
    }
    : {
      from: {
        x: to,
        y: 0,
      },
      to: {
        x: from,
        y: maxHeight,
      },
    }), [isHorizontal, maxHeight, maxWidth]);

  return (
    <Group>
      {hasTrendlineSeries && series.trendline!.map((t: TrendlineType, i: number) => {
        const from = seriesAxis!.scale(t.from as any) ?? 0;
        const to = seriesAxis!.scale(t.to as any) ?? 0;

        const coordinates = getCoordinates(from, to);

        return (
          <Line
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
        const from = overlayAxis!.scale(t.from as any) ?? 0;
        const to = overlayAxis!.scale(t.to as any) ?? 0;

        const coordinates = getCoordinates(from, to);

        return (
          <Line
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
