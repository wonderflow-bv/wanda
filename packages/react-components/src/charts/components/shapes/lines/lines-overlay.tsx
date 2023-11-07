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

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/naming-convention */
// @ts-nocheck

import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { useMemo } from 'react';

import { colorPaletteNeutrals } from '../../../style-config';
import {
  AxisType, CartesianChartLayout, Data, ThemeVariants,
} from '../../../types';
import {
  getCoordinates, getLinesRenderer,
} from '../../../utils';
import { LineChartMetadata } from '../../line-chart/line-chart';
import {
  LinesItem,
} from './lines.module.css';

export type LinesOverlayProps = {
  theme: ThemeVariants;
  data: Data;
  metadata: LineChartMetadata;
  axis: {
    top?: AxisType;
    right?: AxisType;
    bottom?: AxisType;
    left?: AxisType;
  };
}

export const LinesOverlay = ({
  theme,
  data,
  metadata,
  axis,
}: LinesOverlayProps) => {
  const {
    top, right, bottom, left,
  } = axis;
  const {
    index, renderAs, layout, showMarker, showMarkerLabel, overlay,
  } = metadata;

  const isHorizontal = layout === CartesianChartLayout.HORIZONTAL;

  const indexAxis = isHorizontal ? bottom! : left!;
  const overlayAxis = isHorizontal ? right : top;

  const hasOverlay = Boolean(overlayAxis && overlay.dataKey);

  const renderer = useMemo(() => getLinesRenderer(renderAs, isHorizontal), [isHorizontal, renderAs]);

  const getOverlayCoordinates = (
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
  });

  return (
    <>
      {hasOverlay && (
        <Group className={LinesItem}>
          <LinePath
            data={data}
            curve={renderer}
            x={d => getOverlayCoordinates(d, overlay.dataKey!, isHorizontal).x as any}
            y={d => getOverlayCoordinates(d, overlay.dataKey!, isHorizontal).y as any}
            stroke={overlay.color}
            strokeWidth={overlay.style?.strokeWidth ?? 2}
            strokeOpacity={overlay.style?.strokeOpacity ?? 1}
            strokeDasharray={overlay.style?.strokeDasharray}
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
      )}

    </>
  );
};

LinesOverlay.displayName = 'LinesOverlay';
