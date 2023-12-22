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
import { useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import {
  useCartesianContext, useDataContext, useLayoutContext, useStyleConfigContext, useThemeContext,
} from '../../../providers';
import {
  createSubPaths,
  getCoordinates, getLinesRenderer, getValueFromObjectByPath,
} from '../../../utils';
import {
  LinesItem,
} from './lines.module.css';

export const LinesSeries: React.FC = () => {
  const theme = useThemeContext();
  const { lines: defaultStyle, themes } = useStyleConfigContext();
  const { data, metadata } = useDataContext();
  const { isHorizontal } = useLayoutContext();
  const { axis } = useCartesianContext();

  const { left, bottom } = axis!;
  const {
    index, renderAs, showMarker, showMarkerLabel,
    series, hideMissingDataConnection,
  } = metadata! as LineChartMetadata;

  const indexAxis = isHorizontal ? bottom : left;
  const seriesAxis = isHorizontal ? left : bottom;

  const renderer = useMemo(() => getLinesRenderer(renderAs, isHorizontal), [isHorizontal, renderAs]);

  const getSeriesCoordinates = (
    datum: Record<string, unknown>,
    dataKey: string,
    isHorizontal: boolean,
  ) => getCoordinates({
    datum,
    indexAxis: indexAxis!,
    indexDataKey: index,
    otherAxis: seriesAxis!,
    otherDataKey: dataKey,
    isHorizontal,
  });

  return (
    <>
      {series.dataKey.map((dataKey: string, di: number) => {
        const subPaths = createSubPaths(
          data,
          d => _.isNil(getValueFromObjectByPath(d, dataKey)),
        );

        const hasMarker = Boolean(showMarker
        || showMarkerLabel
        || series.style?.[di]?.showMarker
        || series.style?.[di]?.showMarkerLabel);

        const segmentStroke = hideMissingDataConnection ? 'transparent' : themes[theme].lines.noData;

        return (
          subPaths.map((
            subPathData: Array<Record<string, unknown>>,
            si: number,
          ) => (
            <Group
              key={uuid()}
              className={LinesItem}
            >
              <LinePath
                data-testid="lines-series"
                data={subPathData}
                curve={renderer}
                x={datum => getSeriesCoordinates(datum, dataKey, isHorizontal).x as any}
                y={datum => getSeriesCoordinates(datum, dataKey, isHorizontal).y as any}
                stroke={si % 2 === 0
                  ? series.colors[di]
                  : segmentStroke}
                strokeWidth={series.style?.[di]?.strokeWidth ?? defaultStyle.path.strokeWidth}
                strokeOpacity={series.style?.[di]?.strokeOpacity ?? defaultStyle.path.strokeOpacity}
                strokeDasharray={si % 2 === 0
                  ? series.style?.[di]?.strokeDasharray
                  : defaultStyle.segment.strokeDashArray}
              />

              {hasMarker && subPathData.map((d: Record<string, unknown>) => (
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
