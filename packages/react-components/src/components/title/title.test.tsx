import { render } from '@testing-library/react';

import { Text } from '../text';
import { Title } from './title';

describe('<Title>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <Title>Some title text</Title>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with props', () => {
    const { container } = render(
      <Title level="display" anchor>Some title text level 3</Title>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with props', () => {
    const { container } = render(
      <Title level="display" anchor><Text>Some text</Text></Title>,
    );
    expect(container).not.toBeNull();
  });
});
