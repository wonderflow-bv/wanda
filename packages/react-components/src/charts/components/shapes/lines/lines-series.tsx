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

import { Label } from '@visx/annotation';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { CurveFactory } from 'd3';

import { colorPaletteNeutrals } from '../../../style-config';
import {
  AxisType,
  Data, ThemeVariants,
} from '../../../types';
import {
  getCoordinates,
  getPrimitiveFromObjectPath,
  isMarkerLabelActive,
} from '../../../utils';
import { LineChartMetadata } from '../../line-chart/line-chart';
import {
  LinesItem,
} from './lines.module.css';

export type LinesSeriesProps = {
  theme: ThemeVariants;
  isHorizontal: boolean;
  data: Data;
  metadata: LineChartMetadata;
  maxWidth: number;
  maxHeight: number;
  renderer: CurveFactory;
  axis: {
    top?: AxisType;
    right?: AxisType;
    bottom?: AxisType;
    left?: AxisType;
  };
}

export const LinesSeries = ({
  theme,
  isHorizontal,
  data,
  metadata,
  maxWidth: xMax,
  maxHeight: yMax,
  renderer,
  axis,
}: LinesSeriesProps) => {
  const { bottom, left } = axis;
  const {
    index, showMarker, showMarkerLabel, series,
  } = metadata;

  const indexAxis = isHorizontal ? bottom! : left!;
  const seriesAxis = isHorizontal ? left! : bottom!;

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

  const getMarkerLabelProps = (
    datum: Record<string, unknown>,
    dataKey: string,
    isHorizontal: boolean,
  ): {
    anchor: 'middle' | 'start' | 'end' | 'inherit' | undefined;
    dx: number;
    dy: number;
  } => {
    let anchor = 'middle';
    let dx = 0;
    let dy = 0;

    const pos = getSeriesCoordinates(datum, dataKey, isHorizontal);

    const isLeft = pos.x < (xMax * 0.075);
    const isRigth = pos.x > (xMax * 0.9);
    const isTop = pos.y < (yMax * 0.075);
    const isBottom = pos.y > (yMax * 0.9);

    if (isHorizontal) {
      if (isLeft) {
        anchor = 'start';
        dx = 4;
      }

      if (isRigth) {
        anchor = 'end';
        dx = -4;
      }

      if (isBottom) {
        dy = -6;
      } else {
        dy = 28;
      }
    } else {
      anchor = 'start';

      if (isTop) {
        dy = 24;
      } else {
        dy = -6;
      }

      if (isLeft) {
        dx = 6;
      }

      if (isRigth) {
        anchor = 'end';
      }
    }

    return {
      anchor,
      dx,
      dy,
    };
  };

  return (
    <>
      {series.dataKey.map((k: string, i: number) => (
        <Group
          key={k}
          className={LinesItem}
        >
          <LinePath
            data={data}
            curve={renderer}
            x={d => getSeriesCoordinates(d, k, isHorizontal).x}
            y={d => getSeriesCoordinates(d, k, isHorizontal).y}
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

          {(showMarkerLabel || series.style?.[i]?.showMarkerLabel)
            && data.map((d: Record<string, any>, di: number) => (
              isMarkerLabelActive(di, data.length)
                ? (
                  <Label
                    key={JSON.stringify(d)}
                    backgroundFill="#ccc"
                    x={getSeriesCoordinates(d, k, isHorizontal).x}
                    y={getSeriesCoordinates(d, k, isHorizontal).y}
                    title={`${getPrimitiveFromObjectPath(d, k) ?? ''}`}
                    titleFontSize={12}
                    titleFontWeight={400}
                    titleProps={{
                      x: getMarkerLabelProps(d, k, isHorizontal).dx + 4,
                      y: getMarkerLabelProps(d, k, isHorizontal).dy + 4,
                    }}
                    showAnchorLine={false}
                    horizontalAnchor={getMarkerLabelProps(d, k, isHorizontal).anchor}
                    verticalAnchor="end"
                    showBackground
                    backgroundPadding={{
                      top: 4, right: 6, bottom: 4, left: 6,
                    }}
                    backgroundProps={{
                      rx: 4,
                      ry: 4,
                      x: getMarkerLabelProps(d, k, isHorizontal).dx,
                      y: getMarkerLabelProps(d, k, isHorizontal).dy,
                    }}
                  />
                ) : null
            ))}
        </Group>
      ))}

    </>
  );
};

LinesSeries.displayName = 'LinesSeries';
