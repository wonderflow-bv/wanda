import { render } from '@testing-library/react';

import { TableRow } from './table-row';

describe('<TableRow>', () => {
  test('it should render properly', () => {
    const { container } = render(
      <table>
        <TableRow rowData={undefined} expandedRows={['test']} />
      </table>,
    );
    expect(container).not.toBeNull();
  });
});
