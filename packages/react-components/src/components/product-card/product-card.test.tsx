import { render } from '@testing-library/react';

import { ProductCard } from './product-card';

describe('<ProductCard>', () => {
  const SourceImages = [
    'https://products.gumlet.io/image-1675779605803.jpeg',
    'https://storage.googleapis.com/wonderflow-product-images/KITCHENAID%205KSM15%20SERIES.png',
    'https://storage.googleapis.com/wonderflow-product-images/CLASSIC%204.5%20QT.png',
    'https://broken-link.png',
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
        direction="horizontal"
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
  test('it should render properly with menu actions', () => {
    const { container } = render(
      <ProductCard
        title="title"
        subtitle="subtitle"
        source={SourceImages}
        direction="horizontal"
        rating={1.2}
        feedbackCount={1.2}
        votesCount={1.2}
        menuActions={<div>some content</div>}
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
        direction="horizontal"
        rating={1.2}
        feedbackCount={1.2}
        votesCount={1.2}
        overlayActions={<div>some content</div>}
      />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with on click', () => {
    const { container } = render(
      <ProductCard
        title="title"
        subtitle="subtitle"
        source={SourceImages}
        direction="horizontal"
        rating={1.2}
        feedbackCount={1.2}
        votesCount={1.2}
        onClick={() => console.log('clicked')}
      />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with children', () => {
    const { container } = render(
      <ProductCard
        title="title"
        subtitle="subtitle"
        source={SourceImages}
        direction="horizontal"
        rating={1.2}
        feedbackCount={1.2}
        votesCount={1.2}
        onClick={() => console.log('clicked')}
        footer={<div>some content</div>}
      >
        <div>some content</div>
      </ProductCard>,
    );

    expect(container).not.toBeNull();
  });
});
