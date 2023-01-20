import { render } from '@testing-library/react';

import { Select } from '../select';
import { Textfield } from '../textfield';
import { InputGroup } from './input-group';

describe('<InputGroup>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <InputGroup
        label="Sample label"
        prefix={<Textfield readOnly size={6} value="https://" />}
        input={<Textfield type="text" defaultValue="sample-domain" />}
        suffix={(
          <Select defaultValue={1}>
            <option value="1">.com</option>
            <option value="2">.it</option>
            <option value="3">.org</option>
            <option value="4">.dev</option>
            <option value="5">.io</option>
          </Select>
        )}
      />,
    );
    expect(container).not.toBeNull();
  });

  test(' it should render properly', () => {
    const { container } = render(
      <InputGroup
        label="Sample label"
        dimension="small"
        prefix={<Textfield readOnly size={6} value="https://" />}
        input={<Textfield type="text" defaultValue="sample-domain" />}
        suffix={(
          <Select defaultValue={1}>
            <option value="1">.com</option>
            <option value="2">.it</option>
            <option value="3">.org</option>
            <option value="4">.dev</option>
            <option value="5">.io</option>
          </Select>
        )}
      />,
    );
    expect(container).not.toBeNull();
  });
});
