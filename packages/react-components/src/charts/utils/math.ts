import _ from 'lodash';

export const isArrayTypeString = (arr: any[]) => Array.isArray(arr) && arr.length > 0 && arr.every(el => typeof el === 'number');
export const isArrayTypeNumber = (arr: any[]) => Array.isArray(arr) && arr.length > 0 && arr.every(el => typeof el === 'number');
export const isArrayTypeDate = (arr: any[]) => Array.isArray(arr) && arr.length > 0 && arr.every(el => _.isDate(el));

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

  if (dates) {
    const [min, max] = dates;
    return [new Date(min), new Date(max)];
  }

  return undefined;
};

export const getMaxCharactersNum = (values: Array<string | number>) => {
  if (values.length === 0) return 0;
  const isNumbers = isArrayTypeNumber(values);

  const max = values.map(el => String(el)).sort((a, b) => b.length - a.length)[0].length;

  if (isNumbers) {
    const diff = Math.max(...values as number[]) - Math.min(...values as number[]);
    return diff >= 10 ? max : max + 2;
  }

  return max;
};
