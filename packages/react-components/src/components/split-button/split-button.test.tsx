import { render } from '@testing-library/react';

import { SplitButton } from './split-button';

describe('<SplitButton>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <SplitButton label="My Label">Text</SplitButton>,
    );
    expect(container).not.toBeNull();
  });
});
