import { fireEvent, render } from '@testing-library/react';

import { Chip } from './chip';

describe('<Chip>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <Chip icon="bell">Text</Chip>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should dismiss properly', () => {
    const { container, getByTestId } = render(
      <Chip interactive>Text</Chip>,
    );
    fireEvent.click(getByTestId('InteractiveButton'));
    expect(container).not.toBeNull();
  });
});
