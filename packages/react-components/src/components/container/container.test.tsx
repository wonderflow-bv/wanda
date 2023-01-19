import { render } from '@testing-library/react';

import { Container } from './container';

describe('<Container>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <Container>Content</Container>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with props', () => {
    const { container } = render(
      <Container dimension="medium" padding>Content</Container>,
    );
    expect(container).not.toBeNull();
  });
});
