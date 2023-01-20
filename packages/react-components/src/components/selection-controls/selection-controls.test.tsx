import { render } from '@testing-library/react';

import { Checkbox } from './checkbox';
import { Radio } from './radio';
import { Toggle } from './toggle';

describe('<Checkbox><Rdio><Toggle>', () => {
  test(' they should render properly', () => {
    const { container } = render(
      <>
        <Checkbox label="My Checkbox" />
        <Radio label="My Radio Button" />
        <Toggle label="My Toggle" />
      </>,
    );
    expect(container).not.toBeNull();
  });

  test(' they should render properly with props', () => {
    const { container } = render(
      <>
        <Checkbox label="My Checkbox" dimension="small" indeterminate />
        <Radio label="My Radio Button" dimension="small" />
        <Toggle label="My Toggle" dimension="small" />
      </>,
    );
    expect(container).not.toBeNull();
  });
});
