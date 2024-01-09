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
import { LinePath } from '@visx/shape';
import _ from 'lodash';
import { LineChartMetadata } from 'packages/charts/src/types';
import { useCallback, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import {
  useCartesianContext, useDataContext, useLayoutContext, useStyleConfigContext, useThemeContext,
} from '../../../providers';
import {
  createSubPaths,
  getCoordinates, getLinesRenderer, getValueFromObjectByPath,
} from '../../../utils';
import {
  LinesItem, LinesItemBlurred,
} from './lines.module.css';

export const LinesOverlay: React.FC = () => {
  const theme = useThemeContext();
  const { lines: defaultStyle, themes } = useStyleConfigContext();
  const { data, metadata } = useDataContext();
  const { isHorizontal } = useLayoutContext();
  const { axis, overLegend } = useCartesianContext();

  const {
    index, renderAs, showMarker, showMarkerLabel, overlay,
    hideMissingDataConnection,
  } = metadata! as LineChartMetadata;

  const indexAxis = isHorizontal ? axis!.bottom! : axis!.left!;
  const overlayAxis = isHorizontal ? axis?.right : axis?.top;

  const hasOverlay = Boolean(overlayAxis && overlay.dataKey);

  const renderer = useMemo(() => getLinesRenderer(renderAs, isHorizontal), [isHorizontal, renderAs]);

  const getOverlayCoordinates = useMemo(() => (
    datum: Record<string, unknown>,
    dataKey: string,
    isHorizontal: boolean,
  ) => getCoordinates({
    datum,
    indexAxis,
    indexDataKey: index,
    otherAxis: overlayAxis!,
    otherDataKey: dataKey,
    isHorizontal,
  }), [index, indexAxis, overlayAxis]);

  const subPaths = useMemo(() => createSubPaths(
    data,
    d => hasOverlay && _.isNil(getValueFromObjectByPath(d, overlay.dataKey!)),
  ), [data, hasOverlay, overlay.dataKey]);

  const hasMarker = Boolean(showMarker
  || showMarkerLabel
  || overlay.style?.showMarker
  || overlay.style?.showMarkerLabel);

  const segmentStroke = hideMissingDataConnection ? 'transparent' : themes[theme].lines.noData;

  const dynamicClassName = useCallback((overLegend: string, dataKey: string) => ((overLegend === dataKey || overLegend === '')
    ? LinesItem
    : LinesItemBlurred), []);

  return (
    <>
      {hasOverlay && (
        subPaths.map((subPathData: Array<Record<string, unknown>>, si: number) => (
          <Group
            key={uuid()}
            className={dynamicClassName(overLegend, overlay.dataKey!)}
          >
            <LinePath
              data-testid="lines-overlay"
              data={subPathData}
              curve={renderer}
              x={datum => getOverlayCoordinates(datum, overlay.dataKey!, isHorizontal).x as any}
              y={datum => getOverlayCoordinates(datum, overlay.dataKey!, isHorizontal).y as any}
              stroke={si % 2 === 0 ? overlay.color : segmentStroke}
              strokeWidth={overlay.style?.strokeWidth ?? defaultStyle.path.strokeWidth}
              strokeOpacity={overlay.style?.strokeOpacity ?? defaultStyle.path.strokeOpacity}
              strokeDasharray={si % 2 === 0 ? overlay.style?.strokeDasharray : defaultStyle.segment.strokeDashArray}
            />

            {hasMarker && subPathData.map((d: Record<string, unknown>) => (
              <circle
                key={uuid()}
                r={defaultStyle.marker.radius}
                cx={getOverlayCoordinates(d, overlay.dataKey!, isHorizontal).x}
                cy={getOverlayCoordinates(d, overlay.dataKey!, isHorizontal).y}
                stroke={overlay.color}
                fill={themes[theme].marker.fill}
                strokeWidth={overlay.style?.strokeWidth ?? defaultStyle.marker.strokeWidth}
                strokeOpacity={overlay.style?.strokeOpacity ?? defaultStyle.marker.strokeOpacity}
              />
            ))}
          </Group>
        ))
      )}
    </>
  );
};

LinesOverlay.displayName = 'LinesOverlay';
