import { render } from '@testing-library/react';

import { Text } from './text';

describe('<Text>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <Text>Some text</Text>,
    );
    expect(container).not.toBeNull();
  });
});
