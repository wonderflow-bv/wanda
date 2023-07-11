import { render } from '@testing-library/react';

import { ProductCardMedia } from './product-card-media';

describe('<ProductCardMedia>', () => {
  const SourceImages = [
    'https://products.gumlet.io/image-1675779605803.jpeg',
    'https://storage.googleapis.com/wonderflow-product-images/KITCHENAID%205KSM15%20SERIES.png',
    'https://storage.googleapis.com/wonderflow-product-images/CLASSIC%204.5%20QT.png',
    'https://broken-link.png',
  ];
  test('it should render properly', () => {
    const { container } = render(
      <ProductCardMedia source={SourceImages} />,
    );

    expect(container).not.toBeNull();
  });
  test('it should render properly with props', () => {
    const { container } = render(
      <ProductCardMedia source={SourceImages} isLoading ratio="1" />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with 1 image', () => {
    const s = SourceImages.slice(0, 1);
    const { container } = render(
      <ProductCardMedia source={s} isLoading ratio="1" />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with 3 image', () => {
    const s = SourceImages.slice(0, 3);
    const { container } = render(
      <ProductCardMedia source={s} isLoading ratio="1" />,
    );

    expect(container).not.toBeNull();
  });
});
