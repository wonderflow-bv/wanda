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
import { Data, ScaleType } from '../types';
import { inferScaleTypeFromDomain } from './axis';
import { getMinMaxDate, getMinMaxNumber, isArrayTypeString } from './math';

export const getValueFromKey = (
  object: Record<string, unknown>,
  key: string,
) => {
  let r = object[key];

  if (_.isUndefined(r)) {
    Object.entries(object)
      .filter(arr => _.isObject(arr[1]) && !_.isArray(arr[1]) && !_.isNil(arr[1]))
      .forEach((arr) => {
        const m = getValueFromKey(arr[1] as Record<string, unknown>, key);
        r = m ?? r;
      });
  }

  return r;
};

export const getPrimitiveFromKey = (
  object: Record<string, unknown>,
  key: string,
) => {
  const r = getValueFromKey(object, key);
  const isNumberOrString = typeof r === 'number' || typeof r === 'string';
  return isNumberOrString ? r : undefined;
};

export const extractDataFromArray = (
  arr: Array<Record<string, unknown>>,
  key: string,
) => arr.map(e => getValueFromKey(e, key));

export const extractPrimitivesFromArray = (
  arr: Array<Record<string, unknown>>,
  key: string,
) => arr.map(e => getPrimitiveFromKey(e, key));

export const extractDomainFromData = (
  data: Data,
  axis: { scaleType?: ScaleType; dataKey: string | string[] },
  override?: Array<string | number>,
) => {
  const { scaleType, dataKey } = axis;

  const dk = typeof dataKey === 'string' ? [dataKey] : dataKey;
  const domainData = _.flattenDeep(dk.map(k => extractPrimitivesFromArray(data, k)));

  let domain: Array<string | number> = [];

  if (isArrayTypeString(domainData)) {
    domain = domainData.map(e => (e ? `${e}` : ''));
  } else {
    domain = _.uniq(domainData).filter((d): d is string | number => !_.isNil(d));
  }

  const st = inferScaleTypeFromDomain(domain, scaleType);

  if (override?.length === 2) {
    if (st === 'label') {
      domain = override;
    }

    if (st === 'time') {
      const minMaxDate = getMinMaxDate(domain);
      if (minMaxDate) {
        const [oldMin, oldMax] = minMaxDate;
        const [newMin, newMax] = override;
        const nMin = new Date(newMin).getTime();
        const nMax = new Date(newMax).getTime();
        const oMin = oldMin.getTime();
        const oMax = oldMax.getTime();
        const low = nMin < oMin ? newMin : oldMin.toUTCString();
        const high = nMax > oMax ? newMax : oldMax.toUTCString();
        domain = [low, high];
      }
    }

    if (st === 'linear') {
      const minMaxNum = getMinMaxNumber(domain as number[]);
      if (minMaxNum) {
        const [oldMin, oldMax] = minMaxNum;
        const [newMin, newMax] = override;
        const nMin = Number(newMin);
        const nMax = Number(newMax);
        const low = nMin < oldMin ? nMin : oldMin;
        const high = nMax > oldMax ? nMax : oldMax;
        domain = [low, high];
      }
    }
  }

  return domain;
};

export const handleData = (
  data: Data,
  axis: LineChartIndex | LineChartSeries,
): AxisProps => {
  const { scaleType, dataKey, domain } = axis;

  const dk = typeof dataKey === 'string' ? [dataKey] : dataKey;
  const domainData = _.flattenDeep(dk.map(k => extractPrimitivesFromArray(data, k)));

  let d: Array<string | number> = [];

  if (isArrayTypeString(domainData)) {
    d = domainData.map(e => (e ? `${e}` : ''));
  } else {
    d = _.uniq(domainData).filter((d): d is string | number => !_.isNil(d));
  }

  const st = inferScaleTypeFromDomain(d, scaleType);

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
