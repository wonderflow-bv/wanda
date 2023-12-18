import { render, screen } from '@testing-library/react';

import { LineChart } from './line-chart';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('<LineChart>', () => {
  it('should render the component', () => {
    render(<LineChart
      data={[{ date: 'a', value: 1 }, { date: 'b', value: 2 }]}
      index={{ dataKey: 'date' }}
      series={{ dataKey: ['value'] }}
      overlay={{ dataKey: 'value' }}
      title="Title"
    />);

    const element = screen.getByTestId('cartesian');
    expect(element).toBeDefined();
  });

  it('should render the component w/o padding', () => {
    render(<LineChart
      data={[{ date: 'a', value: 1 }, { date: 'b', value: 2 }]}
      index={{ dataKey: 'date' }}
      series={{ dataKey: ['value'] }}
      overlay={{ dataKey: 'value' }}
      hidePadding
      hideLegend
    />);

    const element = screen.getByTestId('cartesian');
    expect(element).toBeDefined();
  });
});
