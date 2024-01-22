/*
 * Copyright 2022-2024 Wonderflow Design Team
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

import BaseBrush, { BaseBrushState, UpdateBrush } from '@visx/brush/lib/BaseBrush';
import { Bounds, ResizeTriggerAreas } from '@visx/brush/lib/types';
import _ from 'lodash';
import {
  useCallback, useEffect, useMemo, useRef,
} from 'react';

import {
  useDataContext, useLayoutContext, useStyleConfigContext, useThemeContext,
} from '../providers';
import { CartesianxAxisSystem, Data } from '../types';
import { getPrimitiveFromObjectByPath } from '../utils';

export type UseBrushProps = {
  axisSystem: CartesianxAxisSystem;
  brushSize?: number;
  padding?: number;
  position: {
    top: number;
    left: number;
  };
  dimension: {
    maxWidth: number;
    maxHeight: number;
  };
  isVisible?: boolean;
  onChange: (filteredData: Data) => void;
}

export const useBrush = ({
  axisSystem,
  brushSize = 32,
  dimension,
  isVisible,
  padding = 16,
  position,
  onChange,
}: UseBrushProps) => {
  const brushRef = useRef<BaseBrush | null>(null);

  const { isHorizontal } = useLayoutContext();
  const { data, metadata } = useDataContext();
  const { brush, themes } = useStyleConfigContext();
  const theme = useThemeContext();

  const { bottom, left } = axisSystem;
  const { maxWidth, maxHeight } = dimension;
  const { top: tPos, left: lPos } = position;

  const initialBrushRange = {
    min: 0.2,
    max: 0.8,
  };

  const initDataRange = useMemo(() => {
    const dataLen = data.length;

    const initialDataClamp = {
      min: _.round(dataLen * initialBrushRange.min),
      max: _.round(dataLen * initialBrushRange.max),
    };

    const { min, max } = initialDataClamp;

    return data.filter((_, i) => i > min && i < max - 1);
  }, [data, initialBrushRange.max, initialBrushRange.min]);

  useEffect(() => {
    onChange(initDataRange);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialBrushPosition = {
    start: isHorizontal
      ? { x: (maxWidth * initialBrushRange.min) }
      : { y: (maxHeight * initialBrushRange.min) },
    end: isHorizontal
      ? { x: (maxWidth * initialBrushRange.max) }
      : { y: (maxHeight * initialBrushRange.max) },
  };

  useEffect(() => {
    if (!isVisible) onChange(data);
    if (isVisible) onChange(initDataRange);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const brushDirection = isHorizontal ? 'horizontal' as const : 'vertical' as const;
  const resizeTriggerAreas: ResizeTriggerAreas[] = isHorizontal ? ['left', 'right'] : ['top', 'bottom'];

  const brushHeight = isHorizontal ? brushSize : maxHeight;
  const brushWidth = isHorizontal ? maxWidth : brushSize;

  const topPosition = isHorizontal ? tPos + padding : tPos;
  const leftPosition = isHorizontal ? lPos : lPos + padding * 2;

  const margin = isHorizontal
    ? {
      top: 0, left: lPos, right: 0, bottom: 0,
    }
    : {
      top: tPos, left: 0, right: 0, bottom: 0,
    };

  const style = useMemo(() => ({
    selectedBox: {
      fill: themes[theme].brush.selectedBox.fill,
      fillOpacity: brush.selectedBox.fillOpacity,
      stroke: themes[theme].brush.selectedBox.stroke,
      strokeWidth: brush.selectedBox.strokeWidth,
      strokeOpacity: brush.selectedBox.strokeOpacity,
    },
    pattern: {
      transform: `scale(.1) rotate(${isHorizontal ? 0 : 90})`,
      strokeWidth: brush.pattern.strokeWidth,
      stroke: themes[theme].brush.pattern.stroke,
      fill: themes[theme].brush.pattern.fill,
    },
  }), [
    brush.pattern.strokeWidth,
    brush.selectedBox.fillOpacity,
    brush.selectedBox.strokeOpacity,
    brush.selectedBox.strokeWidth,
    isHorizontal,
    theme,
    themes,
  ]);

  const handleBrushClear = () => {
    if (brushRef?.current) {
      onChange(data);
      brushRef.current.reset();
    }
  };

  const handleBrushReset = () => {
    if (brushRef?.current) {
      const updater: UpdateBrush = (prevBrush) => {
        const newExtent = brushRef.current!.getExtent(
          initialBrushPosition.start,
          initialBrushPosition.end,
        );

        const newState: BaseBrushState = {
          ...prevBrush,
          start: { y: newExtent.y0, x: newExtent.x0 },
          end: { y: newExtent.y1, x: newExtent.x1 },
          extent: newExtent,
        };

        return newState;
      };

      brushRef.current.updateBrush(updater);
    }
  };

  const handleBrushChange = useCallback((domain: Bounds | null) => {
    if (!domain) return;

    let filteredData: Data = data;

    const {
      x0, x1, xValues, y0, y1, yValues,
    } = domain;

    const indexAxis = isHorizontal ? bottom : left;
    const indexScaleType = indexAxis!.scaleType;
    const indexDataKey = metadata!.index;

    const min = isHorizontal ? x0 : y0;
    const max = isHorizontal ? x1 : y1;
    const domainValues = isHorizontal ? xValues : yValues;

    if (indexScaleType === 'label') {
      filteredData = data.filter((d) => {
        const value = getPrimitiveFromObjectByPath(d, indexDataKey);
        return domainValues!.includes(value);
      });
    }

    if (indexScaleType === 'time') {
      filteredData = data.filter((d) => {
        const value = getPrimitiveFromObjectByPath(d, indexDataKey);
        const toTime = value ? new Date(value).getTime() : 0;
        return toTime >= min && toTime <= max;
      });
    }

    if (indexScaleType === 'linear') {
      filteredData = data.filter((d) => {
        const value = getPrimitiveFromObjectByPath(d, indexDataKey);
        const v = typeof value === 'number' ? value : (min - 1);
        return v >= min && v <= max;
      });
    }

    onChange(filteredData);
  }, [bottom, left, data, isHorizontal, metadata, onChange]);

  useEffect(() => {
    handleBrushReset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHorizontal]);

  return {
    ref: brushRef,
    brushDirection,
    brushHeight,
    brushWidth,
    initialBrushPosition,
    margin,
    position: {
      left: leftPosition,
      top: topPosition,
    },
    resizeTriggerAreas,
    scale: {
      x: axisSystem?.bottom?.scale,
      y: axisSystem.left?.scale,
    },
    style,
    handleBrushClear,
    handleBrushChange,
  };
};
