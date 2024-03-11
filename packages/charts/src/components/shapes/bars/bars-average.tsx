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

import { Label } from '@visx/annotation';
import { Group } from '@visx/group';
import { Line } from '@visx/shape';

import { useAverage } from '../../../hooks';
import {
  useLayoutContext, useStyleConfigContext, useThemeContext,
} from '../../../providers';

export const BarsAverage: React.FC = () => {
  const theme = useThemeContext();
  const { themes } = useStyleConfigContext();
  const { isHorizontal } = useLayoutContext();
  const {
    averageSeries,
    averageOverlay,
    hasAverageSeries,
    hasAverageOverlay,
    hasAverageOverlayLabel,
    hasAverageSeriesLabel,
    coordinates,
    style,
  } = useAverage();

  const {
    backgroundPadding,
    backgroundProps,
    maxLabelWidth,
    opacity,
    pointerEvents,
    strokeDasharray,
    strokeWidth,
    titleFontSize,
    titleFontWeight,
    titleProps,
  } = style;

  return (
    <Group>
      {hasAverageSeries && (
        <Line
          from={coordinates.series.from}
          to={coordinates.series.to}
          stroke={themes[theme].lines.average}
          strokeWidth={strokeWidth}
          pointerEvents={pointerEvents}
          strokeDasharray={strokeDasharray}
          opacity={opacity}
        />
      )}

      {hasAverageOverlay && (
        <Line
          from={coordinates.overlay.from}
          to={coordinates.overlay.to}
          stroke={themes[theme].lines.average}
          strokeWidth={strokeWidth}
          pointerEvents={pointerEvents}
          strokeDasharray={strokeDasharray}
          opacity={opacity}
        />
      )}

      {hasAverageSeriesLabel && (
        <Label
          backgroundFill={themes[theme].lines.average}
          x={coordinates.series.label.x}
          y={coordinates.series.label.y}
          fontColor={themes[theme].lines.averageFontColor}
          title={`Average: ${averageSeries}`}
          titleFontSize={titleFontSize}
          titleFontWeight={titleFontWeight}
          titleProps={titleProps}
          showAnchorLine={false}
          horizontalAnchor={isHorizontal ? 'start' : 'middle'}
          verticalAnchor="middle"
          showBackground
          backgroundPadding={backgroundPadding}
          backgroundProps={backgroundProps}
          maxWidth={maxLabelWidth}
        />
      )}

      {hasAverageOverlayLabel && (
        <Label
          backgroundFill={themes[theme].lines.average}
          x={coordinates.overlay.label.x}
          y={coordinates.overlay.label.y}
          fontColor={themes[theme].lines.averageFontColor}
          title={`Average: ${averageOverlay}`}
          titleFontSize={titleFontSize}
          titleFontWeight={titleFontWeight}
          titleProps={titleProps}
          showAnchorLine={false}
          horizontalAnchor={isHorizontal ? 'end' : 'middle'}
          verticalAnchor="middle"
          showBackground
          backgroundPadding={backgroundPadding}
          backgroundProps={backgroundProps}
          maxWidth={maxLabelWidth}
        />
      )}
    </Group>
  );
};

BarsAverage.displayName = 'BarsAverage';
