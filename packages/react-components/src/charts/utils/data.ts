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

import _ from 'lodash';

import { AxisProps } from '../components';
import { LineChartIndex, LineChartSeries } from '../components/line-chart/line-chart';
import { Data } from '../types';
import { inferScaleTypeFromDomain } from './axis';
import {
  getMinMaxDate, getMinMaxNumber, isArrayTypeObject,
  removeNilValuesFromArray,
} from './math';

export const getValueFromKeyRecursively = (
  object: Record<string, unknown>,
  key: string,
  maxDepth = 2,
) => {
  let r = object[key];

  if (_.isUndefined(r) && maxDepth) {
    const depth = maxDepth - 1;

    Object.values(object)
      .filter(v => _.isObject(v) && !_.isNil(v))
      .forEach((o) => {
        if (Array.isArray(o) && isArrayTypeObject(o)) {
          const arr = o.map(n => getValueFromKeyRecursively(n as Record<string, unknown>, key, depth)).filter(f => f);
          if (arr.length) r = arr;
        } else {
          r = getValueFromKeyRecursively(o as Record<string, unknown>, key, depth);
        }
      });
  }

  return r;
};

// export const getValueFromKey = (
//   object: Record<string, unknown>,
//   key: string,
// ) => {
//   let r = object[key];

//   if (_.isUndefined(r)) {
//     Object.entries(object)
//       .filter(arr => _.isObject(arr[1]) && !_.isArray(arr[1]) && !_.isNil(arr[1]))
//       .forEach((arr) => {
//         const m = getValueFromKey(arr[1] as Record<string, unknown>, key);
//         r = m ?? r;
//       });
//   }

//   return r;
// };

export const getPrimitiveFromKey = (
  object: Record<string, unknown>,
  key: string,
) => {
  const r = getValueFromKeyRecursively(object, key);
  const isNumberOrString = typeof r === 'number' || typeof r === 'string';
  return isNumberOrString ? r : undefined;
};

export const extractDataFromArray = (
  arr: Array<Record<string, unknown>>,
  key: string,
) => arr.map(e => getValueFromKeyRecursively(e, key));

export const extractPrimitivesFromArray = (
  arr: Array<Record<string, unknown>>,
  key: string,
) => arr.map(e => getPrimitiveFromKey(e, key));

export const handleDomainAndScaleTypeFromData = (
  data: Data,
  axis: LineChartIndex | LineChartSeries,
): AxisProps => {
  const { scaleType, dataKey, domain } = axis;
  const dk = typeof dataKey === 'string' ? [dataKey] : dataKey;
  const domainData = _.uniq(_.flattenDeep(dk.map(k => extractPrimitivesFromArray(data, k))));

  let d = removeNilValuesFromArray(domainData) as Array<string | number>;
  const st = inferScaleTypeFromDomain(domainData, scaleType);

  if (domain?.length) {
    if (st === 'label') {
      d = domain;
    }

    if (st === 'time') {
      const minMaxDate = getMinMaxDate(domain);
      if (minMaxDate) {
        const [oldMin, oldMax] = minMaxDate;
        const [newMin, newMax] = domain;
        const nMin = new Date(newMin).getTime();
        const nMax = new Date(newMax).getTime();
        const oMin = oldMin.getTime();
        const oMax = oldMax.getTime();
        const low = nMin < oMin ? newMin : oldMin.toUTCString();
        const high = nMax > oMax ? newMax : oldMax.toUTCString();
        d = [low, high];
      }
    }

    if (st === 'linear') {
      const minMaxNum = getMinMaxNumber(domain as number[]);
      if (minMaxNum) {
        const [oldMin, oldMax] = minMaxNum;
        const [newMin, newMax] = domain;
        const nMin = Number(newMin);
        const nMax = Number(newMax);
        const low = nMin < oldMin ? nMin : oldMin;
        const high = nMax > oldMax ? nMax : oldMax;
        d = [low, high];
      }
    }
  }

  return {
    ...axis,
    domain: d,
    scaleType: st,
  };
};

export const handleSeries = (
  data: Data,
  series: string[],
) => series.map((s) => {
  const d = extractPrimitivesFromArray(data, s);
  return ({ label: s, data: d });
});
