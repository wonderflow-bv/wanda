/*
 * Copyright 2023-2024 Wonderflow Design Team
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
import { LineChartMetadata } from 'packages/charts/src/types';
import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import {
  useCartesianContext, useDataContext, useLayoutContext, useStyleConfigContext, useThemeContext,
} from '../../../providers';
import {
  getCoordinates,
  getDataKeyParentObject,
  getMarkerLabelProps,
  getPrimitiveFromObjectByPath,
  isMarkerLabelVisible,
} from '../../../utils';
import {
  LinesItem, LinesItemBlurred,
} from './lines.module.css';

export const LinesMarkerLabels: React.FC = () => {
  const theme = useThemeContext();
  const { data, metadata } = useDataContext<LineChartMetadata>();
  const { isHorizontal } = useLayoutContext();
  const { axis, dimension, hoveredLegendItem: overLegend } = useCartesianContext();
  const { themes, viewport } = useStyleConfigContext();

  const {
    index, showMarkerLabel, series, overlay,
  } = metadata!;

  const indexAxis = isHorizontal ? axis.bottom : axis.left;
  const seriesAxis = isHorizontal ? axis.left : axis.bottom;
  const overlayAxis = isHorizontal ? axis?.right : axis?.top;

  const hasMarkerLabel = dimension.maxWidth > viewport.small.maxWidth;

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

  const dynamicClassName = useCallback((overLegend: string, dataKey: string) => ((overLegend === dataKey || overLegend === '')
    ? LinesItem
    : LinesItemBlurred), []);

  if (!hasMarkerLabel) return null;

  return (
    <>
      { series.dataKey.map((k: string, i: number) => (
        <Group
          key={uuid()}
          className={dynamicClassName(overLegend, k)}
        >
          {(showMarkerLabel || series.style?.[i]?.showMarkerLabel)
            && data.map((d: Record<string, any>, di: number) => {
              const isVisible = isMarkerLabelVisible(di, totalLabels);

              const value = `${getPrimitiveFromObjectByPath(d, k) ?? ''}`;
              const extra = series.extraData ? series.extraData(getDataKeyParentObject(d, k)) : '';
              const title = series.extraData ? `${value} - ${extra}` : `${value}`;

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
                      data-testid="lines-marker-label"
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

      {hasOverlay && overlay.dataKey?.map((k: string, i: number) => (
        <Group
          key={uuid()}
          className={dynamicClassName(overLegend, k)}
        >
          {(showMarkerLabel || overlay.style?.[i]?.showMarkerLabel)
            && data.map((d: Record<string, any>, di: number) => {
              const isVisible = isMarkerLabelVisible(di, totalLabels);

              const value = `${getPrimitiveFromObjectByPath(d, k) ?? ''}`;
              const extra = overlay.extraData ? overlay.extraData(getDataKeyParentObject(d, k)) : '';
              const title = overlay.extraData ? `${value} - ${extra}` : `${value}`;

              const coordinates = getOverlayCoordinates(d, k, isHorizontal);
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
                      data-testid="overlay-lines-marker-label"
                      key={uuid()}
                      className={dynamicClassName(overLegend, k)}
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
    </>
  );
};

LinesMarkerLabels.displayName = 'LinesMarkerLabels';
