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

import { colorPaletteNeutrals } from '../../../style-config';
import {
  AxisType,
  CartesianChartLayout,
  Data,
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

export type LinesMarkerLabelsProps = {
  data: Data;
  metadata: LineChartMetadata;
  maxWidth: number;
  maxHeight: number;
  axis: {
    top?: AxisType;
    right?: AxisType;
    bottom?: AxisType;
    left?: AxisType;
  };
}

export const LinesMarkerLabels = ({
  data,
  metadata,
  maxWidth: xMax,
  maxHeight: yMax,
  axis,
}: LinesMarkerLabelsProps) => {
  const {
    bottom, left, right, top,
  } = axis;
  const {
    index, layout, showMarkerLabel, series, overlay,
  } = metadata;

  const isHorizontal = layout === CartesianChartLayout.HORIZONTAL;

  const indexAxis = isHorizontal ? bottom! : left!;
  const seriesAxis = isHorizontal ? left! : bottom!;
  const overlayAxis = isHorizontal ? right : top;

  const hasOverlay = Boolean(overlayAxis && overlay.dataKey);

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

  const getMarkerLabelProps = (pos: { x: number | undefined; y: number | undefined }) => {
    let anchor = 'middle' as 'middle' | 'start' | 'end' | 'inherit' | undefined;
    let dx = 0;
    let dy = 0;

    const main = {
      fontSize: 12,
      fontWeight: 400,
      titleDx: 4,
      titleDy: 4,
      background: colorPaletteNeutrals.dimmed2,
      padding: {
        top: 4, right: 6, bottom: 4, left: 6,
      },
      rx: 4,
      ry: 4,
    };

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
        dy = -4;
      } else {
        dy = 26;
      }
    } else {
      anchor = 'start';

      if (isTop) {
        dy = 26;
      } else {
        dy = -4;
      }

      if (isLeft) {
        dx = 6;
      }

      if (isRigth) {
        anchor = 'end';
      }
    }

    return {
      ...main,
      anchor,
      dx,
      dy,
    };
  };

  return (
    <>
      {series.dataKey.map((k: string, i: number) => (
        <Group
          key={`${k}-marker-label`}
          className={LinesItem}
        >
          {(showMarkerLabel || series.style?.[i]?.showMarkerLabel)
            && data.map((d: Record<string, any>, di: number) => {
              const coordinates = getSeriesCoordinates(d, k, isHorizontal);
              const markerLabelProps = getMarkerLabelProps(coordinates);

              return (
                isMarkerLabelActive(di, data.length)
                  ? (
                    <Label
                      key={JSON.stringify(d)}
                      backgroundFill={markerLabelProps.background}
                      x={coordinates.x}
                      y={coordinates.y}
                      title={`${getPrimitiveFromObjectPath(d, k) ?? ''}`}
                      titleFontSize={markerLabelProps.fontSize}
                      titleFontWeight={markerLabelProps.fontWeight}
                      titleProps={{
                        x: markerLabelProps.dx + markerLabelProps.titleDx,
                        y: markerLabelProps.dy + markerLabelProps.titleDy,
                      }}
                      showAnchorLine={false}
                      horizontalAnchor={markerLabelProps.anchor}
                      verticalAnchor="end"
                      showBackground
                      backgroundPadding={markerLabelProps.padding}
                      backgroundProps={{
                        rx: markerLabelProps.rx,
                        ry: markerLabelProps.ry,
                        x: markerLabelProps.dx,
                        y: markerLabelProps.dy,
                      }}
                    />
                  ) : null
              );
            })}
        </Group>
      ))}

      {hasOverlay && (showMarkerLabel || overlay.style?.showMarkerLabel)
            && data.map((d: Record<string, any>, di: number) => {
              const coordinates = getOverlayCoordinates(d, overlay.dataKey!, isHorizontal);
              const markerLabelProps = getMarkerLabelProps(coordinates);

              return (
                isMarkerLabelActive(di, data.length) ? (
                  <Label
                    key={JSON.stringify(d)}
                    backgroundFill={markerLabelProps.background}
                    x={coordinates.x}
                    y={coordinates.y}
                    title={`${getPrimitiveFromObjectPath(d, overlay.dataKey!) ?? ''}`}
                    titleFontSize={markerLabelProps.fontSize}
                    titleFontWeight={markerLabelProps.fontWeight}
                    titleProps={{
                      x: markerLabelProps.dx + markerLabelProps.titleDx,
                      y: markerLabelProps.dy + markerLabelProps.titleDy,
                    }}
                    showAnchorLine={false}
                    horizontalAnchor={markerLabelProps.anchor}
                    verticalAnchor="end"
                    showBackground
                    backgroundPadding={markerLabelProps.padding}
                    backgroundProps={{
                      rx: markerLabelProps.rx,
                      ry: markerLabelProps.ry,
                      x: markerLabelProps.dx,
                      y: markerLabelProps.dy,
                    }}
                  />
                ) : null
              );
            })}
    </>
  );
};

LinesMarkerLabels.displayName = 'LinesMarkerLabels';
