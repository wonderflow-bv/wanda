import { defaultLineChartPalette } from '../style-config';
import { LineChartOverlay, LineChartSeries } from '../types';
import {
  handleOverlayColor, handleOverlayName, handleSeriesColors, handleSeriesNames,
} from './metadata';

describe('handleSeriesNames()', () => {
  it('should return formatted labels', () => {
    const series: LineChartSeries = {
      dataKey: ['test1', 'test2'],
    };
    const res = handleSeriesNames(series);
    const exp = ['Test 1', 'Test 2'];
    expect(res).toStrictEqual(exp);
  });

  it('should return renamed labels', () => {
    const series: LineChartSeries = {
      dataKey: ['test1', 'test2'],
      rename: (k, i) => k.replace('test', `index ${i * 5}`),
    };
    const res = handleSeriesNames(series);
    const exp = ['Index 01', 'Index 52'];
    expect(res).toStrictEqual(exp);
  });
});

describe('handleSeriesColors()', () => {
  const colors = defaultLineChartPalette.light.series;

  it('should return custom styled color', () => {
    const series: LineChartSeries = {
      dataKey: ['test1', 'test2'],
      style: [{ stroke: 'blue' }, { stroke: 'green' }],
    };
    const res = handleSeriesColors(series, colors);
    const exp = ['blue', 'green'];
    expect(res).toStrictEqual(exp);
  });

  it('should return custom styled color', () => {
    const series: LineChartSeries = {
      dataKey: ['test1', 'test2'],
    };
    const res = handleSeriesColors(series, colors);
    const exp = ['hsl(149 83% 35%)', 'hsl(350 66% 49%)'];
    expect(res).toStrictEqual(exp);
  });
});

describe('handleOverlayName()', () => {
  it('should return default formatted datakey', () => {
    const overlay: LineChartOverlay = {
      dataKey: 'test',
    };
    const res = handleOverlayName(overlay);
    const exp = 'Test';
    expect(res).toStrictEqual(exp);
  });

  it('should return preferred formatted labels', () => {
    const overlay: LineChartOverlay = {
      dataKey: 'test',
      label: 'best',
    };
    const res = handleOverlayName(overlay);
    const exp = 'Best';
    expect(res).toStrictEqual(exp);
  });

  it('should return renamed labels', () => {
    const overlay: LineChartOverlay = {
      dataKey: 'test',
      rename: 'fest',
    };
    const res = handleOverlayName(overlay);
    const exp = 'fest';
    expect(res).toStrictEqual(exp);
  });

  it('should return empty string w/o overlay', () => {
    const res = handleOverlayName(undefined);
    const exp = '';
    expect(res).toStrictEqual(exp);
  });
});

describe('handleOverlayColor()', () => {
  const colors = defaultLineChartPalette.light.overlay;

  it('should return the default color', () => {
    const overlay: LineChartOverlay = {
      dataKey: 'test',
    };
    const res = handleOverlayColor(overlay, colors);
    const exp = 'hsl(14 63% 53%)';
    expect(res).toStrictEqual(exp);
  });

  it('should return a custom styled color', () => {
    const overlay: LineChartOverlay = {
      dataKey: 'test',
      style: { stroke: 'salmon' },
    };
    const res = handleOverlayColor(overlay, colors);
    const exp = 'salmon';
    expect(res).toStrictEqual(exp);
  });
});
