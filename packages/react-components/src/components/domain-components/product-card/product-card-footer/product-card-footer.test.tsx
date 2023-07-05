import { render } from '@testing-library/react';

import { ProductCardFooter } from './product-card-footer';

describe('<ProductCardFooter>', () => {
  test('it should render properly', () => {
    const { container } = render(
      <ProductCardFooter />,
    );

    expect(container).not.toBeNull();
  });
  test('it should render properly with props', () => {
    const { container } = render(
      <ProductCardFooter isLoading>
        <div>some content here</div>
      </ProductCardFooter>,
    );

    expect(container).not.toBeNull();
  });
});
