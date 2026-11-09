import { render, screen } from '@testing-library/react';

import { ProductCard } from './product-card';

describe('<ProductCard>', () => {
  const SourceImages = [
    'https://products.gumlet.io/image-1675779605803.jpeg',
    'https://storage.googleapis.com/wonderflow-product-images/KITCHENAID%205KSM15%20SERIES.png',
    'https://storage.googleapis.com/wonderflow-product-images/CLASSIC%204.5%20QT.png',
    'this-is-a-broken-link.png',
  ];
  test('it should render properly', () => {
    const { container } = render(
      <ProductCard isLoading />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with props', () => {
    const { container } = render(
      <ProductCard
        title="title"
        subtitle="subtitle"
        source={SourceImages}
        rating={1.2}
        feedbackCount={1.2}
        votesCount={1.2}
        votesRating={1.2}
        sentiment={1.2}
        nps={1.2}
        groups={1.2}
        priceMin={1.2}
        priceMax={1.2}
        users={1.2}
        skus={1.2}
        kpiItems={2}
        kpisRowGap={16}
        bordered
        highlightOnHover
        ratio="1/1"
      />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with overlay actions', () => {
    const { container } = render(
      <ProductCard
        title="title"
        subtitle="subtitle"
        source={SourceImages}
        rating={1.2}
        feedbackCount={1.2}
        votesCount={1.2}
        overlayActions={<div>some content</div>}
      />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with on click', () => {
    const spyOnClick = jest.fn();
    const { container } = render(
      <ProductCard
        title="title"
        subtitle="subtitle"
        source={SourceImages}
        rating={1.2}
        feedbackCount={1.2}
        votesCount={1.2}
        onClick={spyOnClick}
      />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with children', () => {
    const spyOnClick = jest.fn();
    const { container } = render(
      <ProductCard
        title="title"
        subtitle="subtitle"
        source={SourceImages}
        rating={1.2}
        feedbackCount={1.2}
        votesCount={1.2}
        onClick={spyOnClick}
        footer={<div>some content</div>}
      >
        <div>some content</div>
      </ProductCard>,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with colored cover', () => {
    const { container } = render(
      <ProductCard
        title="title"
        subtitle="subtitle"
        rating={1.2}
        feedbackCount={1.2}
        votesCount={1.2}
        votesRating={1.2}
        sentiment={1.2}
        nps={1.2}
        groups={1.2}
        priceMin={1.2}
        priceMax={1.2}
        users={1.2}
        skus={1.2}
        kpiItems={2}
        kpisRowGap={16}
        bordered
        highlightOnHover
        hasColoredCover
      />,
    );

    expect(container).not.toBeNull();

    const coverText = screen.getByText('ti');
    expect(coverText).toBeDefined();
  });

  test('it should render the top bar only when sourceLabel is set', () => {
    const { container, rerender } = render(<ProductCard title="title" />);

    expect(container.querySelector('[data-inner-element="ProductCard-TopBar"]')).toBeNull();

    rerender(<ProductCard title="title" sourceLabel="Amazon" sourceIcon={<img alt="logo" src="logo.png" />} />);

    expect(container.querySelector('[data-inner-element="ProductCard-TopBar"]')).not.toBeNull();
    expect(screen.getByText('Amazon')).toBeDefined();
    expect(screen.getByAltText('logo')).toBeDefined();
  });

  test('it should render the badge only over a cover and not while loading', () => {
    const { container, rerender } = render(<ProductCard title="title" source={SourceImages} badge="New" />);
    const badge = () => container.querySelector('[data-inner-element="ProductCard-Badge"]');

    expect(badge()).not.toBeNull();
    expect(screen.getByText('New')).toBeDefined();

    rerender(<ProductCard title="title" hasColoredCover badge="New" />);
    expect(badge()).not.toBeNull();

    rerender(<ProductCard title="title" source={SourceImages} badge="New" isLoading />);
    expect(badge()).toBeNull();

    rerender(<ProductCard title="title" badge="New" />);
    expect(badge()).toBeNull();
  });

  test('it should render the footer separator only with a footer or while loading', () => {
    const { container, rerender } = render(<ProductCard title="title" />);

    expect(container.querySelectorAll('hr')).toHaveLength(0);

    rerender(<ProductCard title="title" footer="Apr 2023" />);
    expect(container.querySelectorAll('hr')).toHaveLength(1);

    rerender(<ProductCard title="title" isLoading />);
    expect(container.querySelectorAll('hr')).toHaveLength(1);

    rerender(<ProductCard title="title" sourceLabel="Amazon" footer="Apr 2023" />);
    expect(container.querySelectorAll('hr')).toHaveLength(2);
  });

  test('it should be bordered by default', () => {
    const { container, rerender } = render(<ProductCard title="title" />);

    expect(container.querySelector('[data-card-bordered="true"]')).not.toBeNull();

    rerender(<ProductCard title="title" bordered={false} />);
    expect(container.querySelector('[data-card-bordered="false"]')).not.toBeNull();
  });
});
