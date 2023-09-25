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

import { NumberValue } from '@visx/vendor/d3-scale';
import _ from 'lodash';

export const getLocales = (
  value: string | string[],
  defaultLocales = 'en-US',
) => {
  try {
    // @ts-expect-error: missing Intl d.ts declaration
    return Intl.getCanonicalLocales(value);
  } catch (err: unknown) {
    // eslint-disable-next-line no-console
    console.error(err);
    return defaultLocales;
  }
};

export const formatNumber = (
  value: number,
  locales = 'en-US',
  options = { maximumSignificantDigits: 3 },
) => new Intl.NumberFormat(getLocales(locales), options).format(value);

export const formatDate = (
  value: Date,
  locales = 'en-US',
  options = { year: '2-digit', month: '2-digit', day: '2-digit' } as any,
) => new Intl.DateTimeFormat(getLocales(locales), options).format(value).replaceAll('/', '-');

export const formatValue = (
  value: string | NumberValue | Date,
  locales = 'en-US',
  options?: any,
) => {
  if (typeof value === 'number') return formatNumber(value, locales, options);
  if (_.isDate(value)) return formatDate(value, locales, options);
  return value;
};

export const truncate = (
  text: string,
  options: {
    length?: number;
    omission?: string;
    separator?: RegExp | string;
  } = {
    length: 20,
    omission: '...',
  },
) => _.truncate(text, options);
