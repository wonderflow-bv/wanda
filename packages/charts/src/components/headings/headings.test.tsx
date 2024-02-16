import { render, screen } from '@testing-library/react';

import { Headings } from './headings';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('<Headings>', () => {
  it('should render the component', () => {
    render(<Headings title="Title" />);
    const element = screen.getByTestId('headings');
    expect(element).toBeDefined();
  });

  it('should NOT render the component w/o title', () => {
    const { container } = render(<Headings />);
    expect(container.firstChild).toBeNull();
  });
});
