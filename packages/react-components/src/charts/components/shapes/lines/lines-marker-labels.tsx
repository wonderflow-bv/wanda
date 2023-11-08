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

import { Label } from '@visx/annotation';
import { Group } from '@visx/group';
import _ from 'lodash';

import { useLayoutContext } from '../../../providers';
import { useDataContext } from '../../../providers/data';
import { useThemeContext } from '../../../providers/theme';
import { themes } from '../../../style-config';
import {
  AxisType,
} from '../../../types';
import {
  getCoordinates,
  getPrimitiveFromObjectPath,
  isMarkerLabelActive,
} from '../../../utils';
import {
  LinesItem,
} from './lines.module.css';

export type LinesMarkerLabelsProps = {
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
  maxWidth: xMax,
  maxHeight: yMax,
  axis,
}: LinesMarkerLabelsProps) => {
  const theme = useThemeContext();
  const { data, metadata } = useDataContext();
  const { isHorizontal } = useLayoutContext();

  const {
    bottom, left, right, top,
  } = axis;
  const {
    index, showMarkerLabel, series, overlay,
  } = metadata!;

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
    const main = {
      anchor: 'middle' as 'middle' | 'start' | 'end' | 'inherit' | undefined,
      verticalAnchor: 'end' as 'end' | 'middle' | 'start' | undefined,
      fontColor: themes[theme].markerLabel.fontColor,
      fontSize: 12,
      fontWeight: 400,
      background: themes[theme].markerLabel.background,
      padding: {
        top: 2, right: 6, bottom: 2, left: 6,
      },
      titleProps: {
        x: 4,
        y: 2,
        textAnchor: 'start' as 'middle' | 'start' | 'end' | 'inherit' | undefined,
      },
      backgroundProps: {
        rx: 4,
        ry: 4,
        x: 0,
        y: 0,
        filter: 'opacity(0.7)',
      },
    };

    if (!_.isNil(pos.x) && !_.isNil(pos.y)) {
      const isLeft = pos.x < (xMax * 0.075);
      const isRigth = pos.x > (xMax * 0.9);
      const isTop = pos.y < (yMax * 0.075);
      const isBottom = pos.y > (yMax * 0.9);

      if (isHorizontal) {
        if (isLeft) {
          main.anchor = 'start';
          main.backgroundProps.x = 4;
        }

        if (isRigth) {
          main.anchor = 'end';
          main.backgroundProps.x = -4;
        }

        if (isBottom) {
          main.backgroundProps.y = -4;
        } else {
          main.verticalAnchor = 'start';
          main.backgroundProps.y = 4;
        }
      } else {
        main.anchor = 'start';

        if (isTop) {
          main.verticalAnchor = 'start';
          main.backgroundProps.y = 4;
        } else {
          main.backgroundProps.y = -4;
        }

        if (isLeft) {
          main.backgroundProps.x = 6;
        }

        if (isRigth) {
          main.anchor = 'end';
        }
      }

      main.titleProps.x += main.backgroundProps.x;
      main.titleProps.y += main.backgroundProps.y;
    }

    return main;
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
                      fontColor={markerLabelProps.fontColor}
                      title={`${getPrimitiveFromObjectPath(d, k) ?? ''}`}
                      titleFontSize={markerLabelProps.fontSize}
                      titleFontWeight={markerLabelProps.fontWeight}
                      titleProps={markerLabelProps.titleProps}
                      showAnchorLine={false}
                      horizontalAnchor={markerLabelProps.anchor}
                      verticalAnchor={markerLabelProps.verticalAnchor}
                      showBackground
                      backgroundPadding={markerLabelProps.padding}
                      backgroundProps={markerLabelProps.backgroundProps}
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
                    fontColor={markerLabelProps.fontColor}
                    title={`${getPrimitiveFromObjectPath(d, overlay.dataKey!) ?? ''}`}
                    titleFontSize={markerLabelProps.fontSize}
                    titleFontWeight={markerLabelProps.fontWeight}
                    titleProps={markerLabelProps.titleProps}
                    showAnchorLine={false}
                    horizontalAnchor={markerLabelProps.anchor}
                    verticalAnchor={markerLabelProps.verticalAnchor}
                    showBackground
                    backgroundPadding={markerLabelProps.padding}
                    backgroundProps={markerLabelProps.backgroundProps}
                  />
                ) : null
              );
            })}
    </>
  );
};

LinesMarkerLabels.displayName = 'LinesMarkerLabels';
