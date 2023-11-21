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
import { Except } from 'type-fest';

import {
  AxisProps, Data, LineChartIndex, LineChartSeries,
} from '../types';
import { inferScaleTypeFromDomain } from './axis';
import {
  getMinMaxDate, getMinMaxNumber,
  removeNilValuesFromArray,
} from './math';

export const getValueFromObjectByPath = (object: Record<string, any>, path: string) => _.at(object, path)[0];

export const getPrimitiveFromObjectByPath = (object: Record<string, any>, path: string) => {
  const value = getValueFromObjectByPath(object, path);
  return (_.isString(value) || _.isNumber(value)) ? value : undefined;
};

export const getLabelFromPath = (path: string) => {
  const notation = path.split('.');

  let res = notation[0];

  if (notation.length > 1) {
    const parent = notation.at(-2);
    res = parent ?? res;
  }

  const regex = /([a-zA-Z]+)\[(\d+)\]/;
  const replacer = (_match: any, name: string, index: number) => `${name}-${index}`;

  return res.replace(regex, replacer);
};

export const getPrimitivesFromObjectArrayByPath = (
  arr: Array<Record<string, unknown>>,
  path: string,
) => arr.map(o => getPrimitiveFromObjectByPath(o, path));

export const handleDomainAndScaleType = (
  data: Data,
  axis: LineChartIndex | LineChartSeries,
): Except<AxisProps, 'orientation'> => {
  const { scaleType, dataKey, domain } = axis;

  const keys = typeof dataKey === 'string' ? [dataKey] : dataKey;

  const domainData = _.flattenDeep<Array<string | number | undefined>>(
    keys.map((k: string) => getPrimitivesFromObjectArrayByPath(data, k)),
  );

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
  } else if (st === 'linear') {
    const minMaxNum = getMinMaxNumber(d as number[]);
    if (minMaxNum) {
      const [min, max] = minMaxNum;
      d = [min, _.ceil(max * 1.05)];
    }
  }

  return {
    ...axis,
    domain: d,
    scaleType: st,
  };
};
