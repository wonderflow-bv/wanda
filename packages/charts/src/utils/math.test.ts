import {
  getMaxCharactersNum,
  getMinMaxDate,
  getMinMaxNumber,
  isArrayType,
  isArrayTypeObject,
  isArrayTypeString,
  removeNilsFromDomain,
} from './math';

describe('getMaxCharactersNum()', () => {
  it('should return the right amount for integers', () => {
    const res = getMaxCharactersNum([100]);
    expect(res).toBe(3);
  });

  it('should return the right amount for integers', () => {
    const res = getMaxCharactersNum([0, 10000]);
    expect(res).toBe(6);
  });

  it('should return the right amount for floats', () => {
    const res = getMaxCharactersNum([0.1]);
    expect(res).toBe(4);
  });

  it('should return the right amount for floats', () => {
    const res = getMaxCharactersNum([0.1, 0.5]);
    expect(res).toBe(4);
  });

  it('should return the right amount for floats with a div < 10', () => {
    const res = getMaxCharactersNum([1, 9]);
    expect(res).toBe(3);
  });

  it('should return 0 for zero length array', () => {
    const res = getMaxCharactersNum([]);
    expect(res).toBe(0);
  });

  it('should return a correct value with a custom tick formatting', () => {
    const res = getMaxCharactersNum([0, 10], (v: any) => `£ ${v}`);
    expect(res).toBe(4);
  });

  it('should return a correct string values', () => {
    const res = getMaxCharactersNum(['xyz', 'abc']);
    expect(res).toBe(3);
  });
});

describe('getMinMaxNumber()', () => {
  it('should find min and max values', () => {
    const res = getMinMaxNumber([1, 10, 100]);
    expect(res).toEqual([1, 100]);
  });
  it('should find min and max values', () => {
    const res = getMinMaxNumber([100, 1, 10]);
    expect(res).toEqual([1, 100]);
  });
  it('should be undefined for zero length array', () => {
    const res = getMinMaxNumber([]);
    expect(res).toBe(undefined);
  });
});

describe('getMinMaxDate()', () => {
  it('should get min/max value with numbers array', () => {
    const d1 = new Date('2023-8-21').getTime();
    const d2 = new Date('2022-8-21').getTime();
    const res = getMinMaxDate([d1, d2]);
    const minTime = new Date(res![0]).getTime();
    const maxTime = new Date(res![1]).getTime();
    expect(maxTime - minTime).toBeTruthy();
  });

  it('should get min/max value with Dates array', () => {
    const d1 = new Date('2023-8-21');
    const d2 = new Date('2022-8-21');
    const res = getMinMaxDate([d1, d2]);
    const minTime = new Date(res![0]).getTime();
    const maxTime = new Date(res![1]).getTime();
    expect(maxTime - minTime).toBeTruthy();
  });

  it('should get min/max value with Dates string', () => {
    const d1 = '2023-8-21';
    const d2 = '2022-8-21';
    const res = getMinMaxDate([d1, d2]);
    const minTime = new Date(res![0]).getTime();
    const maxTime = new Date(res![1]).getTime();
    expect(maxTime - minTime).toBeTruthy();
  });

  it('should get min/max value wrong Dates format', () => {
    const res = getMinMaxDate([]);
    expect(res).toBe(undefined);
  });
});

describe('isArrayType()', () => {
  it('should return true for string', () => {
    const arr = ['a', 'b'];
    const isType = isArrayType(arr, 'string');
    expect(isType).toBeTruthy();
  });

  it('should return true for number', () => {
    const arr = [1, 2];
    const isType = isArrayType(arr, 'number');
    expect(isType).toBeTruthy();
  });

  it('should return true for date', () => {
    const arr = [new Date(0), new Date(0)];
    const isType = isArrayType(arr, 'date');
    expect(isType).toBeTruthy();
  });

  it('should return true for object', () => {
    const arr = [{ a: 'test' }];
    const isType = isArrayType(arr, 'object');
    expect(isType).toBeTruthy();
  });

  it('should return true for array of array', () => {
    const arr = [[1, 2, 3]];
    const isType = isArrayType(arr, 'object');
    expect(isType).toBeTruthy();
  });

  it('should return false for undefined array', () => {
    const arr = [undefined];
    const isType = isArrayType(arr, 'object');
    expect(isType).not.toBeTruthy();
  });

  it('should return false for wrong values', () => {
    const arr = [1, 2, 3];
    const isType = isArrayType(arr, 'object');
    expect(isType).not.toBeTruthy();
  });
});

describe('isArrayTypeString()', () => {
  it('should return true for string', () => {
    const arr = ['a', 'b'];
    const isType = isArrayTypeString(arr);
    expect(isType).toBeTruthy();
  });
});

describe('isArrayTypeObject()', () => {
  it('should return true for object', () => {
    const arr = [{}, {}];
    const isType = isArrayTypeObject(arr);
    expect(isType).toBeTruthy();
  });
});

describe('removeNilsFromDomain()', () => {
  it('should return non-nullables', () => {
    const domain = [1, undefined, 2];
    const res = removeNilsFromDomain(domain);
    expect(res).toStrictEqual([1, 2]);
  });

  it('should return non-nullables', () => {
    const domain = ['1', undefined, 2];
    const res = removeNilsFromDomain(domain);
    expect(res).toStrictEqual(['1', 2]);
  });
});
