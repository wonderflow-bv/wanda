import '@testing-library/jest-dom';

import {
  render, screen,
} from '@testing-library/react';

import {
  CartesianProvider, DataProvider, LayoutProvider, ThemeProvider,
} from '../../../providers';
import {
  BarChartMetadata,
  CartesianChartLayout, CartesianxAxisSystem, Charts,
} from '../../../types';
import { Bars } from './bars';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const mockMetadata: BarChartMetadata = {
  type: Charts.BAR_CHART,
  index: 'date',
  isStacked: false,
  sortBy: 'as-is',
  series: {
    dataKey: ['a'],
    names: ['A'],
    colors: ['ca'],
    average: undefined,
    trendline: undefined,
  },
  overlay: {
    dataKey: ['b'],
    names: ['B'],
    colors: ['ob'],
    average: undefined,
    trendline: undefined,
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

describe('<Bars>', () => {
  it('should render the component', () => {
    render(
      <ThemeProvider theme="light">
        <LayoutProvider layout={CartesianChartLayout.HORIZONTAL}>
          <DataProvider
            data={[{ date: 0, a: 1, b: 2 }]}
            filteredData={[{ date: 0, a: 1, b: 2 }]}
            metadata={mockMetadata}
          >
            <CartesianProvider
              position={{
                top: 24, right: 24, bottom: 24, left: 24,
              }}
              dimension={{ maxHeight: 600, maxWidth: 800 }}
              axis={mockedAxisSystem}
              hoveredLegendItem=""
              preventTooltipOpening
            >
              <Bars />
            </CartesianProvider>
          </DataProvider>
        </LayoutProvider>
      </ThemeProvider>,
    );
    const element = screen.getByTestId('bars');
    expect(element).toBeDefined();
  });
});
