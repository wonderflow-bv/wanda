
import { LineChartIndex, LineChartOverlay, LineChartSeries } from '../types';
import {
  getLabelFromPath,
  getPrimitiveFromObjectByPath,
  getPrimitivesFromObjectArrayByPath,
  getValueFromObjectByPath,
  handleAxisDomainAndScaleType,
  handleChartDomainAndScaleType,
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

describe('handleAxisDomainAndScaleType()', () => {
  it('should return correct scale type and domain with date', () => {
    const data = [{ date: '05-12-2022' }, { date: '05-12-2023' }];
    const axis: LineChartIndex = {
      scaleType: undefined,
      dataKey: 'date',
      domain: undefined,
    };
    const res = handleAxisDomainAndScaleType(data, axis);
    const exp = {
      scaleType: 'time',
      domain: ['05-12-2022', '05-12-2023'],
    };
    expect(res).toStrictEqual(exp);
  });

  it('should return min/max custom domain with date', () => {
    const data = [{ date: '01-01-2022' }, { date: '01-01-2023' }];
    const axis: LineChartIndex = {
      scaleType: undefined,
      dataKey: 'date',
      domain: ['1-1-1970', '1-1-2024'],
    };
    const res = handleAxisDomainAndScaleType(data, axis);
    const exp = {
      scaleType: 'time',
      domain: ['01-01-1970', '01-01-2024'],
    };
    expect(res).toStrictEqual(exp);
  });

  it('should return min own domain and max custom domain with date', () => {
    const data = [{ date: '01-01-2021' }, { date: '01-01-2023' }];
    const axis: LineChartIndex = {
      scaleType: undefined,
      dataKey: 'date',
      domain: ['1-1-2022', '1-1-2024'],
    };
    const res = handleAxisDomainAndScaleType(data, axis);
    const exp = {
      scaleType: 'time',
      domain: ['01-01-2021', '01-01-2024'],
    };
    expect(res).toStrictEqual(exp);
  });

  it('should return min custom domain and max own domain with date', () => {
    const data = [{ date: '01-01-2021' }, { date: '01-01-2023' }];
    const axis: LineChartIndex = {
      scaleType: undefined,
      dataKey: 'date',
      domain: ['1-1-2020', '1-1-2022'],
    };
    const res = handleAxisDomainAndScaleType(data, axis);
    const exp = {
      scaleType: 'time',
      domain: ['01-01-2020', '01-01-2023'],
    };
    expect(res).toStrictEqual(exp);
  });

  it('should return correct scale type and domain for multiple datakeys', () => {
    const data = [
      { value: 100, percentage: 10 },
      { value: undefined, percentage: 3 },
      { value: 80, percentage: undefined },
    ];
    const axis: LineChartSeries = {
      scaleType: undefined,
      dataKey: ['value', 'percentage'],
      domain: undefined,
    };
    const res = handleAxisDomainAndScaleType(data, axis);
    const exp = {
      scaleType: 'linear',
      domain: [3, 105],
    };
    expect(res).toStrictEqual(exp);
  });

  it('should return correct custom domain w numbers', () => {
    const data = [
      { value: 100, percentage: 10 },
      { value: undefined, percentage: 3 },
      { value: 80, percentage: undefined },
    ];
    const axis: LineChartSeries = {
      scaleType: undefined,
      dataKey: ['value', 'percentage'],
      domain: [-100, 100],
    };
    const res = handleAxisDomainAndScaleType(data, axis);
    const exp = {
      scaleType: 'linear',
      domain: [-100, 100],
    };
    expect(res).toStrictEqual(exp);
  });

  it('should return min own domain and max custom domain w numbers', () => {
    const data = [
      { value: 100, percentage: 10 },
      { value: undefined, percentage: 3 },
      { value: 80, percentage: undefined },
    ];
    const axis: LineChartSeries = {
      scaleType: undefined,
      dataKey: ['value', 'percentage'],
      domain: [50, 150],
    };
    const res = handleAxisDomainAndScaleType(data, axis);
    const exp = {
      scaleType: 'linear',
      domain: [3, 150],
    };
    expect(res).toStrictEqual(exp);
  });

  it('should return correct scale type and domain for labels', () => {
    const data = [
      { value: 'test1' },
      { value: undefined },
      { value: 'test2' },
    ];
    const axis: LineChartSeries = {
      scaleType: undefined,
      dataKey: ['value'],
      domain: undefined,
    };
    const res = handleAxisDomainAndScaleType(data, axis);
    const exp = {
      scaleType: 'label',
      domain: ['test1', 'test2'],
    };
    expect(res).toStrictEqual(exp);
  });

  it('should return same labels w custom domain', () => {
    const data = [
      { value: 'test1' },
      { value: undefined },
      { value: 'test2' },
    ];
    const axis: LineChartSeries = {
      scaleType: undefined,
      dataKey: ['value'],
      domain: ['a', 'b'],
    };
    const res = handleAxisDomainAndScaleType(data, axis);
    const exp = {
      scaleType: 'label',
      domain: ['test1', 'test2'],
    };
    expect(res).toStrictEqual(exp);
  });
});

describe('handleChartDomainAndScaleType()', () => {
  it('should return a correct configuration', () => {
    const data = [
      {
        date: '01-01-2000',
        value: 100,
        percentage: 30,
        overlay: 23,
      },
      {
        date: '01-01-2010',
        value: 80,
        percentage: 20,
        overlay: 28,
      },
      {
        date: '01-01-2020',
        value: 45,
        percentage: 42,
        overlay: 12,
      }];
    const index: LineChartIndex = { dataKey: 'date' };
    const series: LineChartSeries = { dataKey: ['value', 'percentage'] };
    const overlay: LineChartOverlay = { dataKey: 'overlay' };
    const res = handleChartDomainAndScaleType(data, index, series, overlay);
    const exp = {
      index: {
        domain: ['01-01-2000', '01-01-2010', '01-01-2020'],
        scaleType: 'time',
      },
      series: {
        domain: [20, 105],
        scaleType: 'linear',
      },
      overlay: {
        domain: [12, 30],
        scaleType: 'linear',
      },
    };
    expect(res).toStrictEqual(exp);
  });

  it('should return a correct configuration w/o overlay', () => {
    const data = [
      {
        date: '01-01-2000',
        value: 100,
        percentage: 30,
        overlay: 23,
      },
      {
        date: '01-01-2010',
        value: 80,
        percentage: 20,
        overlay: 28,
      },
      {
        date: '01-01-2020',
        value: 45,
        percentage: 42,
        overlay: 12,
      }];
    const index: LineChartIndex = { dataKey: 'date' };
    const series: LineChartSeries = { dataKey: ['value', 'percentage'] };
    const overlay = undefined;
    const res = handleChartDomainAndScaleType(data, index, series, overlay);
    const exp = {
      index: {
        domain: ['01-01-2000', '01-01-2010', '01-01-2020'],
        scaleType: 'time',
      },
      series: {
        domain: [20, 105],
        scaleType: 'linear',
      },
      overlay: undefined,
    };
    expect(res).toStrictEqual(exp);
  });
});