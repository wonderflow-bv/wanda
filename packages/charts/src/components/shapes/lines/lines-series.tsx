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
import { v4 as uuid } from 'uuid';

import {
  useCartesianContext, useDataContext, useLayoutContext, useThemeContext,
} from '../../../providers';
import { themes } from '../../../style-config';
import {
  createSubPaths,
  getCoordinates, getLinesRenderer, getValueFromObjectPath,
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
    index, renderAs, showMarker, showMarkerLabel,
    series, hideMissingDataConnection,
  } = metadata!;

  const indexAxis = isHorizontal ? bottom! : left!;
  const seriesAxis = isHorizontal ? left! : bottom!;

  const defaultStyle = useMemo(() => ({
    path: {
      strokeWidth: 2,
      strokeOpacity: 1,
    },
    segment: {
      stroke: hideMissingDataConnection ? 'transparent' : themes[theme].lines.noData,
      strokeDashArray: '2 3',
    },
    marker: {
      radius: 2,
      strokeWidth: 1,
      strokeOpacity: 1,
    },
  }), [hideMissingDataConnection, theme]);

  const renderer = useMemo(() => getLinesRenderer(renderAs, isHorizontal), [isHorizontal, renderAs]);

  const getSeriesCoordinates = (
    datum: Record<string, any>,
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
      {series.dataKey.map((dataKey: string, di: number) => {
        const subPaths = createSubPaths(
          data,
          d => _.isNil(getValueFromObjectPath(d, dataKey)),
        );

        const hasMarker = Boolean(showMarker
        || showMarkerLabel
        || series.style?.[di]?.showMarker
        || series.style?.[di]?.showMarkerLabel);

        return (
          subPaths.map((
            subPathData: Array<Record<string, any>>,
            si: number,
          ) => (
            <Group
              key={uuid()}
              className={LinesItem}
            >
              <LinePath
                data={subPathData}
                curve={renderer}
                x={datum => getSeriesCoordinates(datum, dataKey, isHorizontal).x as any}
                y={datum => getSeriesCoordinates(datum, dataKey, isHorizontal).y as any}
                stroke={si % 2 === 0
                  ? series.colors[di]
                  : defaultStyle.segment.stroke}
                strokeWidth={series.style?.[di]?.strokeWidth ?? defaultStyle.path.strokeWidth}
                strokeOpacity={series.style?.[di]?.strokeOpacity ?? defaultStyle.path.strokeOpacity}
                strokeDasharray={si % 2 === 0
                  ? series.style?.[di]?.strokeDasharray
                  : defaultStyle.segment.strokeDashArray}
              />

              {hasMarker && subPathData.map((d: Record<string, any>) => (
                <circle
                  key={uuid()}
                  r={defaultStyle.marker.radius}
                  cx={getSeriesCoordinates(d, dataKey, isHorizontal).x}
                  cy={getSeriesCoordinates(d, dataKey, isHorizontal).y}
                  stroke={series.colors[di]}
                  fill={themes[theme].marker.fill}
                  strokeWidth={series.style?.[di]?.strokeWidth ?? defaultStyle.marker.strokeWidth}
                  strokeOpacity={series.style?.[di]?.strokeOpacity ?? defaultStyle.marker.strokeOpacity}
                />
              ))}
            </Group>
          ))
        );
      })}
    </>
  );
};

LinesSeries.displayName = 'LinesSeries';
