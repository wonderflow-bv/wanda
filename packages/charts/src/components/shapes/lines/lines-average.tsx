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
import _ from 'lodash';
import { useMemo } from 'react';

import {
  useCartesianContext, useDataContext, useLayoutContext, useStyleConfigContext, useThemeContext,
} from '../../../providers';
import { Data, LineChartMetadata } from '../../../types';
import { getPrimitiveFromObjectByPath } from '../../../utils';

export const LinesAverage: React.FC = () => {
  const theme = useThemeContext();
  const { lines: defaultStyle, themes } = useStyleConfigContext();
  const { data, metadata } = useDataContext();
  const { isHorizontal } = useLayoutContext();
  const { axis, dimension } = useCartesianContext();

  const {
    top, right, bottom, left,
  } = axis!;

  const seriesAxis = isHorizontal ? left : bottom;
  const overlayAxis = isHorizontal ? right : top;

  const { showAverage, series, overlay } = metadata! as LineChartMetadata;

  const { maxHeight, maxWidth } = dimension;

  const {
    strokeDasharray,
    strokeWidth,
    pointerEvents,
    opacity,
  } = defaultStyle.average;

  const computeAverage = (
    data: Data,
    dataKeys: string[],
  ) => {
    const dataKey = dataKeys.map((k: string) => ({
      name: k,
      average: _.mean(data
        .map(d => getPrimitiveFromObjectByPath(d, k))
        .filter((d): d is number => typeof d === 'number')),
    }));

    const all = _.mean(dataKey.map(k => k.average));

    return { average: all, dataKey };
  };

  const averageSeries = useMemo(() => computeAverage(data, series.dataKey),
    [data, series.dataKey]);

  const averageOverlay = useMemo(() => (overlay.dataKey
    ? computeAverage(data, [overlay.dataKey])
    : undefined),
  [data, overlay.dataKey]);

  const averageSeriesScale = seriesAxis!.scale(averageSeries.average as any) ?? 0;
  const averageOverlayScale = (overlayAxis && averageOverlay) ? overlayAxis.scale(averageOverlay.average as any) : 0;

  const hasAverageSeries = Boolean(showAverage && averageSeries);
  const hasAverageOverlay = Boolean(showAverage && averageOverlay);

  const coordinates = useMemo(() => (isHorizontal
    ? {
      series: {
        from: { x: 0, y: averageSeriesScale },
        to: { x: maxWidth, y: averageSeriesScale },
        label: { x: 4, y: averageSeriesScale },
      },
      overlay: {
        from: { x: 0, y: averageOverlayScale },
        to: { x: maxWidth, y: averageOverlayScale },
        label: { x: maxWidth - 4, y: averageOverlayScale },
      },
    }
    : {
      series: {
        from: { x: averageSeriesScale, y: 0 },
        to: { x: averageSeriesScale, y: maxHeight },
        label: { x: averageSeriesScale, y: maxHeight - 16 },
      },
      overlay: {
        from: { x: averageOverlayScale ?? 0, y: 0 },
        to: { x: averageOverlayScale ?? 0, y: maxHeight },
        label: { x: averageOverlayScale, y: 16 },
      },
    }), [isHorizontal, averageSeriesScale, maxWidth, averageOverlayScale, maxHeight]);

  const formatAverage = (value: number) => value.toFixed(2);

  return (
    <>
      {hasAverageSeries && (
        <Group>
          <Line
            from={coordinates.series.from}
            to={coordinates.series.to}
            stroke={themes[theme].lines.average}
            strokeWidth={strokeWidth}
            pointerEvents={pointerEvents}
            strokeDasharray={strokeDasharray}
            opacity={opacity}
          />
          <Label
            backgroundFill="grey"
            x={coordinates.series.label.x}
            y={coordinates.series.label.y}
            fontColor="white"
            title={`Average: ${formatAverage(averageSeries.average)}`}
            titleFontSize={14}
            titleFontWeight={400}
            titleProps={undefined}
            showAnchorLine={false}
            horizontalAnchor={isHorizontal ? 'start' : 'middle'}
            verticalAnchor="middle"
            showBackground
            backgroundPadding={4}
            backgroundProps={{ rx: 4 }}
          />
        </Group>
      )}

      {hasAverageOverlay && (
        <Group>
          <Line
            from={coordinates.overlay.from}
            to={coordinates.overlay.to}
            stroke={themes[theme].lines.average}
            strokeWidth={strokeWidth}
            pointerEvents={pointerEvents}
            strokeDasharray={strokeDasharray}
            opacity={opacity}
          />
          <Label
            backgroundFill="grey"
            x={coordinates.overlay.label.x}
            y={coordinates.overlay.label.y}
            fontColor="white"
            title={`Average: ${formatAverage(averageOverlay!.average)}`}
            titleFontSize={14}
            titleFontWeight={400}
            titleProps={undefined}
            showAnchorLine={false}
            horizontalAnchor={isHorizontal ? 'end' : 'middle'}
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
