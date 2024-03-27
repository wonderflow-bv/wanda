
import {
  Data, LineChartIndex, LineChartSeries, TrendlineType,
} from '../types';
import {
  computeAverage,
  computeTrendline,
  extractBarValueFromNestedKey,
  getDataKeyParentObject,
  getLabelFromPath,
  getPrimitiveFromObjectByPath,
  getPrimitivesFromObjectArrayByPath,
  getValueFromObjectByPath,
  handleAxisDomainAndScaleType,
  handleLineChartDomainAndScaleType,
  mirrorDomain,
  sortBarsBy,
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
      domain: [0, 105],
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
    const overlay: LineChartSeries = { dataKey: ['overlay'] };
    const res = handleLineChartDomainAndScaleType(data, index, series, overlay);
    const exp = {
      index: {
        domain: ['01-01-2000', '01-01-2010', '01-01-2020'],
        scaleType: 'time',
      },
      series: {
        domain: [0, 105],
        scaleType: 'linear',
      },
      overlay: {
        domain: [0, 30],
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
    const res = handleLineChartDomainAndScaleType(data, index, series, overlay);
    const exp = {
      index: {
        domain: ['01-01-2000', '01-01-2010', '01-01-2020'],
        scaleType: 'time',
      },
      series: {
        domain: [0, 105],
        scaleType: 'linear',
      },
      overlay: undefined,
    };
    expect(res).toStrictEqual(exp);
  });
});

describe('computeAverage()', () => {
  it('should return undefined when average is NaN', () => {
    const data: Data = [];
    const datakeys: string[] = [];
    const res = computeAverage(data, datakeys);
    const exp = undefined;
    expect(res).toBe(exp);
  });

  it('should return average for a single dataKey', () => {
    const data: Data = [{ testA: 3, testB: 5 }, { testA: 1, testB: 2 }];
    const datakeys: string[] = ['testA'];
    const res = computeAverage(data, datakeys);
    const exp = { average: 2, dataKey: [{ name: 'testA', average: 2 }] };
    expect(res).toStrictEqual(exp);
  });

  it('should return average for multiple dataKeys', () => {
    const data: Data = [{ testA: 3, testB: 5 }, { testA: 1, testB: 3 }];
    const datakeys: string[] = ['testA', 'testB'];
    const res = computeAverage(data, datakeys);
    const exp = { average: 3, dataKey: [{ name: 'testA', average: 2 }, { name: 'testB', average: 4 }] };
    expect(res).toStrictEqual(exp);
  });

  it('should return average for multiple dataKeys with undefined value', () => {
    const data: Data = [{ testA: 3, testB: 5 }, { testA: 3, testB: 3 }, { testA: undefined, testB: 4 }];
    const datakeys: string[] = ['testA', 'testB'];
    const res = computeAverage(data, datakeys);
    const exp = { average: 3.5, dataKey: [{ name: 'testA', average: 3 }, { name: 'testB', average: 4 }] };
    expect(res).toStrictEqual(exp);
  });
});

describe('computeTrendline()', () => {
  it('should return values for single data key', () => {
    const data: Data = [
      { datakey: 0.5 },
      { datakey: 1 },
      { datakey: 1.5 },
      { datakey: 2 },
      { datakey: 2.5 },
    ];

    const res = computeTrendline(data, ['datakey']);
    const exp: TrendlineType[] = [{
      name: 'datakey',
      slope: 0.5,
      intercept: 0.5,
      coefficients: [0.5, 0.5],
      score: {
        r: 1, r2: 1, chi2: 0, rmsd: 0,
      },
      trendline: [0.5, 1, 1.5, 2, 2.5],
      from: 0.5,
      to: 2.5,
    }];

    expect(res).toStrictEqual(exp);
  });

  it('should return values for single data key', () => {
    const data: Data = [
      { datakey: 1 },
      { datakey: 3 },
      { datakey: 0.5 },
      { datakey: 2.5 },
      { datakey: 0.25 },
    ];

    const res = computeTrendline(data, ['datakey']);
    const exp: TrendlineType[] = [{
      name: 'datakey',
      slope: -0.2,
      intercept: 1.85,
      coefficients: [1.85, -0.2],
      score: {
        r: 0.26,
        r2: 0.07,
        chi2: 6.32,
        rmsd: 1.06,
      },
      trendline: [
        1.85,
        1.65,
        1.45,
        1.25,
        1.05],
      from: 1.85,
      to: 1.05,
    }];

    expect(res).toStrictEqual(exp);
  });
});

