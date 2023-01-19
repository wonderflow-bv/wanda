import { render } from '@testing-library/react';

import { LinearProgress } from './linear-progress';

describe('<LinearProgress>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <LinearProgress />,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with pros', () => {
    const { container } = render(
      <LinearProgress value={50} max={99} dimension="big" showProgress />,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with value 0', () => {
    const { container } = render(
      <LinearProgress value={0} max={99} dimension="regular" showProgress />,
    );
    expect(container).not.toBeNull();
  });
});
