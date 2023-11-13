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

import { AxisType, Data, LineChartRenderType } from '../types';
import { getPrimitiveFromObjectPath } from './data';

export const accessor = (axis: AxisType, dataKey: string, datum?: Record<string, unknown>) => {
  if (axis.scale && datum) {
    const d = getPrimitiveFromObjectPath(datum, dataKey);
    if (!_.isNil(d)) {
      const t = axis.scaleType === 'time' ? new Date(d) : d;
      return axis.scale(t as any);
    }
  }

  return undefined;
};

export const accessorInvert = (axis?: AxisType, value?: number) => {
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
    indexAxis: AxisType;
    indexDataKey: string;
    otherAxis: AxisType;
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

export const isMarkerLabelActive = (index: number, numLabels: number, maxLabels = 12) => {
  const step = Math.ceil(numLabels / maxLabels);
  const half = Math.round(numLabels / 2);
  const leftIndex = [];
  for (let i = 0; i < half; i += step) leftIndex.push(i);
  const rightIndex = leftIndex.map(e => numLabels - e);
  const allIndex = leftIndex.concat(rightIndex).sort((a, b) => a - b);
  return allIndex.includes(index);
};

export const createSubArrays = (
  arr: Array<Record<string, any>>,
  condition: (d: Record<string, any>) => boolean,
) => arr.reduce((acc, cur) => {
  if (condition(cur)) {
    if (acc.length > 0 && acc[acc.length - 1].length > 0) {
      acc.push([]);
    }
  } else if (acc.length === 0 || acc[acc.length - 1].length === 0) {
    acc.push([cur]);
  } else {
    acc[acc.length - 1].push(cur);
  }

  return acc;
}, []) as Array<Array<Record<string, any>>>;

export const createSubPaths = (
  data: Data,
  condition: (d: Record<string, any>) => boolean,
) => {
  const subArray = createSubArrays(data, condition);

  if (!subArray[0].length) subArray.shift();
  if (!subArray[subArray.length - 1].length) subArray.pop();

  if (subArray.length > 1) {
    return subArray.map((a: Array<Record<string, any>>, i: number) => {
      const len = a.length;
      const prev = i - 1;
      const post = i + 1;
      if (!len) return [subArray[prev][subArray[prev].length - 1], subArray[post][0]];
      return a;
    });
  }

  return subArray;
};
