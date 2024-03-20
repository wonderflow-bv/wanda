import { renderHook } from '@testing-library/react-hooks';
import { scaleLinear, scaleUtc } from '@visx/scale';

import { DataProvider, LayoutProvider, ThemeProvider } from '@/providers';

import {
  AxisOrientation, AxisProps, CartesianChartLayout, Charts,
} from '../types';
import { useAverage } from './useAverage';
import { useBarChart, UseBarChartProps } from './useBarChart';
import { useBars } from './useBars';
import { useBrush, UseBrushProps } from './useBrush';
import { useCartesian, UseCartesianProps } from './useCartesian';
import { useLineChart, UseLineChartProps } from './useLineChart';
import { useLines } from './useLines';
import { useSSR } from './useSSR';
import { useTrendline } from './useTrendline';

const wrapper = ({ children }: { children: any }) => (
  <ThemeProvider theme="light">
    <LayoutProvider layout={CartesianChartLayout.HORIZONTAL}>
      <DataProvider
        data={[{ date: '2022', value: 100 }, { date: '2023', value: 90 }]}
        metadata={{
          fixedBarSize: false,
          hidePadding: false,
          index: 'date',
          isStacked: false,
          overlay: {
            average: undefined,
            colors: undefined,
            dataKey: undefined,
            names: undefined,
            showBackground: undefined,
            style: undefined,
            trendline: undefined,
            extraData: undefined,
          },
          preventTooltipDisplay: false,
          series: {
            average: {
              average: 95,
              dataKey: [
                {
                  average: 95,
                  name: 'value',
                },
              ],
            },
            colors: [
              'hsl(149 83% 35%)',
            ],
            dataKey: [
              'value',
            ],
            names: [
              'Value',
            ],
            showBackground: undefined,
            style: undefined,
            trendline: undefined,
            extraData: undefined,
          },
          showAverage: true,
          showBackground: true,
          showLabel: false,
          showTrendline: false,
          sortBy: 'as-is',
          type: Charts.BAR_CHART,
          tooltipExtraContent: undefined,
        }}
        filteredData={[{ date: '2022', value: 100 }, { date: '2023', value: 90 }]}
      >
        {children}
      </DataProvider>
    </LayoutProvider>
  </ThemeProvider>
);

describe('useLineChart()', () => {
  it.skip('should render data', () => {
    const props: UseLineChartProps = {
      theme: 'light',
      data: [{ a: 1, b: 2, c: 3 }],
      index: { dataKey: 'a' },
      series: { dataKey: ['b'] },
      overlay: { dataKey: ['c'] },
    };
    const { result } = renderHook(() => useLineChart(props));
    const { isHorizontal, metadata } = result.current;

    const expMetadata = {
      hideMissingDataConnection: false,
      hidePadding: false,
      index: 'a',
      overlay: {
        average: {
          average: 3,
          dataKey: [
            {
              average: 3,
              name: 'c',
            },
          ],
        },
        color: 'hsl(14 63% 53%)',
        dataKey: 'c',
        name: 'C',
        style: undefined,
      },
      renderAs: 'curves',
      series: {
        average: {
          average: 2,
          dataKey: [
            {
              average: 2,
              name: 'b',
            },
          ],
        },
        colors: [
          'hsl(149 83% 35%)',
        ],
        dataKey: [
          'b',
        ],
        names: [
          'B',
        ],
        style: undefined,
      },
      showAverage: false,
      showMarker: false,
      showMarkerLabel: false,
      tooltip: undefined,
      type: 'LINE_CHART',
    };

    expect(isHorizontal).toBeTruthy();
    expect(metadata).toStrictEqual(expMetadata);
  });
});

describe('useLines()', () => {
  it('should return', () => {
    const { result } = renderHook(() => useLines(), { wrapper });
    const { data, isHorizontal } = result.current;
    expect(data).toStrictEqual([{ date: '2022', value: 100 }, { date: '2023', value: 90 }]);
    expect(isHorizontal).toBeTruthy();
  });
});

