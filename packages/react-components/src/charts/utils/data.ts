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

export const getValueFromObjectPath = (object: Record<string, unknown>, path: string) => _.at(object, path)[0];

export const getPrimitiveFromObjectPath = (object: Record<string, unknown>, path: string) => {
  const value = getValueFromObjectPath(object, path);
  return (_.isString(value) || _.isNumber(value)) ? value : undefined;
};

export const getLabelFromObjectPath = (path: string) => {
  const notation = path.split('.');

  let res = notation[0];

  if (notation.length > 1) {
    const parent = notation.at(-2);
    res = parent ?? res;
  }

  const regex = /([a-zA-Z]+)\[(\d+)\]/;
  const replacer = (match: any, name: string, index: number) => `${name}-${index}`;

  return res.replace(regex, replacer);
};

export const createDataModel = (
  data: Array<Record<string, unknown>>,
  config: DataAccessorConfig,
): ChartDataModel[] => {
  const { dataKey: indexKey } = config.index;

  const createSeries = (datum: Record<string, unknown>) => {
    const { dataKey: seriesKeys, from, name: seriesName } = config.series;

    const seriesArray = from ? _.at(datum, from) : undefined;
    const hasValidArray = Array.isArray(seriesArray) && isArrayTypeObject(seriesArray);

    if (hasValidArray) {
      return seriesArray?.flat().map((s: unknown, i: number) => {
        if (_.isObject(s)) {
          const o: Record<string, unknown> = { ...s };

          const v = o[seriesKeys[0]];
          const value = (_.isString(v) || _.isNumber(v)) ? v : undefined;

          const getName = () => {
            const hasNameArray = Boolean(seriesName?.length);

            const firstName = seriesName?.length ? seriesName[0] : undefined;
            const hasOwnNameProp = Boolean(firstName && (_.isString(o[firstName]) || _.isNumber(o[firstName])));

            if (hasOwnNameProp) {
              const n = o[firstName!] as string | number;
              return `${n}`;
            }

            if (hasNameArray) return seriesName![i];

            return `series${i}`;
          };

          return ({
            ...o,
            name: getName(),
            value,
          });
        }

        return {
          name: 'unknown series',
          value: undefined,
        };
      });
    }

    return seriesKeys.map((k: string, i: number) => {
      const name = seriesName?.length ? seriesName[i] : k;

      const v = datum[k];
      const value = (_.isNumber(v) || _.isString(v)) ? v : undefined;

      return ({
        name,
        value,
      });
    });
  };

  const createOverlay = (datum: Record<string, unknown>) => {
    const overlayKey = config.overlay?.dataKey;
    const overlayFrom = config.overlay?.from;
    const overlayName = config.overlay?.name;

    if (overlayKey) {
      if (overlayFrom) {
        const f = datum[overlayFrom];
        if (_.isObject(f)) {
          const o: Record<string, unknown> = { ...f };
          const v = o[overlayKey];
          const value = (_.isString(v) || _.isNumber(v)) ? v : undefined;

          const n = overlayName ? o[overlayName] : overlayName;
          const name = (_.isString(n) || _.isNumber(n)) ? `${n}` : 'overlay';

          return {
            name,
            value,
          };
        }
      }

      const v = datum[overlayKey];
      const value = (_.isString(v) || _.isNumber(v)) ? v : undefined;

      return {
        name: overlayKey,
        value,
      };
    }

    return undefined;
  };

  return data.map(d => ({
    index: getPrimitiveFromKey(d, indexKey) ?? 'no index',
    series: createSeries(d),
    overlay: createOverlay(d),
  }));
};
