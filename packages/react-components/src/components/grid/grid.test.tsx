import { render } from '@testing-library/react';

import { Grid } from './grid';

describe('<Grid>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <Grid>
        <Grid.Item>1</Grid.Item>
        <Grid.Item>2</Grid.Item>
        <Grid.Item>3</Grid.Item>
      </Grid>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with props', () => {
    const { container } = render(
      <Grid rowGap={2} columnGap={2}>
        <Grid.Item>1</Grid.Item>
        <Grid.Item>2</Grid.Item>
        <Grid.Item>3</Grid.Item>
      </Grid>,
    );
    expect(container).not.toBeNull();
  });
});