describe('useCartesian()', () => {
  const mockedAxis: Record<AxisOrientation, AxisProps | undefined> = {
    top: {
      domain: [0, 1],
      scaleType: 'linear',
      orientation: 'top',
    },
    right: {
      domain: ['a', 'b'],
      scaleType: 'label',
      orientation: 'right',
    },
    bottom: {
      domain: ['01-01-2020', '01-01-2024'],
      scaleType: 'time',
      orientation: 'bottom',
    },
    left: {
      domain: [0, 1],
      scaleType: 'linear',
      orientation: 'left',
    },
  };
  it('should render data', () => {
    const props: UseCartesianProps = {
      axis: mockedAxis,
      axisFiltered: mockedAxis,
      hideLegend: false,
    };
    const { result } = renderHook(() => useCartesian(props));
    const { cartesianConfig } = result.current;

    const exp = 'hsl(0 0% 100%)';

    expect(cartesianConfig.themes.light.background.from).toStrictEqual(exp);
  });
});

describe('useBrush()', () => {
  const props: UseBrushProps = {
    axisSystem: {
      bottom: {
        domain: ['2001', '2002'],
        scaleType: 'time',
        orientation: 'bottom',
        scale: scaleUtc([0, 1] as any),
        top: 100,
        left: 100,
      },
      left: {
        domain: [0, 1],
        scaleType: 'linear',
        orientation: 'left',
        scale: scaleLinear([0, 1] as any),
        top: 100,
        left: 100,
      },
      top: undefined,
      right: undefined,
    },
    position: {
      top: 10,
      left: 10,
    },
    dimension: {
      maxHeight: 100,
      maxWidth: 100,
    },
    onChange: jest.fn(),
  };
  it('should render data', () => {
    const { result } = renderHook(() => useBrush(props));
    const { margin } = result.current;
    const exp = {
      bottom: 0, left: 10, right: 0, top: 0,
    };
    expect(margin).toStrictEqual(exp);
  });
});

describe('useSSR()', () => {
  test('it should return true in Browser', () => {
    const { result } = renderHook(() => useSSR());

    const d = window?.document;

    expect(d).toBeTruthy();
    expect(result.current.isBrowser).toBe(true);
    expect(result.current.isServer).not.toBe(true);
  });
});

describe('useBarChart()', () => {
  const props: UseBarChartProps = {
    layout: CartesianChartLayout.HORIZONTAL,
    height: 600,
    sortBy: 'as-is',
    data: [{ date: '2022', value: 100 }, { date: '2023', value: 90 }],
    index: { dataKey: 'date' },
    series: { dataKey: ['value'] },
    preventTooltipDisplay: false,
    showAverage: true,
    showTrendline: false,
    showLabel: false,
    showBackground: true,
    hidePadding: false,
    fixedBarSize: false,
  };
  test('it should return metadata configuration', () => {
    const { result } = renderHook(() => useBarChart(props));
    const { metadata } = result.current;
    const res = {
      fixedBarSize: false,
      hidePadding: false,
      index: 'date',
      isStacked: false,
      overlay: {
        average: undefined,
        extraData: undefined,
        colors: undefined,
        dataKey: undefined,
        names: undefined,
        showBackground: undefined,
        style: undefined,
        trendline: undefined,
      },
      preventTooltipDisplay: false,
      series: {
        average: {
          average: 95,
          dataKey: [
            {
              average: 95,
              name: 'value',
            },
          ],
        },
        colors: [
          'hsl(149 83% 35%)',
        ],
        dataKey: [
          'value',
        ],
        names: [
          'Value',
        ],
        extraData: undefined,
        showBackground: undefined,
        style: undefined,
        trendline: undefined,
      },
      showAverage: true,
      showBackground: true,
      showLabel: false,
      showTrendline: false,
      sortBy: 'as-is',
      type: 'BAR_CHART',
      tooltipExtraContent: undefined,
    };
    expect(metadata).toStrictEqual(res);
  });
});

describe('useBars()', () => {
  it.skip('should return', () => {
    const { result } = renderHook(() => useBars(), { wrapper });
    const { data, isHorizontal } = result.current;
    expect(data).toStrictEqual([{ date: '2022', value: 100 }, { date: '2023', value: 90 }]);
    expect(isHorizontal).toBeTruthy();
  });
});

describe('useAverage()', () => {
  it('should return', () => {
    const { result } = renderHook(() => useAverage(), { wrapper });
    const { averageSeries } = result.current;
    expect(averageSeries).toStrictEqual(95);
  });
});

describe('useTrendline()', () => {
  it('should return', () => {
    const { result } = renderHook(() => useTrendline(), { wrapper });
    const { hasTrendlineSeries } = result.current;
    expect(hasTrendlineSeries).not.toBeTruthy();
  });
});
