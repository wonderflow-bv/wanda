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
import { useCallback, useMemo } from 'react';

import { colorPaletteNeutrals } from '../../../style-config';
import {
  AxisType, CartesianChartLayout, Data, ThemeVariants,
} from '../../../types';
import {
  accessorInvert,
  bisectIndex,
  getLabelFromObjectPath,
  getLinesRenderer,
  getPrimitiveFromObjectPath,
} from '../../../utils';
import { LineChartMetadata } from '../../line-chart/line-chart';
import { Tooltip } from '../../tooltip';
import {
  ExtraContent,
  LinesItemGroup, LinesTooltipContent, LinesTooltipSeries,
} from './lines.module.css';
import { LinesOverlay } from './lines-overlay';
import { LinesSeries } from './lines-series';

export type LinesProps = {
  theme: ThemeVariants;
  data: Data;
  metadata: LineChartMetadata;
  topPosition: number;
  leftPosition: number;
  maxWidth: number;
  maxHeight: number;
  axis: {
    top?: AxisType;
    right?: AxisType;
    bottom?: AxisType;
    left?: AxisType;
  };
}

export const Lines = ({
  theme,
  data,
  metadata,
  topPosition: tPos,
  leftPosition: lPos,
  maxWidth: xMax,
  maxHeight: yMax,
  axis,
}: LinesProps) => {
  const {
    top, right, bottom, left,
  } = axis;
  const {
    index, layout, renderAs, tooltip, series, overlay,
  } = metadata;

  const isHorizontal = layout === CartesianChartLayout.HORIZONTAL;

  const indexAxis = isHorizontal ? bottom! : left!;
  const seriesAxis = isHorizontal ? left! : bottom!;
  const overlayAxis = isHorizontal ? right : top;

  const hasOverlay = Boolean(overlayAxis && overlay.dataKey);

  const renderer = useMemo(() => getLinesRenderer(renderAs, isHorizontal), [isHorizontal, renderAs]);

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

    const tooltipData = {
      coords,
      data: data[bisectValueIndexOf],
      lineIndicatorPos,
    };

    showTooltip({
      tooltipLeft,
      tooltipTop,
      tooltipData,
    });
  }, [containerBounds, indexAxis, isHorizontal, data, showTooltip]);

  return (
    <Group
      top={tPos}
      left={lPos}
    >
      <Group className={LinesItemGroup}>
        <LinesOverlay
          theme={theme}
          isHorizontal={isHorizontal}
          data={data}
          metadata={metadata}
          maxWidth={xMax}
          maxHeight={yMax}
          renderer={renderer}
          axis={axis}
        />

        <LinesSeries
          theme={theme}
          isHorizontal={isHorizontal}
          data={data}
          metadata={metadata}
          maxWidth={xMax}
          maxHeight={yMax}
          renderer={renderer}
          axis={axis}
        />
      </Group>

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

            {series.dataKey.map((s: string, i: number) => (
              <circle
                key={s}
                r={2}
                cx={isHorizontal
                  ? tooltipData.lineIndicatorPos
                  : seriesAxis.scale(getPrimitiveFromObjectPath(tooltipData.data, s))}
                cy={isHorizontal
                  ? seriesAxis.scale(getPrimitiveFromObjectPath(tooltipData.data, s))
                  : tooltipData.lineIndicatorPos}
                stroke={series.colors[i]}
                fill={series.colors[i]}
                strokeWidth={series.style?.[i]?.strokeWidth ?? 1}
              />
            ))}

            {hasOverlay && (
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

            { tooltip?.extraContent && (
              <div
                className={ExtraContent}
                style={{ borderColor: colorPaletteNeutrals.dimmed3 }}
              >
                {tooltip.extraContent}
              </div>
            )}
          </Tooltip>
        </>
      )}
    </Group>
  );
};

Lines.displayName = 'Lines';