describe('extractBarValueFromNestedKey()', () => {
  const barGroup = {
    bars: [{
      color: 'red',
      height: 60,
      index: 1,
      key: 'name.test',
      value: undefined,
      width: 24,
      x: 20,
      y: 35,
    }],
  };

  const data = [{ name: { test: 15 } }];
  const scale = () => 10;

  it('should return for horizontal layout', () => {
    const res = extractBarValueFromNestedKey(barGroup, 0, data, scale, 24, true);
    expect(res).toStrictEqual([{
      color: 'red',
      height: 14,
      index: 1,
      key: 'name.test',
      value: 15,
      width: 24,
      x: 20,
      y: 10,
    }]);
  });

  it('should return for vertical layout', () => {
    const res = extractBarValueFromNestedKey(barGroup, 0, data, scale, 24, false);
    expect(res).toStrictEqual([{
      color: 'red',
      height: 60,
      index: 1,
      key: 'name.test',
      value: 15,
      width: 10,
      x: 20,
      y: 35,
    }]);
  });
});

describe('sortBarsBy()', () => {
  const bars = [
    {
      color: 'red',
      height: 60,
      index: 1,
      key: 'A',
      value: 20,
      width: 24,
      x: 20,
      y: 35,
    },
    {
      color: 'red',
      height: 60,
      index: 1,
      key: 'B',
      value: 10,
      width: 24,
      x: 20,
      y: 35,
    }];
  it('should return same order for "as-is"', () => {
    const res = sortBarsBy(bars, 'as-is', true);
    const exp = { key: 'A', value: 20 };
    expect(res[0].key).toStrictEqual(exp.key);
    expect(res[0].value).toStrictEqual(exp.value);
  });

  it('should return right order for "descending-key"', () => {
    const res = sortBarsBy(bars, 'descending-key', true);
    expect(res[0].key).toStrictEqual('A');
    expect(res[1].key).toStrictEqual('B');
  });

  it('should return right order for "ascending-key"', () => {
    const res = sortBarsBy(bars, 'ascending-key', true);
    expect(res[0].key).toStrictEqual('B');
    expect(res[1].key).toStrictEqual('A');
  });

  it('should return right order for "descending-value"', () => {
    const res = sortBarsBy(bars, 'descending-value', true);
    expect(res[0].value).toStrictEqual(10);
    expect(res[1].value).toStrictEqual(20);
  });

  it('should return right order for "ascending-value"', () => {
    const res = sortBarsBy(bars, 'ascending-value', true);
    expect(res[0].value).toStrictEqual(20);
    expect(res[1].value).toStrictEqual(10);
  });

  it('should return right order for "descending-key"', () => {
    const res = sortBarsBy(bars, 'descending-key', false);
    expect(res[0].key).toStrictEqual('A');
    expect(res[1].key).toStrictEqual('B');
  });
});

describe('mirrorDomain()', () => {
  it('should return the right mirrored domain for numbers', () => {
    const res = mirrorDomain([0, 100]);
    const exp = [-100, 100];
    expect(res).toStrictEqual(exp);
  });

  it('should return the same domain for other than number', () => {
    const res = mirrorDomain(['0', '100']);
    const exp = ['0', '100'];
    expect(res).toStrictEqual(exp);
  });

  it('should return 0,0 for NaN values', () => {
    const res = mirrorDomain([NaN, NaN]);
    const exp = [-0, 0];
    expect(res).toStrictEqual(exp);
  });
});

describe('getDataKeyParentObject()', () => {
  it('should return datum', () => {
    const datum = { key: 1, extra: 2 };
    const datakey = 'key';
    const res = getDataKeyParentObject(datum, datakey);
    const exp = datum;
    expect(res).toStrictEqual(exp);
  });

  it('should return parent object', () => {
    const datum = { nested: { key: 1, extra: 2 } };
    const datakey = 'nested.key';
    const res = getDataKeyParentObject(datum, datakey);
    const exp = { key: 1, extra: 2 };
    expect(res).toStrictEqual(exp);
  });
});
