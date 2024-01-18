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

import { Brush } from '@visx/brush';
import BaseBrush, { BaseBrushState, UpdateBrush } from '@visx/brush/lib/BaseBrush';
import { BrushHandleRenderProps } from '@visx/brush/lib/BrushHandle';
import { Bounds, ResizeTriggerAreas } from '@visx/brush/lib/types';
import { Group } from '@visx/group';
import _ from 'lodash';
import {
  useCallback, useEffect,
  useMemo,
  useRef,
} from 'react';

import {
  useDataContext, useLayoutContext, useStyleConfigContext, useThemeContext,
} from '../../providers';
import { CartesianxAxisSystem, Data } from '../../types';
import { getPrimitiveFromObjectByPath } from '../../utils';

export type CartesianBaseBrushProps = {
  axisSystem: CartesianxAxisSystem;
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

const BrushHandle = ({
  x, y, height, isBrushActive,
}: BrushHandleRenderProps) => {
  const { isHorizontal } = useLayoutContext();
  const { brush, themes } = useStyleConfigContext();
  const theme = useThemeContext();

  const pathWidth = 8;
  const pathHeight = 15;

  const lPos = isHorizontal ? (x + pathWidth / 2) : (x + pathHeight * 2);
  const tPos = isHorizontal ? (height - pathHeight) / 2 : (y + pathWidth / 2);

  const style = {
    stroke: themes[theme].brush.handle.stroke,
    strokeWidth: brush.handle.strokeWidth,
    fill: themes[theme].brush.handle.fill,
    cursor: isHorizontal
      ? { cursor: 'col-resize' }
      : { cursor: 'row-resize' },
    transform: isHorizontal
      ? 'rotate(0)'
      : 'rotate(90)',
  };

  if (!isBrushActive) {
    return null;
  }

  return (
    <Group
      left={lPos}
      top={tPos}
    >
      <path
        fill={style.fill}
        d="M -4.5 0.5 L 3.5 0.5 L 3.5 15.5 L -4.5 15.5 L -4.5 0.5 M -1.5 4 L -1.5 12 M 0.5 4 L 0.5 12"
        stroke={style.stroke}
        strokeWidth={style.strokeWidth}
        style={style.cursor}
        transform={style.transform}
      />
    </Group>
  );
};

export const CartesianBaseBrush: React.FC<CartesianBaseBrushProps> = ({
  axisSystem,
  dimension,
  isVisible = false,
  position,
  onChange,
}) => {
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

  const brushDirection = isHorizontal ? 'horizontal' : 'vertical';
  const resizeTriggerAreas: ResizeTriggerAreas[] = isHorizontal ? ['left', 'right'] : ['top', 'bottom'];

  const padding = 16;
  const brushSize = 50 - padding;
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

  if (!isVisible) return null;

  return (
    <Group
      left={leftPosition}
      top={topPosition}
    >
      <defs>
        <pattern id="brush_pattern_lines" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform={style.pattern.transform}>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#cartesian-grid-background)" />
          <path d="M0 10h20z" strokeWidth={style.pattern.strokeWidth} stroke={style.pattern.stroke} fill={style.pattern.fill} />
        </pattern>
      </defs>

      <rect
        x={0}
        y={0}
        width={brushWidth}
        height={brushHeight}
        fill="url(#brush_pattern_lines)"
        style={{ pointerEvents: 'all', cursor: 'move' }}
      />

      <Brush
        brushDirection={brushDirection}
        brushRegion="chart"
        handleSize={8}
        innerRef={brushRef}
        initialBrushPosition={initialBrushPosition}
        margin={margin}
        onBrushStart={undefined}
        onBrushEnd={undefined}
        onChange={handleBrushChange}
        onClick={handleBrushClear}
        resizeTriggerAreas={resizeTriggerAreas}
        selectedBoxStyle={style.selectedBox}
        xAxisOrientation="bottom"
        yAxisOrientation="left"
        xScale={bottom?.scale}
        yScale={left?.scale}
        renderBrushHandle={(props: BrushHandleRenderProps) => <BrushHandle {...props} />}
        useWindowMoveEvents
        width={brushWidth}
        height={brushHeight}
      />
    </Group>
  );
};

CartesianBaseBrush.displayName = 'CartesianBaseBrush';
