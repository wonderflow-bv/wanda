
import {
  getLabelFromPath,
  getPrimitiveFromObjectByPath,
  getPrimitivesFromObjectArrayByPath,
  getValueFromObjectByPath,
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

describe('getValueFromObjectPath()', () => {
  it('should return the corresponding object', () => {
    const path = 'nested';
    const res = getValueFromObjectByPath(data[0], path);
    const exp = {
      num: 1, str: 'inner-joe', arr: [1, 2, 3], obj: { a: 1 },
    };
    expect(res).toStrictEqual(exp);
  });
});

describe('getPrimitiveFromObjectPath()', () => {
  it('should return undefined for a non primitive value (object)', () => {
    const path = 'nested';
    const res = getPrimitiveFromObjectByPath(data[0], path);
    const exp = undefined;
    expect(res).toStrictEqual(exp);
  });

  it('should return undefined for a non primitive value (array)', () => {
    const path = 'series';
    const res = getPrimitiveFromObjectByPath(data[0], path);
    const exp = undefined;
    expect(res).toStrictEqual(exp);
  });

  it('should return a value for a primitive (number)', () => {
    const path = 'series[0].value';
    const res = getPrimitiveFromObjectByPath(data[0], path);
    const exp = 100;
    expect(res).toStrictEqual(exp);
  });

  it('should return a value for a primitive (string)', () => {
    const path = 'nested.str';
    const res = getPrimitiveFromObjectByPath(data[0], path);
    const exp = 'inner-joe';
    expect(res).toStrictEqual(exp);
  });

  it('should return undefined for a non existent path', () => {
    const path = 'wrong path';
    const res = getPrimitiveFromObjectByPath(data[0], path);
    const exp = undefined;
    expect(res).toStrictEqual(exp);
  });
});

describe('getLabelFromObjectPath()', () => {
  it('should return input as is', () => {
    const input = 'parent';
    const res = getLabelFromPath(input);
    const exp = 'parent';
    expect(res).toBe(exp);
  });

  it('should return the parent level', () => {
    const input = 'parent.child';
    const res = getLabelFromPath(input);
    const exp = 'parent';
    expect(res).toBe(exp);
  });

  it('should return the child level', () => {
    const input = 'parent.child.grandchild';
    const res = getLabelFromPath(input);
    const exp = 'child';
    expect(res).toBe(exp);
  });

  it('should return the child[n] level', () => {
    const input = 'parent.child[0].grandchild';
    const res = getLabelFromPath(input);
    const exp = 'child-0';
    expect(res).toBe(exp);
  });

  it('should return the child[nnn] level', () => {
    const input = 'parent.child[100].grandchild';
    const res = getLabelFromPath(input);
    const exp = 'child-100';
    expect(res).toBe(exp);
  });
});

describe('getPrimitivesFromArrayWithObjectPath', () => {
  it('should return an array of users name', () => {
    const path = 'user';
    const req = getPrimitivesFromObjectArrayByPath(data, path);
    const res = ['joe', 'john', 'bob'];
    expect(req).toStrictEqual(res);
  });

  it('should return an array of ages', () => {
    const path = 'age';
    const req = getPrimitivesFromObjectArrayByPath(data, path);
    const res = [36, 40, 1];
    expect(req).toStrictEqual(res);
  });

  it('should return an array of values from within an array', () => {
    const path = 'series[0].value';
    const req = getPrimitivesFromObjectArrayByPath(data, path);
    const res = [100, 98, 85];
    expect(req).toStrictEqual(res);
  });

  it('should return undefined for each non primitive value', () => {
    const path = 'nested.arr';
    const req = getPrimitivesFromObjectArrayByPath(data, path);
    const res = [undefined, undefined, undefined];
    expect(req).toStrictEqual(res);
  });
});
