import {
  getBarChartLabels,
  getBarChartLabelsMaxLength,
  getBarChartLabelsMaxSize,
  getBarIndexPositionSeries,
  getBarLabelContent,
  getBarSize,
  getHeightForVerticalChartWithFixedBarSize, getLinearDomainStackSeries, getStackBarIndexPositionOverlay,
  getStackBarIndexPositionSeries,
  getStackBarLabelContent,
  getStackBarLabelMorphology,
  getStackBarThickness,
} from './bars';

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
    const exp = 0;
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

describe('getBarIndexPositionSeries()', () => {
  const bar = {
    color: 'red',
    height: 10,
    index: 1,
    key: 'test',
    value: 123,
    width: 20,
    x: 3,
    y: 5,
  };
  it('should return for custom thickness - horizontal', () => {
    const res = getBarIndexPositionSeries(bar, 24, true);
    const exp = 1;
    expect(res).toStrictEqual(exp);
  });

  it('should return for custom thickness - vertical', () => {
    const res = getBarIndexPositionSeries(bar, 24, false);
    const exp = -2;
    expect(res).toStrictEqual(exp);
  });

  it('should return for no custom thickness', () => {
    const res = getBarIndexPositionSeries(bar, 20, false);
    const exp = 0;
    expect(res).toStrictEqual(exp);
  });
});

describe('getStackBarIndexPositionSeries()', () => {
  const bar = {
    color: 'red',
    height: 10,
    index: 1,
    key: 'test',
    value: 123,
    width: 20,
    x: 3,
    y: 5,
  };
  it('should return w custom thickness, overlay, horizontal', () => {
    const res = getStackBarIndexPositionSeries(
      bar,
      24,
      true,
      true,
    );
    const exp = -12;
    expect(res).toStrictEqual(exp);
  });

  it('should return w custom thickness, no overlay, horizontal', () => {
    const res = getStackBarIndexPositionSeries(
      bar,
      24,
      false,
      true,
    );
    const exp = 1;
    expect(res).toStrictEqual(exp);
  });

  it('should return w custom thickness, no overlay, vertical', () => {
    const res = getStackBarIndexPositionSeries(
      bar,
      20,
      false,
      false,
    );
    const exp = 0;
    expect(res).toStrictEqual(exp);
  });

  it('should return w/o custom thickness, overlay, horizontal', () => {
    const res = getStackBarIndexPositionSeries(
      bar,
      20,
      true,
      true,
    );
    const exp = -8;
    expect(res).toStrictEqual(exp);
  });

  it('should return w/o custom thickness, overlay, vertical', () => {
    const res = getStackBarIndexPositionSeries(
      bar,
      10,
      true,
      false,
    );
    const exp = -1;
    expect(res).toStrictEqual(exp);
  });

  it('should return w custom thickness, overlay, vertical', () => {
    const res = getStackBarIndexPositionSeries(
      bar,
      12,
      true,
      false,
    );
    const exp = -3;
    expect(res).toStrictEqual(exp);
  });

  it('should return w/o custom thickness, no overlay, vertical', () => {
    const res = getStackBarIndexPositionSeries(
      bar,
      10,
      false,
      false,
    );
    const exp = 5;
    expect(res).toStrictEqual(exp);
  });
});

describe('getStackBarIndexPositionOverlay()', () => {
  const bar = {
    color: 'red',
    height: 10,
    index: 1,
    key: 'test',
    value: 123,
    width: 20,
    x: 3,
    y: 5,
  };

  it('should return - no custom width, horizontal', () => {
    const res = getStackBarIndexPositionOverlay(bar, 20, true);
    const exp = 14;
    expect(res).toStrictEqual(exp);
  });

  it('should return - custom width, horizontal', () => {
    const res = getStackBarIndexPositionOverlay(bar, 24, true);
    const exp = 14;
    expect(res).toStrictEqual(exp);
  });

  it('should return - custom width, vertical', () => {
    const res = getStackBarIndexPositionOverlay(bar, 14, false);
    const exp = 11;
    expect(res).toStrictEqual(exp);
  });

  it('should return - no custom width, vertical', () => {
    const res = getStackBarIndexPositionOverlay(bar, 10, false);
    const exp = 11;
    expect(res).toStrictEqual(exp);
  });
});

describe('getStackBarThickness()', () => {
  it('should return w fixbarsize and no overlay', () => {
    const res = getStackBarThickness(24, 100, true, false);
    const exp = 24;
    expect(res).toStrictEqual(exp);
  });
  it('should return w/o fixbarsize and no overlay', () => {
    const res = getStackBarThickness(24, 20, false, false);
    const exp = 24;
    expect(res).toStrictEqual(exp);
  });
  it('should return w fixbarsize and overlay', () => {
    const res = getStackBarThickness(24, 100, true, true);
    const exp = 11.5;
    expect(res).toStrictEqual(exp);
  });
  it('should return w/o fixbarsize and overlay', () => {
    const res = getStackBarThickness(24, 20, false, true);
    const exp = 11.5;
    expect(res).toStrictEqual(exp);
  });
});

