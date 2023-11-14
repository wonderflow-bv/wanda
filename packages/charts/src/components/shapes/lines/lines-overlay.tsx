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
import { useMemo } from 'react';

import { useLayoutContext } from '../../../providers';
import { useCartesianContext } from '../../../providers/cartesian';
import { useDataContext } from '../../../providers/data';
import { useThemeContext } from '../../../providers/theme';
import { colorPaletteNeutrals, themes } from '../../../style-config';
import {
  createSubPaths,
  getCoordinates, getLinesRenderer, getValueFromObjectPath,
} from '../../../utils';
import {
  LinesItem,
} from './lines.module.css';

export const LinesOverlay: React.FC = () => {
  const theme = useThemeContext();
  const { data, metadata } = useDataContext();
  const { isHorizontal } = useLayoutContext();
  const { axis } = useCartesianContext();

  const {
    top, right, bottom, left,
  } = axis;
  const {
    index, renderAs, showMarker, showMarkerLabel, overlay,
    hideMissingDataConnection,
  } = metadata!;

  const indexAxis = isHorizontal ? bottom! : left!;
  const overlayAxis = isHorizontal ? right : top;

  const hasOverlay = Boolean(overlayAxis && overlay.dataKey);

  const noDataSegmentStyle = {
    stroke: hideMissingDataConnection ? 'transparent' : themes[theme].lines.noData,
    strokeDashArray: '2 3',
  };

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
    d => hasOverlay && _.isNil(getValueFromObjectPath(d, overlay.dataKey!)),
  ), [data, hasOverlay, overlay.dataKey]);

  return (
    <>
      {hasOverlay && (
        subPaths.map((data: Array<Record<string, any>>, i: number) => (

          <Group className={LinesItem} key={JSON.stringify(data)}>
            <LinePath
              data={data}
              curve={renderer}
              x={d => getOverlayCoordinates(d, overlay.dataKey!, isHorizontal).x as any}
              y={d => getOverlayCoordinates(d, overlay.dataKey!, isHorizontal).y as any}
              stroke={i % 2 === 0 ? overlay.color : noDataSegmentStyle.stroke}
              strokeWidth={overlay.style?.strokeWidth ?? 2}
              strokeOpacity={overlay.style?.strokeOpacity ?? 1}
              strokeDasharray={i % 2 === 0 ? overlay.style?.strokeDasharray : noDataSegmentStyle.strokeDashArray}
            />

            {(showMarker
            || showMarkerLabel
            || overlay.style?.showMarker
            || overlay.style?.showMarkerLabel
            ) && data.map((d: Record<string, any>) => (
              <circle
                key={JSON.stringify(d)}
                r={2}
                cx={getOverlayCoordinates(d, overlay.dataKey!, isHorizontal).x}
                cy={getOverlayCoordinates(d, overlay.dataKey!, isHorizontal).y}
                stroke={overlay.color}
                fill={theme === 'light' ? colorPaletteNeutrals.white : colorPaletteNeutrals.black}
                strokeWidth={overlay.style?.strokeWidth ?? 1}
                strokeOpacity={overlay.style?.strokeOpacity ?? 1}
              />
            ))}
          </Group>
        ))
      )}
    </>
  );
};

LinesOverlay.displayName = 'LinesOverlay';
