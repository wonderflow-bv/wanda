import { extractDataFromArray, getValueFromKey } from './data';

const data = [
  {
    user: 'joe',
    age: 36,
    active: true,
    value: {
      num: 1, str: 'inner-joe', arr: [1, 2, 3], obj: { a: 1 },
    },
  },
  {
    user: 'john',
    age: 40,
    active: false,
    value: {
      num: 2, str: 'inner-john', arr: [3, 4, 5], obj: { a: 2 },
    },
  },
  {
    user: 'bob',
    age: 1,
    active: true,
    value: {
      num: 3, str: 'inner-bob', arr: [6, 7, 8], obj: { a: 3 },
    },
  },
];

describe('getValueFromKey()', () => {
  it('should return a nested numeric value', () => {
    const res = getValueFromKey(data[0], 'a');
    expect(res).toBe(1);
  });
  it('should return a nested string value', () => {
    const res = getValueFromKey(data[0], 'str');
    expect(res).toBe('inner-joe');
  });
  it('should return a nested array value', () => {
    const res = getValueFromKey(data[0], 'arr');
    expect(res).toEqual([1, 2, 3]);
  });
  it('should return a nested object value', () => {
    const res = getValueFromKey(data[0], 'obj');
    expect(res).toEqual({ a: 1 });
  });
  it('should return a first level value', () => {
    const res = getValueFromKey(data[0], 'user');
    expect(res).toBe('joe');
  });

  it('should return undefined for missing keys', () => {
    const res = getValueFromKey(data[0], 'none');
    expect(res).toBe(undefined);
  });
});

describe('extractDataFromArray()', () => {
  it('should return a nested value from array', () => {
    const res = extractDataFromArray(data, 'a');
    expect(res).toEqual([1, 2, 3]);
  });
});
