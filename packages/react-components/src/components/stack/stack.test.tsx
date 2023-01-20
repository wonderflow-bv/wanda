import { render } from '@testing-library/react';

import { Stack } from './stack';

describe('<Stack>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <Stack>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Stack>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with props', () => {
    const { container } = render(
      <Stack direction="row" rowGap={2} columnGap={2} vPadding={2} hPadding={2} vAlign="start" hAlign="end">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Stack>,
    );
    expect(container).not.toBeNull();
  });
});
