import { fireEvent, render } from '@testing-library/react';

import { ToggleButton } from './toggle-button';

describe('<ToggleButton>', () => {
  test(' it should render properly', () => {
    const { container, getByTestId } = render(
      <ToggleButton restingIcon="bell" />,
    );
    const el = getByTestId('ToggleButton');
    fireEvent.click(el);
    expect(container).not.toBeNull();
  });

  test(' it should render properly with props', () => {
    const { container } = render(
      <ToggleButton restingIcon="bell" pressed />,
    );
    expect(container).not.toBeNull();
  });
});
