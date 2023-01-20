import { render } from '@testing-library/react';

import { Spinner } from './spinner';

describe('<Spinner>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <Spinner />,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with props', () => {
    const { container } = render(
      <Spinner dimension="small" />,
    );
    expect(container).not.toBeNull();
  });
});
