import { render } from '@testing-library/react';

import { TableCell } from './table-cell';

describe('<TableCell>', () => {
  test('it should render properly', () => {
    const { container } = render(
      <TableCell />,
    );
    expect(container).not.toBeNull();
  });

  test('it should render properly with props', () => {
    const { container } = render(
      <>
        <TableCell width="100" isSorted />
        <TableCell width={100} isSorted isSortedDesc />
      </>,
    );
    expect(container).not.toBeNull();
  });
});
