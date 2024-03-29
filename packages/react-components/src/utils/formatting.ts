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

import { Currency } from '../components/product-card/product-card-kpis/product-card-kpis';

export const getCurrency = (currency?: Currency) => {
  switch (currency) {
    case 'EUR':
      return '€';
    case 'USD':
      return '$';
    case 'GBP':
      return '£';
    case 'JPY':
    case 'CNY':
      return '¥';
    default:
      return '';
  }
};

export const formatPriceRangeValues = (
  p1?: number,
  p2?: number,
  option: {
    currency?: Currency;
    decimals: number;
  } = { currency: 'EUR', decimals: 2 },
) => {
  const { currency, decimals: decimal } = option;
  const isP1Number = typeof p1 === 'number';
  const isP2Number = typeof p2 === 'number';

  if (isP1Number && isP2Number) {
    const min = Math.min(p1, p2).toFixed(decimal);
    const max = Math.max(p1, p2).toFixed(decimal);
    return (`${min} - ${max} ${getCurrency(currency)}`).trim();
  }

  if (isP1Number || isP2Number) {
    const val = isP1Number ? p1.toFixed(decimal) : p2!.toFixed(decimal);
    return (`${val} ${getCurrency(currency)}`).trim();
  }

  return undefined;
};

export const clampValue = (value: number, minRange?: number, maxRange?: number) => {
  const isMin = typeof minRange === 'number';
  const isMax = typeof maxRange === 'number';
  let newMin = value;
  let newMax = value;
  if (isMin) newMin = minRange;
  if (isMax) newMax = maxRange;
  if (value < newMin) return newMin;
  if (value > newMax) return newMax;
  return value;
};

export const formatKpiValue = (
  value?: number,
  option: {
    decimal: number;
    minRange?: number;
    maxRange?: number;
    cap?: number;
  } = { decimal: 0, minRange: 0 },
) => {
  const {
    decimal, minRange, maxRange, cap,
  } = option;

  const hasValue = typeof value === 'number';
  const d = typeof decimal === 'number' && decimal > 0 ? decimal : 0;

  if (hasValue) {
    const res = clampValue(value, minRange, maxRange).toFixed(d);

    if (typeof cap === 'number' && cap > 0) {
      const c = clampValue(cap, minRange, maxRange).toFixed(d);
      return `${res} / ${c}`;
    }

    return res;
  }

  return '';
};

export const isValueOverCap = (value?: number, cap?: number) => !!(typeof value === 'number' && typeof cap === 'number' && value > cap && cap > 0);

export const isGreaterThan = (threashold: number, value?: number) => (typeof value === 'number' && value > threashold);