describe('getLinearDomainStackSeries()', () => {
  it('should return for multiple nested keys', () => {
    const data = [
      { test: { idy: 10, idx: 20 } },
      { test: { idy: 30, idx: 18 } }];
    const datakey = ['test.idy', 'test.idx'];

    const res = getLinearDomainStackSeries(
      data,
      datakey,
      [0, 10],
    );
    const exp = [0, 48];
    expect(res).toStrictEqual(exp);
  });

  it('should return for multiple nested keys w negative values', () => {
    const data = [
      { test: { idy: -10, idx: 20 } },
      { test: { idy: 30, idx: -18 } }];
    const datakey = ['test.idy', 'test.idx'];

    const res = getLinearDomainStackSeries(
      data,
      datakey,
      [0, 10],
    );
    const exp = [0, 12];
    expect(res).toStrictEqual(exp);
  });
});

describe('getBarChartLabels()', () => {
  const data = [
    { test: { idy: 10, idx: 20 } },
    { test: { idy: 30, idx: 18 } }];

  it('should return for multiple series', () => {
    const series = {
      dataKey: ['test.idy', 'test.idx'],
    };

    const res = getBarChartLabels(data, series);
    const { series: s } = res;
    const exp = [
      { extraData: '', length: 3, value: 10 },
      { extraData: '', length: 3, value: 20 },
    ];
    expect(s[0]).toStrictEqual(exp);
  });

  it('should return for multiple series', () => {
    const series = {
      dataKey: ['test.idx'],
    };
    const overlay = {
      dataKey: ['test.idy'],
    };

    const res = getBarChartLabels(data, series, overlay);
    const { series: s, overlay: o } = res;

    const expSeries = [{ extraData: '', length: 3, value: 20 }];
    const expOverlay = [{ extraData: '', length: 3, value: 10 }];

    expect(s[0]).toStrictEqual(expSeries);
    expect(o![0]).toStrictEqual(expOverlay);
  });
});

describe('getBarChartLabelsMaxLength()', () => {
  const data = [
    { test: { idy: 10, idx: 20 } },
    { test: { idy: 30, idx: 18 } }];

  it('should return for series', () => {
    const series = {
      dataKey: ['test.idy', 'test.idx'],
    };

    const labels = getBarChartLabels(data, series);

    const res = getBarChartLabelsMaxLength(labels);
    const exp = 3;
    expect(res).toStrictEqual(exp);
  });

  it('should return for series and overlay', () => {
    const series = {
      dataKey: ['test.idx'],
    };

    const overlay = {
      dataKey: ['test.idy'],
    };

    const labels = getBarChartLabels(data, series, overlay);

    const res = getBarChartLabelsMaxLength(labels);
    const exp = 3;
    expect(res).toStrictEqual(exp);
  });
});

describe('getBarChartLabelsMaxSize()', () => {
  it('should return', () => {
    const res = getBarChartLabelsMaxSize(10);
    const exp = 96;
    expect(res).toStrictEqual(exp);
  });
});

describe('getBarLabelContent()', () => {
  const bar = {
    color: 'red',
    height: 10,
    index: 1,
    key: 'test',
    value: 123,
    width: 20,
    x: 3,
    y: 5,
  };

  it('should return for plain object', () => {
    const datum = { test: 101, extra: 321 };

    const res = getBarLabelContent(
      datum,
      bar,
      'test',
      d => d.extra,
    );
    const exp = { extra: 321, separator: ' - ', value: 123 };
    expect(res).toStrictEqual(exp);
  });

  it('should return for nested object', () => {
    const datum = { nested: { test: 101, extra: 321 } };

    const res = getBarLabelContent(
      datum,
      bar,
      'nested.test',
      d => d.extra,
    );
    const exp = { extra: 321, separator: ' - ', value: 123 };
    expect(res).toStrictEqual(exp);
  });
});

describe('getStackBarLabelContent()', () => {
  it('should return for plain object', () => {
    const datum = { test: 101, extra: 321 };

    const res = getStackBarLabelContent(
      datum,
      ['test'],
      d => d.extra,
      0,
    );
    const exp = { extra: 321, separator: ' - ', value: 101 };
    expect(res).toStrictEqual(exp);
  });

  it('should return for nested object', () => {
    const datum = { nested: { test: 101, extra: 321 } };

    const res = getStackBarLabelContent(
      datum,
      ['nested.test'],
      d => d.extra,
      0,
    );
    const exp = { extra: 321, separator: ' - ', value: 101 };
    expect(res).toStrictEqual(exp);
  });
});

describe('getStackBarLabelMorphology()', () => {
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
  const content = { value: '10', separator: ' - ', extra: '23' };
  const position = { x: 0, y: 0 };
  const dimension = { xMax: 800, yMax: 600 };

  it('should return morphology', () => {
    const res = getStackBarLabelMorphology(
      bar,
      undefined,
      content,
      24,
      position,
      dimension,
      true,
    );
    const exp = {
      rect: { width: 19, x: 2.5, y: 56 },
      text: { x: 12, y: 69 },
    };
    expect(res).toStrictEqual(exp);
  });

  it('should return morphology w extra data', () => {
    const res = getStackBarLabelMorphology(
      bar,
      () => 'true',
      content,
      24,
      position,
      dimension,
      true,
    );
    const exp = {
      rect: { width: 67, x: -21.5, y: 56 },
      text: { x: 12, y: 69 },
    };
    expect(res).toStrictEqual(exp);
  });

  it('should return morphology w extra data - vertical', () => {
    const res = getStackBarLabelMorphology(
      bar,
      () => 'true',
      content,
      24,
      position,
      dimension,
      false,
    );
    const exp = {
      rect: { width: 67, x: 0, y: 3 },
      text: { x: 33.5, y: 16 },
    };
    expect(res).toStrictEqual(exp);
  });
});
