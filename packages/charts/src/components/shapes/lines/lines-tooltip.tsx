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

import { localPoint } from '@visx/event';
import { Group } from '@visx/group';
import { Line } from '@visx/shape';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import _ from 'lodash';
import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import {
  useCartesianContext, useDataContext, useLayoutContext, useStyleConfigContext, useThemeContext,
} from '../../../providers';
import { tooltipTheme } from '../../../style-config/tooltip';
import {
  accessorInvert,
  bisectIndex,
  getLabelFromObjectPath,
  getPrimitiveFromObjectPath,
} from '../../../utils';
import { Placeholder } from '../../placeholder';
import { Tooltip } from '../../tooltip';
import {
  ExtraContent, LinesTooltipContent, LinesTooltipItem,
  NoData,
} from './lines.module.css';

export const LinesTooltip: React.FC = () => {
  const theme = useThemeContext();
  const { lines: defaultStyle } = useStyleConfigContext();
  const { data, metadata } = useDataContext();
  const { isHorizontal } = useLayoutContext();
  const { axis, dimension } = useCartesianContext();
  const { maxHeight: yMax, maxWidth: xMax } = dimension;

  const {
    top, right, bottom, left,
  } = axis;
  const {
    index, tooltip, series, overlay,
  } = metadata!;

  const indexAxis = isHorizontal ? bottom : left;
  const seriesAxis = isHorizontal ? left : bottom;
  const overlayAxis = isHorizontal ? right : top;

  const hasOverlay = Boolean(overlayAxis && overlay.dataKey);

  const {
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    tooltipData,
    hideTooltip,
    showTooltip,
  } = useTooltip();

  const { containerRef, containerBounds } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
    debounce: 500,
    zIndex: 10,
  });

  const handleTooltip = useCallback((event: React.MouseEvent<ownerSVGElement>) => {
    const {
      scaleType, domain, scale,
    } = indexAxis;
    const { top: tBound, left: lBound } = containerBounds;

    const hiddenPos = { x: -999, y: -999 };

    const xy = isHorizontal ? 'x' : 'y';

    const coords = localPoint(event.target.ownerSVGElement, event) ?? hiddenPos;

    const accessorInvertValue = accessorInvert(indexAxis, coords[xy]);

    const indexOfBisectValue = scaleType === 'label'
      ? domain.indexOf(accessorInvertValue as string)
      : bisectIndex(domain, accessorInvertValue, 0) - 1;

    const domainIndexValue = domain[indexOfBisectValue];

    const indexScaleValue = scaleType === 'label'
      ? accessorInvertValue
      : new Date(domainIndexValue);

    const lineIndicatorPos = scale(indexScaleValue as any);

    const tooltipLeft = isHorizontal
      ? (coords.x + lBound / 8)
      : coords.x;
    const tooltipTop = isHorizontal
      ? coords.y
      : (coords.y + tBound / 8);

    const datum = data[indexOfBisectValue];
    const hasSeriesData = series.dataKey.every(s => !_.isNil(getPrimitiveFromObjectPath(datum, s)));
    const hasOverlayData = !_.isNil(getPrimitiveFromObjectPath(datum, overlay.dataKey!));

    const tooltipData = {
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

  return (
    <>
      <rect
        id="transparent-overlay-layer"
        x={-5}
        y={-5}
        width={xMax + 10}
        height={yMax + 10}
        fill="transparent"
        ref={containerRef}
        onMouseMove={e => handleTooltip(e)}
        onTouchMove={e => handleTooltip(e)}
        onTouchStart={e => handleTooltip(e)}
        onMouseOut={hideTooltip}
        onMouseLeave={hideTooltip}
      />

      {tooltipData?.data && (
        <>
          <Group>
            <Line
              from={{
                x: isHorizontal ? tooltipData.lineIndicatorPos : 0,
                y: isHorizontal ? 0 : tooltipData.lineIndicatorPos,
              }}
              to={{
                x: isHorizontal ? tooltipData.lineIndicatorPos : xMax,
                y: isHorizontal ? yMax : tooltipData.lineIndicatorPos,
              }}
              stroke={tooltipTheme[theme].lineIndicatorStroke}
              strokeWidth={defaultStyle.lineIndicator.strokeWidth}
              opacity={defaultStyle.lineIndicator.opacity}
              pointerEvents={defaultStyle.lineIndicator.pointerEvents}
              strokeDasharray={defaultStyle.lineIndicator.strokeDasharray}
            />

            {series.dataKey.map((dataKey: string, di: number) => (
              tooltipData.data[dataKey] && (
                <circle
                  key={uuid()}
                  r={defaultStyle.dataPoint.radius}
                  cx={isHorizontal
                    ? tooltipData.lineIndicatorPos
                    : seriesAxis.scale(getPrimitiveFromObjectPath(tooltipData.data, dataKey))}
                  cy={isHorizontal
                    ? seriesAxis.scale(getPrimitiveFromObjectPath(tooltipData.data, dataKey))
                    : tooltipData.lineIndicatorPos}
                  stroke={series.colors[di]}
                  fill={series.colors[di]}
                  strokeWidth={defaultStyle.dataPoint.strokeWidth}
                />
              )
            ))}

            {hasOverlay && tooltipData.data[overlay.dataKey] && (
              <circle
                r={defaultStyle.dataPoint.radius}
                cx={isHorizontal
                  ? tooltipData.lineIndicatorPos
                  : overlayAxis?.scale(getPrimitiveFromObjectPath(tooltipData.data, overlay.dataKey))}
                cy={isHorizontal
                  ? overlayAxis?.scale(getPrimitiveFromObjectPath(tooltipData.data, overlay.dataKey))
                  : tooltipData.lineIndicatorPos}
                stroke={overlay.color}
                fill={overlay.color}
                strokeWidth={defaultStyle.dataPoint.strokeWidth}
              />
            )}
          </Group>

          <Tooltip
            theme={theme}
            isOpen={tooltipOpen}
            top={tooltipTop}
            left={tooltipLeft}
          >
            <div className={LinesTooltipContent}>
              <p>
                <b>
                  { indexAxis.tickFormat
                    ? indexAxis.tickFormat(getPrimitiveFromObjectPath(tooltipData.data, index) ?? '')
                    : getPrimitiveFromObjectPath(tooltipData.data, index) ?? ''
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
                          {tooltip.extraSeriesData(_.at(tooltipData.data, getLabelFromObjectPath(dataKey))[0])}
                        </p>
                      )}
                    </div>

                    <div>
                      <p>
                        <b>
                          {`${getPrimitiveFromObjectPath(tooltipData.data, dataKey) ?? 'n/a'}`}
                        </b>
                      </p>
                    </div>
                  </li>
                ))}

                {hasOverlay && (
                  <li>
                    <div className={LinesTooltipItem}>
                      <Placeholder color={overlay.color} />
                      <span>
                        {overlay.name}
                      </span>
                    </div>

                    <div>
                      {tooltip?.extraOverlayData && (
                        <p>
                          {tooltip.extraOverlayData(
                            _.at(tooltipData.data, getLabelFromObjectPath(overlay.dataKey!))[0],
                          )}
                        </p>
                      )}
                    </div>

                    <div>
                      <p>
                        <b>
                          {`${getPrimitiveFromObjectPath(tooltipData.data, overlay.dataKey!) ?? 'n/a'}`}
                        </b>
                      </p>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            { (tooltip?.extraContent || !tooltipData.hasData) && (
              <div
                className={ExtraContent}
                style={{ borderColor: tooltipTheme[theme].separatorStroke }}
              >
                {tooltip?.extraContent && tooltip.extraContent}

                {!tooltipData.hasData && <p className={NoData}>No data available</p>}
              </div>
            )}
          </Tooltip>
        </>
      )}
    </>
  );
};

LinesTooltip.displayName = 'LinesTooltip';
