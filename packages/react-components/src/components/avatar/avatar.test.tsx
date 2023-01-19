import { render } from '@testing-library/react';

import { Avatar } from './avatar';

describe('<Avatar>', () => {
  test('should render properly', () => {
    const { container } = render(<Avatar src="https://api.lorem.space/image/face?w=150&h=150" dimension="small" />);
    expect(container).not.toBeNull();
  });

  test('should render properly - w/o dimension', () => {
    const { container } = render(<Avatar src="https://api.lorem.space/image/face?w=150&h=150" />);
    expect(container).not.toBeNull();
  });
});
