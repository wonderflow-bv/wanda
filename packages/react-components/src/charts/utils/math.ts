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

import { TickFormatter } from '@visx/axis/lib/types';
import { NumberValue } from '@visx/vendor/d3-scale';
import _ from 'lodash';

// import { Axis } from '../components/cartesian-base/cartesian-base';
import { ValidTypeOf } from '../types/main';
import { formatNumber } from './format';

export const isArrayType = (
  arr: unknown[],
  type: ValidTypeOf | 'date',
) => {
  if (type === 'date') return Array.isArray(arr) && arr.length > 0 && arr.every(el => _.isDate(el));
  // eslint-disable-next-line valid-typeof
  return Array.isArray(arr) && arr.length > 0 && arr.every(el => typeof el === type);
};

export const isArrayTypeString = (arr: any[]) => isArrayType(arr, 'string');
export const isArrayTypeNumber = (arr: any[]) => isArrayType(arr, 'number');
export const isArrayTypeDate = (arr: any[]) => isArrayType(arr, 'date');

export const getMinMaxNumber = (values: number[]) => {
  if (isArrayTypeNumber(values)) return [Math.min(...values), Math.max(...values)];
  return undefined;
};

export const getMinMaxDate = (values: Array<number | Date>) => {
  const isNumbers = isArrayTypeNumber(values);
  const isDates = isArrayTypeDate(values);
  let dates;

  if (isNumbers) {
    dates = getMinMaxNumber(values as number[]);
  }

  if (isDates) {
    const v = values as Date[];
    const n = v.map(date => date.getTime());
    dates = getMinMaxNumber(n);
  }

  return dates && [new Date(dates[0]), new Date(dates[1])];
};

export const getMaxCharactersNum = (
  domain: Array<string | number>,
  tickFormat?: TickFormatter<string | Date | NumberValue>,
) => {
  if (!domain.length) return 0;
  const isNumbers = isArrayTypeNumber(domain);

  let maxLen = 0;
  let diffLen = 0;

  if (tickFormat) {
    const formatObj = domain.map((e, i) => ({ value: e, index: i }));
    const domainFormatted = tickFormat ? domain.map((v, i) => tickFormat(v, i, formatObj)) : domain;
    const diff = domainFormatted.map((df, i) => (`${df as any}`).length - (`${domain[i]}`).length);
    const [highest] = diff.sort((a, b) => b - a);
    diffLen = highest;
  }

  if (isNumbers) {
    const minMax = getMinMaxNumber(domain as number[]);
    if (minMax !== undefined) {
      const [min, max] = minMax;
      const diff = max - min;

      if (diff && diff < 0.5) {
        maxLen = formatNumber(_.divide(diff, 10)).length;
      } else if (diff && diff < 10) {
        maxLen = formatNumber(_.multiply(diff, 10)).length;
      } else {
        maxLen = formatNumber(max).length;
      }
    }
  } else {
    maxLen = domain.map(el => `${el}`).sort((a, b) => b.length - a.length)[0].length;
  }

  return maxLen + diffLen;
};

// export const getTickLabelLengthOutOfScale = (axis: Axis) => {
//   const { scale, range } = axis;
//   const min = range ? range[0] : 0;
//   const max = range ? range[1] : 0;

//   return {
//     low: scale(min),
//     high: scale(max),
//   };
// };
