import { render } from '@testing-library/react';

import { StarMeter } from './star-meter';

describe('<StarMeter>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <StarMeter value={0} dimension="small" />,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with half value', () => {
    const { container } = render(
      <StarMeter value={1.5} />,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with fraction value', () => {
    const { container } = render(
      <StarMeter value={1.33} />,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with high fraction value', () => {
    const { container } = render(
      <StarMeter value={1.83} />,
    );
    expect(container).not.toBeNull();
  });
});
