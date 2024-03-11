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

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/naming-convention */
// @ts-nocheck

import { localPoint } from '@visx/event';
import { Group } from '@visx/group';
import { Line } from '@visx/shape';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import _ from 'lodash';
import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import { useLines } from '@/hooks';
import { CartesianAxis } from '@/types';

import {
  useStyleConfigContext, useThemeContext,
} from '../../../providers';
import { tooltipTheme } from '../../../style-config/tooltip';
import {
  accessorInvert,
  bisectIndex,
  getLabelFromPath,
  getPrimitiveFromObjectByPath,
} from '../../../utils';
import { Placeholder } from '../../placeholder';
import { Tooltip } from '../../tooltip';
import {
  ExtraContent, LinesTooltipContent, LinesTooltipItem,
  NoData,
} from './lines.module.css';

type TooltipData = {
  coords: {
    x: number;
    y: number;
  };
  data: Record<string, unknown>;
  hasData: any;
  lineIndicatorPos: any;
}

export const LinesTooltip: React.FC = () => {
  const theme = useThemeContext();
  const { lines: defaultStyle } = useStyleConfigContext();

  const {
    index,
    tooltip,
    series,
    overlay,
    preventTooltipDisplay,
    isHorizontal,
    maxHeight: yMax,
    maxWidth: xMax,
    preventTooltipOpening,
    data,
    hasOverlay,
    indexAxis,
    seriesAxis,
    overlayAxis,
  } = useLines();

  const {
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip<TooltipData>();

  const { containerRef, containerBounds } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
    debounce: 500,
    zIndex: 4,
  });

  const handleTooltip = useCallback((event: React.MouseEvent<ownerSVGElement>) => {
    const {
      scaleType, domain, scale,
    } = indexAxis as CartesianAxis;
    const { top: tBound, left: lBound } = containerBounds;

    const hiddenPos = { x: -999, y: -999 };

    const xy = isHorizontal ? 'x' : 'y';

    const coords = localPoint(event.target.ownerSVGElement, event) ?? hiddenPos;

    const accessorInvertValue = accessorInvert(indexAxis, coords[xy]);

    const indexOfBisectValue = scaleType === 'label'
      ? domain.indexOf(accessorInvertValue as string)
      : bisectIndex(domain, accessorInvertValue as any, 0) - 1;

    const domainIndexValue = domain[indexOfBisectValue];

    const indexScaleValue = scaleType === 'label'
      ? accessorInvertValue
      : new Date(domainIndexValue);

    const lineIndicatorPos = scale(indexScaleValue as any);

    const tooltipLeft = ('clientX' in event ? event.clientX : 0) - lBound / 8;
    const tooltipTop = ('clientY' in event ? event.clientY : 0) - tBound / 8;

    const datum = data[indexOfBisectValue];

    const hasSeriesData = series.dataKey.every(s => !_.isNil(getPrimitiveFromObjectByPath(datum, s)));
    const hasOverlayData = overlay.dataKey?.every(s => !_.isNil(getPrimitiveFromObjectByPath(datum, s)));

    const tooltipData: TooltipData = {
      coords,
      data: datum,
      hasData: hasSeriesData || hasOverlayData,
      lineIndicatorPos,
    };

    showTooltip({
      tooltipLeft,
      tooltipTop,
      tooltipData,
    });
  }, [indexAxis, containerBounds, isHorizontal, data, series.dataKey, overlay.dataKey, showTooltip]);

  const hasTooltip = Boolean(tooltipData?.data && !preventTooltipOpening && !preventTooltipDisplay);

  return (
    <>
      <rect
        id="transparent-overlay-layer"
        data-testid="transparent-overlay-layer"
        x={-5}
        y={-5}
        width={Number(xMax) + 10}
        height={Number(yMax) + 10}
        fill="transparent"
        ref={containerRef}
        onMouseMove={e => handleTooltip(e)}
        onTouchMove={e => handleTooltip(e as any)}
        onTouchStart={e => handleTooltip(e as any)}
        onMouseOut={hideTooltip}
        onMouseLeave={hideTooltip}
      />

      {hasTooltip && (
        <>
          <Group>
            <Line
              from={{
                x: isHorizontal ? tooltipData?.lineIndicatorPos : 0,
                y: isHorizontal ? 0 : tooltipData?.lineIndicatorPos,
              }}
              to={{
                x: isHorizontal ? tooltipData?.lineIndicatorPos : xMax,
                y: isHorizontal ? yMax : tooltipData?.lineIndicatorPos,
              }}
              stroke={tooltipTheme[theme].lineIndicatorStroke}
              strokeWidth={defaultStyle.lineIndicator.strokeWidth}
              opacity={defaultStyle.lineIndicator.opacity}
              pointerEvents={defaultStyle.lineIndicator.pointerEvents}
              strokeDasharray={defaultStyle.lineIndicator.strokeDasharray}
            />

            {series.dataKey.map((dataKey: string, di: number) => (
              tooltipData?.data[dataKey] && (
                <circle
                  key={uuid()}
                  r={defaultStyle.dataPoint.radius}
                  cx={isHorizontal
                    ? tooltipData.lineIndicatorPos
                    : seriesAxis?.scale(getPrimitiveFromObjectByPath(tooltipData.data, dataKey) as any)}
                  cy={isHorizontal
                    ? seriesAxis?.scale(getPrimitiveFromObjectByPath(tooltipData.data, dataKey) as any)
                    : tooltipData.lineIndicatorPos}
                  stroke={series.colors[di]}
                  fill={series.colors[di]}
                  strokeWidth={defaultStyle.dataPoint.strokeWidth}
                />
              )
            ))}

            {hasOverlay && overlay.dataKey?.map((dataKey: string, di: number) => (
              tooltipData?.data[dataKey] && (
                <circle
                  key={uuid()}
                  r={defaultStyle.dataPoint.radius}
                  cx={isHorizontal
                    ? tooltipData.lineIndicatorPos
                    : overlayAxis?.scale(getPrimitiveFromObjectByPath(tooltipData.data, dataKey) as any)}
                  cy={isHorizontal
                    ? overlayAxis?.scale(getPrimitiveFromObjectByPath(tooltipData.data, dataKey) as any)
                    : tooltipData.lineIndicatorPos}
                  stroke={overlay.colors?.[di]}
                  fill={overlay.colors?.[di]}
                  strokeWidth={defaultStyle.dataPoint.strokeWidth}
                />
              )
            ))}
          </Group>

          <Tooltip
            theme={theme}
            isOpen={tooltipOpen}
            top={tooltipTop}
            left={tooltipLeft}
          >
            <div className={LinesTooltipContent} data-testid="tooltip">
              <p>
                <b>
                  { indexAxis?.tickFormat
                    ? indexAxis.tickFormat(getPrimitiveFromObjectByPath(tooltipData?.data, index) ?? '')
                    : getPrimitiveFromObjectByPath(tooltipData?.data as any, index) ?? ''
                }
                </b>
              </p>

              <ul>
                {series.dataKey.map((dataKey: string, di: number) => (
                  <li key={uuid()}>
                    <div className={LinesTooltipItem}>
                      <Placeholder color={series.colors[di]} />
                      <span>
                        {series.names[di]}
                      </span>
                    </div>

                    <div>
                      {tooltip?.extraSeriesData && (
                        <p>
                          {tooltip.extraSeriesData(_.at(tooltipData?.data, getLabelFromPath(dataKey))[0])}
                        </p>
                      )}
                    </div>

                    <div>
                      <p>
                        <b>
                          {`${getPrimitiveFromObjectByPath(tooltipData?.data as any, dataKey) ?? 'n/a'}`}
                        </b>
                      </p>
                    </div>
                  </li>
                ))}

                {hasOverlay && overlay.dataKey?.map((dataKey: string, di: number) => (
                  <li key={uuid()}>
                    <div className={LinesTooltipItem}>
                      <Placeholder color={overlay.colors?.[di]} />
                      <span>
                        {overlay.names?.[di]}
                      </span>
                    </div>

                    <div>
                      {tooltip?.extraSeriesData && (
                        <p>
                          {tooltip.extraSeriesData(_.at(tooltipData?.data, getLabelFromPath(dataKey))[0])}
                        </p>
                      )}
                    </div>

                    <div>
                      <p>
                        <b>
                          {`${getPrimitiveFromObjectByPath(tooltipData?.data as any, dataKey) ?? 'n/a'}`}
                        </b>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            { (tooltip?.extraContent || !tooltipData?.hasData) && (
              <div
                className={ExtraContent}
                style={{ borderColor: tooltipTheme[theme].separatorStroke }}
              >
                {tooltip?.extraContent && tooltip.extraContent}

                {!tooltipData?.hasData && <p className={NoData}>No data available</p>}
              </div>
            )}
          </Tooltip>
        </>
      )}
    </>
  );
};

LinesTooltip.displayName = 'LinesTooltip';
