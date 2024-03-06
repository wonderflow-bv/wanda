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
import { LinePath } from '@visx/shape';
import _ from 'lodash';
import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import { useLines } from '@/hooks';

import {
  useCartesianContext,
  useStyleConfigContext, useThemeContext,
} from '../../../providers';
import {
  createSubPaths,
  getValueFromObjectByPath,
} from '../../../utils';
import {
  LinesItem, LinesItemBlurred,
} from './lines.module.css';

export const LinesOverlay: React.FC = () => {
  const theme = useThemeContext();
  const { lines: defaultStyle, themes } = useStyleConfigContext();
  const { hoveredLegendItem: overLegend } = useCartesianContext();

  const {
    getOverlayCoordinates,
    hasOverlay,
    hideMissingDataConnection,
    isHorizontal,
    overlay,
    renderer,
    showMarker,
    showMarkerLabel,
    updatedData,
  } = useLines();

  const dynamicClassName = useCallback((overLegend: string, dataKey: string) => ((overLegend === dataKey || overLegend === '')
    ? LinesItem
    : LinesItemBlurred), []);

  if (!hasOverlay) return null;

  return (
    <>
      {overlay.dataKey!.map((dataKey: string, di: number) => {
        const subPaths = createSubPaths(
          updatedData,
          d => _.isNil(getValueFromObjectByPath(d, dataKey)),
        );

        const hasMarker = Boolean(showMarker
          || showMarkerLabel
          || overlay.style?.[di]?.showMarker
          || overlay.style?.[di]?.showMarkerLabel);

        const segmentStroke = hideMissingDataConnection ? 'transparent' : themes[theme].lines.noData;

        return (
          subPaths.map((subPathData: Array<Record<string, unknown>>,
            si: number) => (
              <Group
                key={uuid()}
                className={dynamicClassName(overLegend, dataKey)}
              >
                <LinePath
                  data-testid="lines-overlay"
                  data={subPathData}
                  curve={renderer}
                  x={datum => getOverlayCoordinates(datum, dataKey, isHorizontal).x as any}
                  y={datum => getOverlayCoordinates(datum, dataKey, isHorizontal).y as any}
                  stroke={si % 2 === 0
                    ? overlay.colors?.[di]
                    : segmentStroke}
                  strokeWidth={overlay.style?.[di]?.strokeWidth ?? defaultStyle.path.strokeWidth}
                  strokeOpacity={overlay.style?.[di]?.strokeOpacity ?? defaultStyle.path.strokeOpacity}
                  strokeDasharray={si % 2 === 0
                    ? overlay.style?.[di]?.strokeDasharray
                    : defaultStyle.segment.strokeDashArray}
                />

                {hasMarker && subPathData.map((d: Record<string, unknown>) => (
                  <circle
                    key={uuid()}
                    r={defaultStyle.marker.radius}
                    cx={getOverlayCoordinates(d, dataKey, isHorizontal).x}
                    cy={getOverlayCoordinates(d, dataKey, isHorizontal).y}
                    stroke={overlay.colors![di]}
                    fill={themes[theme].marker.fill}
                    strokeWidth={overlay.style?.[di]?.strokeWidth ?? defaultStyle.marker.strokeWidth}
                    strokeOpacity={overlay.style?.[di]?.strokeOpacity ?? defaultStyle.marker.strokeOpacity}
                  />
                ))}
              </Group>
          ))
        );
      })

      }
    </>
  );
};

LinesOverlay.displayName = 'LinesOverlay';
