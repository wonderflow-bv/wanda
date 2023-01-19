import { render } from '@testing-library/react';

import { Skeleton } from './skeleton';

describe('<Skeleton>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <Skeleton />,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with props', () => {
    const { container } = render(
      <Skeleton width={100} height={100} gap="16" count={10} inline />,
    );
    expect(container).not.toBeNull();
  });
});
