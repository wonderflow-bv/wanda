import { render } from '@testing-library/react';

import { AspectRatio } from './aspect-ratio';

describe('<AspectRatio>', () => {
  test('it should render properly', () => {
    const { container } = render(<AspectRatio ratio="1"><div>Some content</div></AspectRatio>);
    expect(container).not.toBeNull();
  });
});
