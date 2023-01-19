import { render } from '@testing-library/react';

import { Separator } from './separator';

describe('<Separator>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <Separator />,
    );
    expect(container).not.toBeNull();
  });
});
