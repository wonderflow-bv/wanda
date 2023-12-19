import { render, screen } from '@testing-library/react';

import { Tooltip } from './tooltip';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('<Tooltip>', () => {
  it('should render the component', () => {
    render(<Tooltip isOpen top={400} left={400} />);
    const element = screen.findByTestId('tooltip');
    expect(element).toBeDefined();
  });

  it('should NOT render the component if isOpen is false', () => {
    const { container } = render(<Tooltip />);
    const element = container.firstChild;
    expect(element).toBeNull();
  });
});
