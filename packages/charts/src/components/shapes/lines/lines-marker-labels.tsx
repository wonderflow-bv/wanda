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
import { v4 as uuid } from 'uuid';

import {
  useCartesianContext, useDataContext, useLayoutContext, useThemeContext,
} from '../../../providers';
import { themes } from '../../../style-config';
import {
  getCoordinates,
  getMarkerLabelProps,
  getPrimitiveFromObjectByPath,
  isMarkerLabelVisible,
} from '../../../utils';
import {
  LinesItem,
} from './lines.module.css';

export const LinesMarkerLabels: React.FC = () => {
  const theme = useThemeContext();
  const { data, metadata } = useDataContext();
  const { isHorizontal } = useLayoutContext();
  const { axis, dimension } = useCartesianContext();

  const {
    index, showMarkerLabel, series, overlay,
  } = metadata!;

  const indexAxis = isHorizontal ? axis!.bottom : axis!.left;
  const seriesAxis = isHorizontal ? axis!.left : axis!.bottom;
  const overlayAxis = isHorizontal ? axis?.right : axis?.top;

  const hasOverlay = Boolean(overlayAxis && overlay.dataKey);

  const themeConfig = themes[theme];
  const totalLabels = data.length;

  const getSeriesCoordinates = (
    datum: Record<string, any>,
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

  const getOverlayCoordinates = (
    datum: Record<string, any>,
    dataKey: string,
    isHorizontal: boolean,
  ) => getCoordinates({
    datum,
    indexAxis: indexAxis!,
    indexDataKey: index,
    otherAxis: overlayAxis!,
    otherDataKey: dataKey,
    isHorizontal,
  });

  return (
    <>
      {series.dataKey.map((k: string, i: number) => (
        <Group
          key={uuid()}
          className={LinesItem}
        >
          {(showMarkerLabel || series.style?.[i]?.showMarkerLabel)
            && data.map((d: Record<string, any>, di: number) => {
              const isVisible = isMarkerLabelVisible(di, totalLabels);
              const title = `${getPrimitiveFromObjectByPath(d, k) ?? ''}`;
              const coordinates = getSeriesCoordinates(d, k, isHorizontal);
              const markerLabelProps = getMarkerLabelProps(coordinates, dimension, isHorizontal, themeConfig);
              const {
                background,
                fontColor,
                fontSize,
                fontWeight,
                titleProps,
                anchor,
                verticalAnchor,
                padding,
                backgroundProps,
              } = markerLabelProps;

              return (
                isVisible
                  ? (
                    <Label
                      key={uuid()}
                      backgroundFill={background}
                      x={coordinates.x}
                      y={coordinates.y}
                      fontColor={fontColor}
                      title={title}
                      titleFontSize={fontSize}
                      titleFontWeight={fontWeight}
                      titleProps={titleProps}
                      showAnchorLine={false}
                      horizontalAnchor={anchor}
                      verticalAnchor={verticalAnchor}
                      showBackground
                      backgroundPadding={padding}
                      backgroundProps={backgroundProps}
                    />
                  ) : null
              );
            })}
        </Group>
      ))}

      {hasOverlay && (showMarkerLabel || overlay.style?.showMarkerLabel)
            && data.map((d: Record<string, any>, di: number) => {
              const isVisible = isMarkerLabelVisible(di, totalLabels);
              const title = `${getPrimitiveFromObjectByPath(d, overlay.dataKey!) ?? ''}`;
              const coordinates = getOverlayCoordinates(d, overlay.dataKey!, isHorizontal);
              const markerLabelProps = getMarkerLabelProps(coordinates, dimension, isHorizontal, themeConfig);
              const {
                background,
                fontColor,
                fontSize,
                fontWeight,
                titleProps,
                anchor,
                verticalAnchor,
                padding,
                backgroundProps,
              } = markerLabelProps;

              return (
                isVisible
                  ? (
                    <Label
                      key={uuid()}
                      backgroundFill={background}
                      x={coordinates.x}
                      y={coordinates.y}
                      fontColor={fontColor}
                      title={title}
                      titleFontSize={fontSize}
                      titleFontWeight={fontWeight}
                      titleProps={titleProps}
                      showAnchorLine={false}
                      horizontalAnchor={anchor}
                      verticalAnchor={verticalAnchor}
                      showBackground
                      backgroundPadding={padding}
                      backgroundProps={backgroundProps}
                    />
                  ) : null
              );
            })}
    </>
  );
};

LinesMarkerLabels.displayName = 'LinesMarkerLabels';
