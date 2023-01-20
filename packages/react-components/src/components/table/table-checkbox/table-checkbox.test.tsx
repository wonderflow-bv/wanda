import { render } from '@testing-library/react';

import { TableCheckbox } from './table-checkbox';

describe('<TableCheckbox>', () => {
  test('it should render properly', () => {
    const { container } = render(
      <TableCheckbox />,
    );
    expect(container).not.toBeNull();
  });
});
