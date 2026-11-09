import { render, screen } from '@testing-library/react';

import { ProductCardTopBar } from './product-card-top-bar';

describe('<ProductCardTopBar>', () => {
  test('it should render the label and the icon', () => {
    render(<ProductCardTopBar sourceLabel="Amazon" sourceIcon={<img alt="logo" src="logo.png" />} />);

    expect(screen.getByText('Amazon')).toBeDefined();
    expect(screen.getByAltText('logo')).toBeDefined();
  });

  test('it should hide the label while loading', () => {
    render(<ProductCardTopBar sourceLabel="Amazon" isLoading />);

    expect(screen.queryByText('Amazon')).toBeNull();
  });
});
