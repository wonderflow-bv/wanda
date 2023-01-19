import { render } from '@testing-library/react';

import { Snackbar } from './snackbar';

describe('<Snackbar>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <Snackbar>Content</Snackbar>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with props', () => {
    const { container } = render(
      <Snackbar title="My title" dismissable>Content</Snackbar>,
    );
    expect(container).not.toBeNull();
  });
});
