import { fireEvent, render } from '@testing-library/react';

import { Button } from '../button';
import { Tooltip } from './tooltip';

describe('<Tooltip>', () => {
  test(' it should render properly', () => {
    const { container, getByText } = render(
      <Tooltip trigger={<Button>Click Me</Button>}>
        Some content
      </Tooltip>,
    );
    const el = getByText('Click Me');
    fireEvent.focus(el);
    fireEvent.blur(el);
    fireEvent.keyPress(el, { code: 'esc', key: 'esc' });
    expect(container).not.toBeNull();
  });
});
