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

import {
  curveLinear, curveMonotoneX, curveMonotoneY, curveStepAfter, curveStepBefore,
} from '@visx/curve';
import { bisector } from '@visx/vendor/d3-array';
import { ScaleLinear, ScaleTime } from '@visx/vendor/d3-scale';
import _ from 'lodash';

import {
  CartesianAxis, Data, LineChartRenderType, Theme,
} from '../types';
import { getPrimitiveFromObjectByPath } from './data';

export const accessor = (axis: CartesianAxis, dataKey: string, datum?: Record<string, unknown>) => {
  if (axis.scale && datum) {
    const d = getPrimitiveFromObjectByPath(datum, dataKey);
    if (!_.isNil(d)) {
      const t = axis.scaleType === 'time' ? new Date(d) : d;
      return axis.scale(t as any);
    }
  }

  return undefined;
};

export const accessorInvert = (axis?: CartesianAxis, value?: number) => {
  let res;

  if (axis && value) {
    const {
      orientation, top, left, scale, scaleType,
    } = axis;

    const isVertical = orientation === 'left' || orientation === 'right';
    const offset = isVertical ? top : left;
    const num = value - offset;

    if (scaleType !== 'label') {
      const s = scale as ScaleLinear<number, number> | ScaleTime<number, number>;
      res = s.invert(num);
    } else {
      const [from, to] = scale.range();
      const min = Math.min(from, to);
      const max = Math.max(from, to);
      const divider = axis.numTicks ?? axis.domain.length;
      const bandwidth = (max - min) / divider;
      // @ts-expect-error: method not expected
      const padding = scale.padding() ? bandwidth / 2 : 0;
      const i = Math.round((num - padding) / bandwidth);
      const len = axis.domain.length;
      res = isVertical ? axis.domain[len - i] : axis.domain[i];
    }
  }

  return res;
};

export const bisectIndex = bisector((index: string | number) => new Date(index)).right;

export const getCoordinates = (
  {
    datum,
    indexAxis,
    indexDataKey,
    otherAxis,
    otherDataKey,
    isHorizontal,
  }: {
    datum: Record<string, unknown>;
    indexAxis: CartesianAxis;
    indexDataKey: string;
    otherAxis: CartesianAxis;
    otherDataKey: string;
    isHorizontal: boolean;
  },
) => {
  const i = accessor(indexAxis, indexDataKey, datum);
  const o = accessor(otherAxis, otherDataKey, datum);

  return isHorizontal
    ? { x: i, y: o }
    : { x: o, y: i };
};

export const getLinesRenderer = (renderAs: LineChartRenderType | undefined, isHorizontal: boolean) => {
  const whichMonotone = isHorizontal ? curveMonotoneX : curveMonotoneY;
  const whichStep = isHorizontal ? curveStepAfter : curveStepBefore;

  if (renderAs === 'curves') return whichMonotone;
  if (renderAs === 'lines') return curveLinear;
  return whichStep;
};

export const isMarkerLabelVisible = (index: number, totalLabels: number, maxLabels = 12) => {
  const divider = maxLabels > 1 ? maxLabels : 1;
  const step = Math.ceil(totalLabels / divider);
  const half = Math.round(totalLabels / 2);
  const leftIndex = [];
  for (let i = 0; i < half; i += step) leftIndex.push(i);
  const rightIndex = leftIndex.map(e => totalLabels - e);
  const allIndex = leftIndex.concat(rightIndex).sort((a, b) => a - b);
  return allIndex.includes(index);
};

export const getMarkerLabelProps = (
  pos: { x: number | undefined; y: number | undefined },
  dimension: { maxWidth: number ; maxHeight: number },
  isHorizontal: boolean,
  theme: Theme,
) => {
  const { maxWidth, maxHeight } = dimension;

  const main = {
    anchor: 'middle' as 'middle' | 'start' | 'end' | 'inherit' | undefined,
    verticalAnchor: 'end' as 'end' | 'middle' | 'start' | undefined,
    fontColor: theme.markerLabel.fontColor,
    fontSize: 12,
    fontWeight: 400,
    background: theme.markerLabel.background,
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
    const isLeft = pos.x < (maxWidth * 0.075);
    const isRigth = pos.x > (maxWidth * 0.9);
    const isTop = pos.y < (maxHeight * 0.075);
    const isBottom = pos.y > (maxHeight * 0.9);

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

export const createSubArrays = (
  arr: Array<Record<string, unknown>>,
  condition: (d: Record<string, unknown>) => boolean,
) => arr.reduce((acc: Array<Array<Record<string, unknown>>>, cur: Record<string, unknown>) => {
  const items = acc.length;
  const lastIndex = acc.length - 1;

  if (condition(cur)) {
    if (items > 0 && acc[lastIndex].length > 0) {
      acc.push([]);
    }
  } else if (items === 0 || acc[lastIndex].length === 0) {
    acc.push([cur]);
  } else {
    acc[lastIndex].push(cur);
  }

  return acc;
}, []);

export const createSubPaths = (
  data: Data,
  condition: (d: Record<string, unknown>) => boolean,
) => {
  const subArray = createSubArrays(data, condition);

  if (!subArray[0].length) subArray.shift();
  if (!subArray[subArray.length - 1].length) subArray.pop();

  if (subArray.length > 1) {
    return subArray.map((a: Array<Record<string, unknown>>, i: number) => {
      const len = a.length;

      const prev = i - 1;
      const post = i + 1;

      if (!len) {
        const arrPrev = subArray[prev];
        const arrPrevLast = arrPrev.length - 1;

        const fromPrev = arrPrev[arrPrevLast];
        const fromPost = subArray[post][0];

        return [fromPrev, fromPost];
      }

      return a;
    });
  }

  return subArray;
};
