import { render } from '@testing-library/react';

import { TableRow } from './table-row';

describe('<TableRow>', () => {
  test('it should render properly', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow rowData={undefined} expandedRows={['test']} />
        </tbody>
      </table>,
    );
    expect(container).not.toBeNull();
  });
});
