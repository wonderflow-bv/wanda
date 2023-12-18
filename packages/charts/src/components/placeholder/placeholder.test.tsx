import { render, screen } from '@testing-library/react';

import { Placeholder } from './placeholder';

describe('<Placeholder>', () => {
  it('should render the component', () => {
    render(<Placeholder />);
    const element = screen.getByTestId('placeholder');
    expect(element).toBeDefined();
  });

  it('should render the component w color', () => {
    render(<Placeholder color="red" />);
    const element = screen.getByTestId('placeholder');
    expect(element).toBeDefined();
  });
});
