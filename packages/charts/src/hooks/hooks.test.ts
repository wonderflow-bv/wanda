import { renderHook } from '@testing-library/react-hooks';
import { scaleLinear, scaleUtc } from '@visx/scale';

import { AxisOrientation, AxisProps } from '../types';
import { useBrush, UseBrushProps } from './useBrush';
import { useCartesian, UseCartesianProps } from './useCartesian';
import { useLineChart, UseLineChartProps } from './useLineChart';
import { useSSR } from './useSSR';

describe('useLineChart', () => {
  it('should render data', () => {
    const props: UseLineChartProps = {
      theme: 'light',
      data: [{ a: 1, b: 2, c: 3 }],
      index: { dataKey: 'a' },
      series: { dataKey: ['b'] },
      overlay: { dataKey: 'c' },
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

describe('useCartesian', () => {
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

describe('useBrush', () => {
  it('should render data', () => {
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
