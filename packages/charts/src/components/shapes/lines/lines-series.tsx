/* eslint-disable @typescript-eslint/naming-convention */
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
import { useMemo } from 'react';

import { useLayoutContext } from '../../../providers';
import { useCartesianContext } from '../../../providers/cartesian';
import { useDataContext } from '../../../providers/data';
import { useThemeContext } from '../../../providers/theme';
import { colorPaletteNeutrals } from '../../../style-config';
import {
  getCoordinates, getLinesRenderer,
} from '../../../utils';
import {
  LinesItem,
} from './lines.module.css';

export const LinesSeries: React.FC = () => {
  const theme = useThemeContext();
  const { data, metadata } = useDataContext();
  const { isHorizontal } = useLayoutContext();
  const { axis } = useCartesianContext();

  const { bottom, left } = axis;
  const {
    index, renderAs, showMarker, showMarkerLabel, series,
  } = metadata!;

  const indexAxis = isHorizontal ? bottom! : left!;
  const seriesAxis = isHorizontal ? left! : bottom!;

  const renderer = useMemo(() => getLinesRenderer(renderAs, isHorizontal), [isHorizontal, renderAs]);

  const getSeriesCoordinates = (
    datum: Record<string, unknown>,
    dataKey: string,
    isHorizontal: boolean,
  ) => getCoordinates({
    datum,
    indexAxis,
    indexDataKey: index,
    otherAxis: seriesAxis,
    otherDataKey: dataKey,
    isHorizontal,
  });

  return (
    <>
      {series.dataKey.map((k: string, i: number) => (
        <Group
          key={`${k}-lines-series`}
          className={LinesItem}
        >
          <LinePath
            data={data}
            curve={renderer}
            x={d => getSeriesCoordinates(d, k, isHorizontal).x as any}
            y={d => getSeriesCoordinates(d, k, isHorizontal).y as any}
            stroke={series.colors[i]}
            strokeWidth={series.style?.[i]?.strokeWidth ?? 2}
            strokeOpacity={series.style?.[i]?.strokeOpacity ?? 1}
            strokeDasharray={series.style?.[i]?.strokeDasharray}
          />

          {(showMarker
            || showMarkerLabel
            || series.style?.[i]?.showMarker
            || series.style?.[i]?.showMarkerLabel
          ) && data.map((d: Record<string, any>) => (
            <circle
              key={JSON.stringify(d)}
              r={2}
              cx={getSeriesCoordinates(d, k, isHorizontal).x}
              cy={getSeriesCoordinates(d, k, isHorizontal).y}
              stroke={series.colors[i]}
              fill={theme === 'light' ? colorPaletteNeutrals.white : colorPaletteNeutrals.black}
              strokeWidth={series.style?.[i]?.strokeWidth ?? 1}
              strokeOpacity={series.style?.[i]?.strokeOpacity ?? 1}
            />
          ))}
        </Group>
      ))}
    </>
  );
};

LinesSeries.displayName = 'LinesSeries';
