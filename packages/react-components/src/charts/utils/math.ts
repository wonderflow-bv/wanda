import _ from 'lodash';

export const isArrayOfNumber = (arr: any[]) => Array.isArray(arr) && arr.length > 0 && arr.every(el => typeof el === 'number');
export const isArrayOfDate = (arr: any[]) => Array.isArray(arr) && arr.length > 0 && arr.every(el => _.isDate(el));

export const getMinMaxNumber = (values: number[]) => {
  if (isArrayOfNumber(values)) return [Math.min(...values), Math.max(...values)];
  return undefined;
};

export const getMinMaxDate = (values: Array<number | Date>) => {
  const isNumbers = isArrayOfNumber(values);
  const isDates = isArrayOfDate(values);
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
