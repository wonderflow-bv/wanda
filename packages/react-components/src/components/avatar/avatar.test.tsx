import { render } from '@testing-library/react';

import { Avatar } from './avatar';

describe('<Avatar>', () => {
  test('should render properly', () => {
    const { container } = render(<Avatar src="https://xsgames.co/randomusers/avatar.php?g=male" dimension="small" />);
    expect(container).not.toBeNull();
  });

  test('should render properly - w/o dimension', () => {
    const { container } = render(<Avatar src="https://xsgames.co/randomusers/avatar.php?g=male" />);
    expect(container).not.toBeNull();
  });

  test('should render properly - w/o src', () => {
    const { container } = render(<Avatar />);
    expect(container).not.toBeNull();
  });
});
