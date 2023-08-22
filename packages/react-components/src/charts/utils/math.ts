import _ from 'lodash';

export type ValidTypeOf = 'undefined'| 'object'| 'boolean'| 'number'| 'string'| 'function'| 'symbol'| 'bigint';

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

export const getMaxCharactersNum = (values: Array<string | number>) => {
  if (!values.length) return 0;

  const isNumbers = isArrayTypeNumber(values);

  if (isNumbers) {
    const minMax = getMinMaxNumber(values as number[]);
    if (minMax !== undefined) {
      const [min, max] = minMax;
      const diff = max - min;
      if (diff > 0 && diff < 10) {
        return max.toFixed(1).length;
      }
    }
  }

  const max = values.map(el => `${el}`).sort((a, b) => b.length - a.length)[0].length;

  return max;
};
