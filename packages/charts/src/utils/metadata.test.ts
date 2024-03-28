import { colorPaletteDefault } from '../style-config/colors';
import { LineChartSeries } from '../types';
import {
  handleLineChartSeriesColors, handleSeriesNames,
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
      rename: k => k.replace('test', 'item'),
    };
    const res = handleSeriesNames(series);
    const exp = ['Index 01', 'Index 52'];
    expect(res).toStrictEqual(exp);
  });
});

describe('handleLineChartSeriesColors()', () => {
  const colors = colorPaletteDefault.light;

  it('should return custom styled color', () => {
    const series: LineChartSeries = {
      dataKey: ['test1', 'test2'],
      style: [{ stroke: 'blue' }, { stroke: 'green' }],
    };
    const res = handleLineChartSeriesColors(series, colors);
    const exp = ['blue', 'green'];
    expect(res).toStrictEqual(exp);
  });

  it('should return default palette color', () => {
    const series: LineChartSeries = {
      dataKey: ['test1', 'test2'],
    };
    const res = handleLineChartSeriesColors(series, colors);
    const exp = ['hsl(149 83% 35%)', 'hsl(350 66% 49%)'];
    expect(res).toStrictEqual(exp);
  });

  it('should return default palette color for a value greater than the palette color', () => {
    const series: LineChartSeries = {
      dataKey: Array(14).fill('test'),
    };
    const res = handleLineChartSeriesColors(series, colors)[13];
    const exp = 'hsl(350 66% 49%)';
    expect(res).toStrictEqual(exp);
  });
});

