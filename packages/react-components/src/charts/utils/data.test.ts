
import { extractDataFromArray, getValueFromKeyRecursively } from './data';

const data = [
  {
    user: 'joe',
    age: 36,
    active: true,
    nested: {
      num: 1, str: 'inner-joe', arr: [1, 2, 3], obj: { a: 1 },
    },
    series: [
      { value: 100, percentage: 30 },
      { value: 90, percentage: 26 },
      { value: 30, percentage: 8 },
    ],
  },
  {
    user: 'john',
    age: 40,
    active: false,
    nested: {
      num: 2, str: 'inner-john', arr: [3, 4, 5], obj: { a: 2 },
    },
    series: [
      { value: 98, percentage: 28 },
      { value: 81, percentage: 23 },
      { value: 34, percentage: 3 },
    ],
  },
  {
    user: 'bob',
    age: 1,
    active: true,
    nested: {
      num: 3, str: 'inner-bob', arr: [6, 7, 8], obj: { a: 3 },
    },
    series: [
      { value: 85, percentage: 21 },
      { value: 77, percentage: 12 },
      { value: 28, percentage: 4 },
    ],
  },
];

describe('getValueFromKeyRecursive()', () => {
  it('should return a nested numeric value', () => {
    const res = getValueFromKeyRecursively(data[0], 'a');
    expect(res).toBe(1);
  });
  it('should return a nested string value', () => {
    const res = getValueFromKeyRecursively(data[0], 'str');
    expect(res).toBe('inner-joe');
  });
  it('should return a nested array value', () => {
    const res = getValueFromKeyRecursively(data[0], 'arr');
    expect(res).toEqual([1, 2, 3]);
  });
  it('should return a nested object value', () => {
    const res = getValueFromKeyRecursively(data[0], 'obj');
    expect(res).toEqual({ a: 1 });
  });
  it('should return a first level value', () => {
    const res = getValueFromKeyRecursively(data[0], 'user');
    expect(res).toBe('joe');
  });
  it('should return undefined for missing keys', () => {
    const res = getValueFromKeyRecursively(data[0], 'none');
    expect(res).toBe(undefined);
  });
  it('should return an array of values', () => {
    const res = getValueFromKeyRecursively(data[0], 'value');
    expect(res).toStrictEqual([100, 90, 30]);
  });
});

describe('extractDataFromArray()', () => {
  it('should return a nested value from array', () => {
    const res = extractDataFromArray(data, 'a');
    expect(res).toEqual([1, 2, 3]);
  });

  it('should return a nested array', () => {
    const res = extractDataFromArray(data, 'value');
    const exp = [
      [100, 90, 30],
      [98, 81, 34],
      [85, 77, 28],
    ];
    expect(res).toStrictEqual(exp);
  });

  it('should return a nested array of objects', () => {
    const res = extractDataFromArray(data, 'series');
    const exp = [
      [
        { percentage: 30, value: 100 },
        { percentage: 26, value: 90 },
        { percentage: 8, value: 30 },
      ],
      [
        { percentage: 28, value: 98 },
        { percentage: 23, value: 81 },
        { percentage: 3, value: 34 },
      ],
      [
        { percentage: 21, value: 85 },
        { percentage: 12, value: 77 },
        { percentage: 4, value: 28 },
      ],
    ];
    expect(res).toStrictEqual(exp);
  });
});

