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
import { ChartDataModel, Data, DataAccessorConfig } from '../types';
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

export const handleDomainAndScaleType = (
  data: Data,
  axis: LineChartIndex | LineChartSeries,
): AxisProps => {
  const { scaleType, dataKey, domain } = axis;
  const keys = typeof dataKey === 'string' ? [dataKey] : dataKey;
  const domainData = _.flattenDeep(keys.map(k => extractPrimitivesFromArray(data, k)));

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

export const createDataModel = (
  data: Array<Record<string, unknown>>,
  config: DataAccessorConfig,
): ChartDataModel[] => {
  const createSeries = (datum: Record<string, unknown>) => {
    const { dataKey, from, name } = config.series;

    const source = from ? datum[from] : datum;

    if (Array.isArray(source)) {
      return source.map((s: unknown, i: number) => {
        if (_.isObject(s)) {
          const o: Record<string, unknown> = { ...s };

          const v = o[dataKey[0]];
          const value = (typeof v === 'string' || typeof v === 'number') ? v : undefined;

          const getName = () => {
            const hasName = Boolean(name?.length);
            const hasOwnNameProp = Boolean(name?.length && (typeof o[name[0]] === 'string' || typeof o[name[0]] === 'number'));

            if (hasOwnNameProp) {
              const n = o[name![0]] as string | number;
              return `${n}`;
            }

            if (hasName) return name![i];
            return `series${i}`;
          };

          return ({
            ...o,
            name: getName(),
            value,
          });
        }

        return {
          name: `series${i}`,
          value: undefined,
        };
      });
    }

    return dataKey.map((k: string, i: number) => {
      const v = datum[dataKey[i]];
      const value = (typeof v === 'string' || typeof v === 'number') ? v : undefined;

      return ({
        name: name ? name[i] : k,
        value,
      });
    });
  };

  return data.map(d => ({
    index: getPrimitiveFromKey(d, config.index.dataKey) ?? 'no value',
    overlay: undefined,
    series: createSeries(d),
  }));
};
