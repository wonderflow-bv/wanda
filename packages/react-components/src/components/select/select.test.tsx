import { render } from '@testing-library/react';

import { Select } from './select';

describe('<Select>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <Select defaultValue="placeholder" label="My Label">
        <option value="placeholder" hidden disabled>Pick an option</option>
        <optgroup label="Option Group One">
          <option value="1">This is a very long option selected</option>
          <option value="2">Option 2</option>
        </optgroup>
        <optgroup label="Option Group Two">
          <option value="3">Option 1</option>
          <option value="4">Option 2</option>
          <option value="5">Option 3</option>
        </optgroup>
      </Select>,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly with props', () => {
    const { container } = render(
      <Select defaultValue="placeholder" label="My Label" dimension="small" disabled>
        <option value="placeholder" hidden disabled>Pick an option</option>
        <optgroup label="Option Group One">
          <option value="1">This is a very long option selected</option>
          <option value="2">Option 2</option>
        </optgroup>
        <optgroup label="Option Group Two">
          <option value="3">Option 1</option>
          <option value="4">Option 2</option>
          <option value="5">Option 3</option>
        </optgroup>
      </Select>,
    );
    expect(container).not.toBeNull();
  });
});
