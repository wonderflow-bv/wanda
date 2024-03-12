
import { getBarSize, getHeightForVerticalChartWithFixedBarSize } from './bars';

describe('getBarSize()', () => {
  const bar = {
    color: 'red',
    height: 60,
    index: 1,
    key: 'name',
    value: 15,
    width: 24,
    x: 20,
    y: 35,
  };

  const axis = {
    top: 0,
    left: 0,
    domain: [-100, 100],
    scaleType: 'linear',
    orientation: 'left',
    scale: () => 10,
  } as any;

  it('should return for positive values', () => {
    const res = getBarSize(bar, axis, true);
    const exp = 60;
    expect(res).toStrictEqual(exp);
  });

  it('should return for vertical layout', () => {
    const res = getBarSize(bar, { ...axis, scale: (x: number) => -x }, false);
    const exp = 124;
    expect(res).toStrictEqual(exp);
  });

  it('should return for negative value', () => {
    const res = getBarSize({ ...bar, value: -60 }, { ...axis, scale: (x: number) => -x }, false);
    const exp = 124;
    expect(res).toStrictEqual(exp);
  });
});

describe('getBarPosition()', () => {
  const bar = {
    color: 'red',
    height: 60,
    index: 1,
    key: 'name',
    value: 15,
    width: 24,
    x: 20,
    y: 35,
  };

  const axis = {
    top: 0,
    left: 0,
    domain: [-100, 100],
    scaleType: 'linear',
    orientation: 'left',
    scale: () => 50,
  } as any;

  it('should return position, positive true', () => {
    const res = getBarSize(bar, axis, true);
    const exp = 60;
    expect(res).toStrictEqual(exp);
  });

  it('should return position, positive false', () => {
    const res = getBarSize(bar, axis, false);
    const exp = 24;
    expect(res).toStrictEqual(exp);
  });

  it('should return position, negative true', () => {
    const res = getBarSize({ ...bar, value: -50 }, axis, false);
    const exp = 24;
    expect(res).toStrictEqual(exp);
  });

  it('should return position, negative false', () => {
    const res = getBarSize({ ...bar, value: -50 }, axis, true);
    const exp = -60;
    expect(res).toStrictEqual(exp);
  });
});

describe('getHeightForVerticalChartWithFixedBarSize()', () => {
  const config: any = {
    maxSize: 24,
    paddingInnerGroup: 0.1,
    paddingOuterGroup: 0.1,
    paddingInner: 0.2,
    paddingOuter: 1,
  };

  const data: any = [
    { date: '2024', value: 100 },
    { date: '2023', value: 100 },
  ];

  const metadata: any = {
    series: { dataKey: ['value'] },
    overlay: { dataKey: undefined },
  };

  const res = getHeightForVerticalChartWithFixedBarSize(config, data, metadata);
  expect(res).toStrictEqual(227);
});
