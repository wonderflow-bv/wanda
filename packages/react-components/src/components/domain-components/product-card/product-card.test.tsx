import { render } from '@testing-library/react';

import { ProductCard } from './product-card';

describe('<ProductCard>', () => {
  test('it should render properly', () => {
    const { container } = render(
      <ProductCard />,
    );

    expect(container).not.toBeNull();
  });
});