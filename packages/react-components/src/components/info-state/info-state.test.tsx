import { render } from '@testing-library/react';

import { Button } from '../button';
import { InfoState } from './info-state';

describe('<InfoState>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <InfoState title="My title" icon="compass">Content</InfoState>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with props', () => {
    const { container } = render(
      <InfoState
        title="My title"
        direction="column"
        image="https://svgshare.com/i/b5f.svg"
        actions={<Button>Click</Button>}
      >
        Content
      </InfoState>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with image row', () => {
    const { container } = render(
      <InfoState
        title="My title"
        direction="row"
        image="https://svgshare.com/i/b5f.svg"
        actions={<Button>Click</Button>}
      >
        Content
      </InfoState>,
    );
    expect(container).not.toBeNull();
  });
});
