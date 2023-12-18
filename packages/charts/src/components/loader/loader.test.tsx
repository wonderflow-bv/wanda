import { render, screen } from '@testing-library/react';

import { DataProvider } from '../../providers';
import { Charts, LineChartMetadata } from '../../types';
import { BarChartLoader } from './bar-chart-loader';
import { LineChartLoader } from './line-chart-loader';
import { Loader } from './loader';

const mockMetadata: LineChartMetadata = {
  type: Charts.LINE_CHART,
  index: 'test',
  series: {
    dataKey: ['a', 'b'],
    names: ['A', 'B'],
    colors: ['ca', 'cb'],
  },
  overlay: {
    name: '',
    color: '',
  },
  hidePadding: true,
};

describe('<Loader>', () => {
  it('should render the component', () => {
    render(<Loader isLoading />);
    const element = screen.getByTestId('loader');
    expect(element).toBeDefined();
  });

  it('should NOT render the component w/o title', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toBeNull();
  });

  it('should render w context', () => {
    const { container } = render(
      <DataProvider data={[{}, {}]} metadata={mockMetadata}>
        <Loader />
      </DataProvider>,
    );
    expect(container.firstChild).toBeNull();
  });
});

describe('<LineChartLoader>', () => {
  it('should render the component', () => {
    render(<LineChartLoader />);
    const element = screen.getByTestId('line-chart-loader');
    expect(element).toBeDefined();
  });
});

describe('<BarChartLoader>', () => {
  it('should render the component', () => {
    render(<BarChartLoader />);
    const element = screen.getByTestId('bar-chart-loader');
    expect(element).toBeDefined();
  });
});
