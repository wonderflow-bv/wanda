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

import { useLayoutContext } from '../../../providers';
import { useCartesianContext } from '../../../providers/cartesian';
import { useDataContext } from '../../../providers/data';
import { useThemeContext } from '../../../providers/theme';
import { colorPaletteNeutrals } from '../../../style-config';
import {
  accessorInvert,
  bisectIndex,
  getLabelFromObjectPath,
  getPrimitiveFromObjectPath,
} from '../../../utils';
import { Tooltip } from '../../tooltip';
import {
  ExtraContent, LinesTooltipContent, LinesTooltipSeries,
  NoData,
} from './lines.module.css';

export const LinesTooltip: React.FC = () => {
  const theme = useThemeContext();
  const { data, metadata } = useDataContext();
  const { isHorizontal } = useLayoutContext();
  const { axis, maxHeight: yMax, maxWidth: xMax } = useCartesianContext();

  const {
    top, right, bottom, left,
  } = axis;
  const {
    index, tooltip, series, overlay,
  } = metadata!;

  const indexAxis = isHorizontal ? bottom! : left!;
  const seriesAxis = isHorizontal ? left! : bottom!;
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

    const xy = isHorizontal ? 'x' : 'y';
    const coords = localPoint(event.target.ownerSVGElement, event) ?? { x: -999, y: -999 };

    const accessorInvertIndexOf = accessorInvert(indexAxis, coords[xy]);

    const bisectValueIndexOf = scaleType === 'label'
      ? domain.indexOf(accessorInvertIndexOf as string)
      : bisectIndex(domain, accessorInvertIndexOf as any, 0) - 1;

    const valueFromDomainIndex = domain[bisectValueIndexOf];

    const indexScaleValue = scaleType === 'label'
      ? accessorInvertIndexOf
      : new Date(valueFromDomainIndex);

    const lineIndicatorPos = scale(indexScaleValue as any);

    const tooltipLeft = isHorizontal ? coords.x + lBound / 8 : coords.x;
    const tooltipTop = isHorizontal ? coords.y : coords.y + tBound / 8;

    const datum = data[bisectValueIndexOf];

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
              stroke={colorPaletteNeutrals.dimmed4}
              strokeWidth={1}
              opacity={0.6}
              pointerEvents="none"
              strokeDasharray="1 2"
            />

            {series.dataKey.map((d: string, di: number) => (
              tooltipData.data[d] && (
                <circle
                  key={d}
                  r={2}
                  cx={isHorizontal
                    ? tooltipData.lineIndicatorPos
                    : seriesAxis.scale(getPrimitiveFromObjectPath(tooltipData.data, d))}
                  cy={isHorizontal
                    ? seriesAxis.scale(getPrimitiveFromObjectPath(tooltipData.data, d))
                    : tooltipData.lineIndicatorPos}
                  stroke={series.colors[di]}
                  fill={series.colors[di]}
                  strokeWidth={series.style?.[di]?.strokeWidth ?? 1}
                />
              )
            ))}

            {hasOverlay && tooltipData.data[overlay.dataKey] && (
              <circle
                r={2}
                cx={isHorizontal
                  ? tooltipData.lineIndicatorPos
                  : overlayAxis?.scale(getPrimitiveFromObjectPath(tooltipData.data, overlay.dataKey))}
                cy={isHorizontal
                  ? overlayAxis?.scale(getPrimitiveFromObjectPath(tooltipData.data, overlay.dataKey))
                  : tooltipData.lineIndicatorPos}
                stroke={overlay.color}
                fill={overlay.color}
                strokeWidth={overlay.style?.strokeWidth ?? 1}
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
                {series.dataKey.map((s: string, i: number) => (
                  <li key={s}>
                    <div className={LinesTooltipSeries}>
                      <svg width={12} height={12}>
                        <rect
                          x={0}
                          y={0}
                          width={12}
                          height={12}
                          rx={2}
                          ry={2}
                          fill={series.colors[i]}
                        />
                      </svg>
                      <span>
                        {series.names[i]}
                      </span>
                    </div>

                    <div>
                      {tooltip?.extraSeriesData && (
                        <p>
                          {tooltip.extraSeriesData(_.at(tooltipData.data, getLabelFromObjectPath(s))[0])}
                        </p>
                      )}
                    </div>

                    <div>
                      <p>
                        <b>
                          {`${getPrimitiveFromObjectPath(tooltipData.data, s) ?? 'n/a'}`}
                        </b>
                      </p>
                    </div>
                  </li>
                ))}

                {hasOverlay && (
                  <li>
                    <div className={LinesTooltipSeries}>
                      <svg width={12} height={12}>
                        <rect
                          x={0}
                          y={0}
                          width={12}
                          height={12}
                          rx={2}
                          ry={2}
                          fill={overlay.color}
                        />
                      </svg>
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
                style={{ borderColor: colorPaletteNeutrals.dimmed3 }}
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
