import { render } from '@testing-library/react';

import { ProductCardKpis } from './product-card-kpis';

describe('<ProductCardKpis>', () => {
  test('it should render properly', () => {
    const { container } = render(
      <ProductCardKpis />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with props', () => {
    const { container } = render(
      <ProductCardKpis
        rating={1.2}
        feedbackCount={1.2}
        votesCount={1.2}
        votesRating={1.2}
        sentiment={1.2}
        nps={1.2}
        tgw={1}
        groups={1.2}
        priceMin={1.2}
        priceMax={1.2}
        users={1.2}
        skus={1.2}
      />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render skeleton properly', () => {
    const { container } = render(
      <ProductCardKpis
        isLoading
      />,
    );

    expect(container).not.toBeNull();
  });
});
