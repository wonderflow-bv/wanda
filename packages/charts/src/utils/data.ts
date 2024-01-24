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
  AxisProps,
  Data, LineChartIndex, LineChartOverlay, LineChartSeries,
} from '../types';
import { inferScaleTypeFromDomain } from './axis';
import { formatDate } from './format';
import {
  getMinMaxDate, getMinMaxNumber,
  removeNilsFromDomain,
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
    const parent = notation.at(-2)!;
    res = parent;
  }

  const regex = /([a-zA-Z]+)\[(\d+)\]/;
  const replacer = (_match: any, name: string, index: number) => `${name}-${index}`;

  return res.replace(regex, replacer);
};

export const getPrimitivesFromObjectArrayByPath = (
  arr: Array<Record<string, any>>,
  path: string,
) => arr.map(o => getPrimitiveFromObjectByPath(o, path));

export const removeKeysFromObject = (obj: Record<string, any>, keys: string[]) => {
  const copy: Record<string, any> = {};
  const allKeys = Object.keys(obj);

  allKeys.forEach((k: string) => {
    if (!keys.includes(k)) copy[k] = obj[k];
  });
  return copy;
};

export const handleAxisDomainAndScaleType = (
  data: Data,
  axis: LineChartIndex | LineChartSeries | LineChartOverlay,
): Except<AxisProps, 'orientation'> => {
  const hasData = !!data.length;
  let res: Record<string, any> = {
    ...axis,
    hideTickLabel: true,
    domain: [0, 1],
    scaleType: 'linear',
  };

  if (hasData) {
    const { scaleType, dataKey, domain } = axis;

    const keys = typeof dataKey === 'string' ? [dataKey] : dataKey;
    const primitivesFromArray = keys.map((k: string) => getPrimitivesFromObjectArrayByPath(data, k));
    const domainData = _.flattenDeep(primitivesFromArray);

    let ownDomain = removeNilsFromDomain(domainData);
    const st = inferScaleTypeFromDomain(domainData, scaleType);
    const hasCustomDomain = !!domain?.length;

    if (hasCustomDomain) {
      if (st === 'time') {
        const minMaxDate = getMinMaxDate(ownDomain);
        if (minMaxDate) {
          const [oldMin, oldMax] = minMaxDate;
          const [newMin, newMax] = domain;
          const nMin = new Date(newMin).getTime();
          const nMax = new Date(newMax).getTime();
          const oMin = oldMin.getTime();
          const oMax = oldMax.getTime();
          const low = nMin < oMin ? new Date(newMin) : oldMin;
          const high = nMax > oMax ? new Date(newMax) : oldMax;
          ownDomain = [formatDate(low), formatDate(high)];
        }
      }

      if (st === 'linear') {
        const minMaxNum = getMinMaxNumber(ownDomain as number[]);
        if (minMaxNum) {
          const [oldMin, oldMax] = minMaxNum;
          const [newMin, newMax] = domain;
          const nMin = Number(newMin);
          const nMax = Number(newMax);
          const low = nMin < oldMin ? nMin : oldMin;
          const high = nMax > oldMax ? nMax : oldMax;
          ownDomain = [low, high];
        }
      }
    } else if (st === 'linear') {
      const minMaxNum = getMinMaxNumber(ownDomain as number[]);
      if (minMaxNum) {
        const [min, max] = minMaxNum;
        ownDomain = [min, _.ceil(max * 1.05)];
      }
    }

    res = {
      ...axis,
      domain: ownDomain,
      scaleType: st,
    };
  }

  return removeKeysFromObject(res, ['dataKey', 'style', 'rename']) as Except<AxisProps, 'orientation'>;
};

export const handleChartDomainAndScaleType = (
  data: Data,
  index: LineChartIndex,
  series: LineChartSeries,
  overlay?: LineChartOverlay,
) => {
  const i = handleAxisDomainAndScaleType(data, index);
  const s = handleAxisDomainAndScaleType(data, series);
  const o = overlay
    ? handleAxisDomainAndScaleType(data, overlay)
    : undefined;

  return {
    index: i,
    series: s,
    overlay: o,
  };
};