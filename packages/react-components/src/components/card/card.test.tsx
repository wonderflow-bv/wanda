import { render } from '@testing-library/react';

import { Symbol } from '../symbol';
import { Card } from './card';

describe('<Card>', () => {
  test('it should render properly', () => {
    const { container } = render(
      <Card />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with props', () => {
    const { container } = render(
      <Card bordered vibrant highlightOnHover />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with left element', () => {
    const { container } = render(
      <Card left={<Symbol source="bell" dimension="32" />} />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with right element', () => {
    const { container } = render(
      <Card right={<Symbol source="bell" dimension="32" />} />,
    );

    expect(container).not.toBeNull();
  });

  test('it should render properly with child element', () => {
    const { container } = render(
      <Card>Some content here</Card>,
    );

    expect(container).not.toBeNull();
  });
});
