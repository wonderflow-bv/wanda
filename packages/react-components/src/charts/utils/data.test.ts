
import { channels, nestedChannels } from '../mock-data';
import {
  createDataModel,
  extractDataFromArray,
  getLabelFromObjectPath,
  getPrimitiveFromObjectPath,
  getPrimitivesFromArrayWithObjectPath,
  getValueFromKeyRecursively,
  getValueFromObjectPath,
} from './data';

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

describe('createDataModel()', () => {
  it('should create a model from a series array', () => {
    const config = {
      index: { dataKey: 'name' },
      series: {
        dataKey: ['value'],
        from: 'values',
        name: ['star1', 'star2', 'star3', 'star4', 'star5'],
      },
    };
    const res = createDataModel([nestedChannels[0]], config);
    const exp = [{
      index: 'bestbuy.ca',
      overlay: undefined,
      series: [
        {
          label: 'bestbuy.ca',
          label2: 1,
          name: 'star1',
          value: 388,
          valueInfo: 0,
        },
        {
          label: 'bestbuy.ca',
          label2: 2,
          name: 'star2',
          value: 242,
          valueInfo: 0,
        },
        {
          label: 'bestbuy.ca',
          label2: 3,
          name: 'star3',
          value: 562,
          valueInfo: 0,
        },
        {
          label: 'bestbuy.ca',
          label2: 4,
          name: 'star4',
          value: 3548,
          valueInfo: 2,
        },
        {
          label: 'bestbuy.ca',
          label2: 5,
          name: 'star5',
          value: 38635,
          valueInfo: 17,
        },
      ],
    }];
    expect(res).toStrictEqual(exp);
  });

  it('should create a model from a series array with name ref', () => {
    const config = {
      index: { dataKey: 'name' },
      series: {
        dataKey: ['value'],
        from: 'values',
        name: ['label2'],
      },
    };
    const res = createDataModel([nestedChannels[0]], config);
    const exp = [{
      index: 'bestbuy.ca',
      overlay: undefined,
      series: [
        {
          label: 'bestbuy.ca',
          label2: 1,
          name: '1',
          value: 388,
          valueInfo: 0,
        },
        {
          label: 'bestbuy.ca',
          label2: 2,
          name: '2',
          value: 242,
          valueInfo: 0,
        },
        {
          label: 'bestbuy.ca',
          label2: 3,
          name: '3',
          value: 562,
          valueInfo: 0,
        },
        {
          label: 'bestbuy.ca',
          label2: 4,
          name: '4',
          value: 3548,
          valueInfo: 2,
        },
        {
          label: 'bestbuy.ca',
          label2: 5,
          name: '5',
          value: 38635,
          valueInfo: 17,
        },
      ],
    }];
    expect(res).toStrictEqual(exp);
  });

  it('should create a model from a plain object', () => {
    const config = {
      index: { dataKey: 'channel' },
      series: {
        dataKey: ['1 star', '2 stars'],
        name: ['⭐', '⭐⭐'],
      },
    };
    const res = createDataModel([channels[0]], config);
    const exp = [{
      index: 'amazon.ca',
      overlay: undefined,
      series: [
        {
          name: '⭐',
          value: 159,
        },
        {
          name: '⭐⭐',
          value: 51,
        }],
    }];
    expect(res).toStrictEqual(exp);
  });

  it('should create a model from a plain object', () => {
    const config = {
      index: { dataKey: 'channel' },
      series: {
        dataKey: ['1 star', '2 stars'],
        name: undefined,
      },
    };
    const res = createDataModel([channels[0]], config);
    const exp = [{
      index: 'amazon.ca',
      overlay: undefined,
      series: [
        {
          name: '1 star',
          value: 159,
        },
        {
          name: '2 stars',
          value: 51,
        }],
    }];
    expect(res).toStrictEqual(exp);
  });
});

describe('getValueFromObjectPath()', () => {
  it('should return the corresponding object', () => {
    const path = 'nested';
    const res = getValueFromObjectPath(data[0], path);
    const exp = {
      num: 1, str: 'inner-joe', arr: [1, 2, 3], obj: { a: 1 },
    };
    expect(res).toStrictEqual(exp);
  });
});

describe('getPrimitiveFromObjectPath()', () => {
  it('should return undefined for a non primitive value (object)', () => {
    const path = 'nested';
    const res = getPrimitiveFromObjectPath(data[0], path);
    const exp = undefined;
    expect(res).toStrictEqual(exp);
  });

  it('should return undefined for a non primitive value (array)', () => {
    const path = 'series';
    const res = getPrimitiveFromObjectPath(data[0], path);
    const exp = undefined;
    expect(res).toStrictEqual(exp);
  });

  it('should return a value for a primitive (number)', () => {
    const path = 'series[0].value';
    const res = getPrimitiveFromObjectPath(data[0], path);
    const exp = 100;
    expect(res).toStrictEqual(exp);
  });

  it('should return a value for a primitive (string)', () => {
    const path = 'nested.str';
    const res = getPrimitiveFromObjectPath(data[0], path);
    const exp = 'inner-joe';
    expect(res).toStrictEqual(exp);
  });

  it('should return undefined for a non existent path', () => {
    const path = 'wrong path';
    const res = getPrimitiveFromObjectPath(data[0], path);
    const exp = undefined;
    expect(res).toStrictEqual(exp);
  });
});

describe('getLabelFromObjectPath()', () => {
  it('should return input as is', () => {
    const input = 'parent';
    const res = getLabelFromObjectPath(input);
    const exp = 'parent';
    expect(res).toBe(exp);
  });

  it('should return the parent level', () => {
    const input = 'parent.child';
    const res = getLabelFromObjectPath(input);
    const exp = 'parent';
    expect(res).toBe(exp);
  });

  it('should return the child level', () => {
    const input = 'parent.child.grandchild';
    const res = getLabelFromObjectPath(input);
    const exp = 'child';
    expect(res).toBe(exp);
  });

  it('should return the child[n] level', () => {
    const input = 'parent.child[0].grandchild';
    const res = getLabelFromObjectPath(input);
    const exp = 'child-0';
    expect(res).toBe(exp);
  });

  it('should return the child[nnn] level', () => {
    const input = 'parent.child[100].grandchild';
    const res = getLabelFromObjectPath(input);
    const exp = 'child-100';
    expect(res).toBe(exp);
  });
});

describe('getPrimitivesFromArrayWithObjectPath', () => {
  it('should return an array of users name', () => {
    const path = 'user';
    const req = getPrimitivesFromArrayWithObjectPath(data, path);
    const res = ['joe', 'john', 'bob'];
    expect(req).toStrictEqual(res);
  });

  it('should return an array of ages', () => {
    const path = 'age';
    const req = getPrimitivesFromArrayWithObjectPath(data, path);
    const res = [36, 40, 1];
    expect(req).toStrictEqual(res);
  });

  it('should return an array of values from within an array', () => {
    const path = 'series[0].value';
    const req = getPrimitivesFromArrayWithObjectPath(data, path);
    const res = [100, 98, 85];
    expect(req).toStrictEqual(res);
  });

  it('should return undefined for each non primitive value', () => {
    const path = 'nested.arr';
    const req = getPrimitivesFromArrayWithObjectPath(data, path);
    const res = [undefined, undefined, undefined];
    expect(req).toStrictEqual(res);
  });
});
