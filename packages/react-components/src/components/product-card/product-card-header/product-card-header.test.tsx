import { render } from '@testing-library/react';

import { ProductCardHeader } from './product-card-header';

describe('<ProductCardHeader>', () => {
  test('it should render properly', () => {
    const { container } = render(
      <ProductCardHeader />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with props', () => {
    const { container } = render(
      <ProductCardHeader
        title="title"
        subtitle="subtitle"
        description="description"
        titleRows={2}
        descriptionRows={2}
      />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with skeleton', () => {
    const { container } = render(
      <ProductCardHeader
        title="title"
        subtitle="subtitle"
        description="description"
        menuActions={<div>some content</div>}
        isLoading
      />,
    );

    expect(container).not.toBeNull();
  });
});
