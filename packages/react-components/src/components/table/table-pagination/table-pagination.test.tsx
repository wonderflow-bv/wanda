import { render } from '@testing-library/react';

import { TablePagination } from './table-pagination';

describe('<TablePagination>', () => {
  test('it should render properly', () => {
    const { container } = render(
      <TablePagination
        pageSize={5}
        totalItems={10}
        totalPages={2}
        currentPage={1}
      />,
    );
    expect(container).not.toBeNull();
  });

  test('it should render properly', () => {
    const { container } = render(
      <TablePagination
        pageSize={5}
        totalItems={10}
        totalPages={2}
        currentPage={1}
        isManual
      />,
    );
    expect(container).not.toBeNull();
  });
});
