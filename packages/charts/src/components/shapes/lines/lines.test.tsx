import { render, screen } from '@testing-library/react';

import {
  CartesianProvider, DataProvider, LayoutProvider, ThemeProvider,
} from '../../../providers';
import {
  CartesianChartLayout, CartesianxAxisSystem, Charts, LineChartMetadata,
} from '../../../types';
import { Lines } from './lines';

// const Providers = () => (
//   <DataProvider data={[{}]} metadata={}>
//     {children}
//   </DataProvider>
// );

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const mockMetadata: LineChartMetadata = {
  type: Charts.LINE_CHART,
  index: 'date',
  series: {
    dataKey: ['a'],
    names: ['A'],
    colors: ['ca'],
  },
  overlay: {
    dataKey: 'b',
    name: 'B',
    color: 'ob',
  },
  hidePadding: true,
};

const mockedAxisSystem: CartesianxAxisSystem | undefined = {
  top: {
    domain: [0, 1],
    scaleType: 'linear',
    orientation: 'top',
    top: 0,
    left: 0,
    scale: jest.fn() as any,
  },
  right: {
    domain: ['a', 'b'],
    scaleType: 'label',
    orientation: 'right',
    top: 0,
    left: 800,
    scale: jest.fn() as any,
  },
  bottom: {
    domain: ['01-01-2020', '01-01-2024'],
    scaleType: 'time',
    orientation: 'bottom',
    top: 600,
    left: 0,
    scale: jest.fn() as any,
  },
  left: {
    domain: [0, 1],
    scaleType: 'linear',
    orientation: 'left',
    top: 0,
    left: 0,
    scale: jest.fn() as any,
  },
};

describe('<Lines>', () => {
  it('should render the component', () => {
    render(
      <ThemeProvider theme="light">
        <LayoutProvider layout={CartesianChartLayout.HORIZONTAL}>
          <DataProvider
            data={[{ date: 0, a: 1, b: 2 }]}
            metadata={mockMetadata}
          >
            <CartesianProvider
              position={{
                top: 24, right: 24, bottom: 24, left: 24,
              }}
              dimension={{ maxHeight: 600, maxWidth: 800 }}
              axis={mockedAxisSystem}
            >
              <Lines />
            </CartesianProvider>
          </DataProvider>
        </LayoutProvider>
      </ThemeProvider>,
    );
    const elementSeries = screen.getByTestId('lines-series');
    const elementOverlay = screen.getByTestId('lines-overlay');
    expect(elementSeries).toBeDefined();
    expect(elementOverlay).toBeDefined();
  });

  it('should render the component w vertical layout', () => {
    render(
      <ThemeProvider theme="light">
        <LayoutProvider layout={CartesianChartLayout.VERTICAL}>
          <DataProvider
            data={[{ date: 0, a: 1, b: 2 }]}
            metadata={mockMetadata}
          >
            <CartesianProvider
              position={{
                top: 24, right: 24, bottom: 24, left: 24,
              }}
              dimension={{ maxHeight: 600, maxWidth: 800 }}
              axis={mockedAxisSystem}
            >
              <Lines />
            </CartesianProvider>
          </DataProvider>
        </LayoutProvider>
      </ThemeProvider>,
    );
    const elementSeries = screen.getByTestId('lines-series');
    const elementOverlay = screen.getByTestId('lines-overlay');
    expect(elementSeries).toBeDefined();
    expect(elementOverlay).toBeDefined();
  });

  it('should render the component w markerLabel', () => {
    render(
      <ThemeProvider theme="light">
        <LayoutProvider layout={CartesianChartLayout.HORIZONTAL}>
          <DataProvider
            data={[{ date: 0, a: 1, b: 2 }]}
            metadata={{ ...mockMetadata, showMarkerLabel: true }}
          >
            <CartesianProvider
              position={{
                top: 24, right: 24, bottom: 24, left: 24,
              }}
              dimension={{ maxHeight: 600, maxWidth: 800 }}
              axis={mockedAxisSystem}
            >
              <Lines />
            </CartesianProvider>
          </DataProvider>
        </LayoutProvider>
      </ThemeProvider>,
    );
    const elementSeries = screen.getByTestId('lines-series');
    const elementOverlay = screen.getByTestId('lines-overlay');
    expect(elementSeries).toBeDefined();
    expect(elementOverlay).toBeDefined();
  });

  it('should render the component w/o missing connection', () => {
    render(
      <ThemeProvider theme="light">
        <LayoutProvider layout={CartesianChartLayout.HORIZONTAL}>
          <DataProvider
            data={
              [{ date: 0, a: 1, b: 2 },
                { date: 0, a: undefined, b: 2 },
                { date: 0, a: 1, b: 2 }]
            }
            metadata={{ ...mockMetadata, hideMissingDataConnection: true }}
          >
            <CartesianProvider
              position={{
                top: 24, right: 24, bottom: 24, left: 24,
              }}
              dimension={{ maxHeight: 600, maxWidth: 800 }}
              axis={mockedAxisSystem}
            >
              <Lines />
            </CartesianProvider>
          </DataProvider>
        </LayoutProvider>
      </ThemeProvider>,
    );
    const elementOverlay = screen.getByTestId('lines-overlay');
    expect(elementOverlay).toBeDefined();
  });
});
