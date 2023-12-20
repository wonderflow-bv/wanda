import { render, screen } from '@testing-library/react';

import { BarChart } from './bar-chart';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('<BarChart>', () => {
  it('should render the component', () => {
    render(<BarChart
      data={[{ date: 'a', value: 1 }, { date: 'b', value: 2 }]}
      index={{ dataKey: 'date' }}
      series={{ dataKey: ['value'] }}
      overlay={{ dataKey: 'value' }}
      title="Title"
    />);

    const element = screen.getByTestId('cartesian');
    expect(element).toBeDefined();
  });
});
