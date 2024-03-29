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
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import _ from 'lodash';
import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import { useBars } from '@/hooks';
import {
  useStyleConfigContext,
  useThemeContext,
} from '@/providers';
import { CartesianAxis } from '@/types';
import {
  accessorInvert,
  bisectIndex,
  getDataKeyParentObject,
  getPrimitiveFromObjectByPath,
} from '@/utils';

import { tooltipTheme } from '../../../style-config/tooltip';
import { Placeholder } from '../../placeholder';
import { Tooltip } from '../../tooltip';
import {
  BarsTooltipContent, BarsTooltipItem,
  ExtraContent, NoData,
} from './bars.module.css';

type TooltipData = {
  coords: {
    x: number;
    y: number;
  };
  data: Record<string, unknown>;
  hasData: any;
  barIndicatorPos: number;
  barIndicatorSize: number;
}

export const BarsTooltip: React.FC = ({ children }: { children: React.ReactNode }) => {
  const theme = useThemeContext();
  const { bars, themes } = useStyleConfigContext();

  const {
    data,
    hasOverlay,
    hasReversedIndex,
    isHorizontal,
    index,
    indexAxis,
    isStacked,
    maxWidth: xMax,
    maxHeight: yMax,
    overlay,
    series,
    preventTooltipDisplay,
    preventTooltipOpening,
    tooltipExtraContent,
    scaleXY0,
  } = useBars();

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
      scaleType,
    } = indexAxis as CartesianAxis;

    const domain = scaleXY0.domain();

    const { top: tBound, left: lBound } = containerBounds;

    const hiddenPos = { x: -999, y: -999 };

    const xy = isHorizontal ? 'x' : 'y';

    const coords = localPoint(event.target.ownerSVGElement, event) ?? hiddenPos;

    const accessorInvertValue = accessorInvert({ ...indexAxis, domain }, coords[xy]);

    const indexOfBisectValue = scaleType === 'label'
      ? domain.indexOf(accessorInvertValue as string)
      : bisectIndex(domain, accessorInvertValue as any, 0) - 1;

    const domainIndexValue = domain[indexOfBisectValue];

    const indexScaleValue = scaleType === 'label'
      ? accessorInvertValue
      : new Date(domainIndexValue);

    const barIndicatorPos = scaleXY0(indexScaleValue) ?? -999;
    const barIndicatorSize = scaleXY0.bandwidth();

    const barStackIndicatorPos = hasOverlay ? barIndicatorPos - 1 : barIndicatorPos;
    const barStackIndicatorSize = hasOverlay ? Number(barIndicatorSize) + 2 : barIndicatorSize;

    const tooltipLeft = ('clientX' in event ? event.clientX : 0) - lBound / 8;
    const tooltipTop = ('clientY' in event ? event.clientY : 0) - tBound / 8;

    const datum = hasReversedIndex ? data.at(-(indexOfBisectValue - 1)) : data[indexOfBisectValue];

    const hasSeriesData = series.dataKey.every(s => !_.isNil(getPrimitiveFromObjectByPath(datum, s)));
    const hasOverlayData = overlay.dataKey?.every(s => !_.isNil(getPrimitiveFromObjectByPath(datum, s)));

    const tooltipData: TooltipData = {
      coords,
      data: datum,
      hasData: hasSeriesData || hasOverlayData,
      barIndicatorPos: isStacked ? barStackIndicatorPos : barIndicatorPos,
      barIndicatorSize: isStacked ? barStackIndicatorSize : barIndicatorSize,
    };

    showTooltip({
      tooltipLeft,
      tooltipTop,
      tooltipData,
    });
  }, [indexAxis,
    scaleXY0,
    containerBounds,
    isHorizontal,
    hasOverlay,
    hasReversedIndex,
    data,
    series.dataKey,
    overlay.dataKey,
    isStacked,
    showTooltip]);

  const hasTooltip = Boolean(tooltipData?.data && !preventTooltipOpening && !preventTooltipDisplay);

  return (
    <>
      {hasTooltip && (
        <rect
          x={isHorizontal ? tooltipData?.barIndicatorPos : 0}
          y={isHorizontal ? 0 : tooltipData?.barIndicatorPos}
          width={isHorizontal ? tooltipData?.barIndicatorSize : xMax}
          height={isHorizontal ? yMax : tooltipData?.barIndicatorSize}
          fill={themes[theme].bars.overlayColor}
          fillOpacity={bars.overlay.opacity}
        />
      )}

      {children}

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
        onTouchMove={e => handleTooltip(e)}
        onTouchStart={e => handleTooltip(e)}
        onMouseOut={hideTooltip}
        onMouseLeave={hideTooltip}
      />

      {hasTooltip
          && (
            <Tooltip
              isOpen={tooltipOpen}
              top={tooltipTop}
              left={tooltipLeft}
            >
              <div className={BarsTooltipContent} data-testid="tooltip">
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
                      <div className={BarsTooltipItem}>
                        <Placeholder color={series.colors[di]} />
                        <span>
                          {series.names[di]}
                        </span>
                      </div>

                      <div>
                        {series?.extraData && (
                          <p>
                            {series.extraData(getDataKeyParentObject(tooltipData?.data, dataKey))}
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
                      <div className={BarsTooltipItem}>
                        <Placeholder color={overlay.colors?.[di]} />
                        <span>
                          {overlay.names?.[di]}
                        </span>
                      </div>

                      <div>
                        {overlay?.extraData && (
                          <p>
                            {overlay.extraData(getDataKeyParentObject(tooltipData?.data, dataKey))}
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

              { (tooltipExtraContent || !tooltipData?.hasData) && (
                <div
                  className={ExtraContent}
                  style={{ borderColor: tooltipTheme[theme].separatorStroke }}
                >
                  {tooltipExtraContent}

                  {!tooltipData?.hasData && <p className={NoData}>No data available</p>}
                </div>
              )}
            </Tooltip>
          )
        }
    </>
  );
};

BarsTooltip.displayName = 'BarsTooltip';
