import { render } from '@testing-library/react';

import { Masonry } from './masonry';

describe('<Masonry>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <Masonry>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </Masonry>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with props', () => {
    const { container } = render(
      <Masonry columns={{ default: 1, small: 3 }}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </Masonry>,
    );
    expect(container).not.toBeNull();
  });
});
