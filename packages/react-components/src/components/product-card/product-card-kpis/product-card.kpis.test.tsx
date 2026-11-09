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

  test('it should render properly with a non-default currency', () => {
    const { container } = render(
      <ProductCardKpis
        priceMin={5}
        priceMax={20}
        currency="BRL"
        currencyDecimals={2}
      />,
    );

    expect(container).not.toBeNull();
    expect(container.textContent).toContain('R$');
  });

  test('it should format decimals with one digit and counts in compact notation', () => {
    const { container } = render(
      <ProductCardKpis
        rating={4.26}
        sentiment={0.54}
        feedbackCount={1234}
        votesCount={234000}
        users={1789}
        usersCap={1000}
        skus={12}
        kpiItems={11}
      />,
    );

    const text = container.textContent;
    expect(text).toContain('4.3');
    expect(text).toContain('0.5');
    expect(text).toContain('1.2K');
    expect(text).toContain('234K');
    expect(text).toContain('1.8K / 1K');
    expect(text).toContain('12');
  });

  test('it should render at most kpiItems rows', () => {
    const { container } = render(<ProductCardKpis rating={4} feedbackCount={10} votesCount={20} kpiItems={2} />);

    expect(container.querySelectorAll('p')).toHaveLength(2);
  });
});
