import { render } from '@testing-library/react';

import { Table } from './table';

const DATA: any[] = [
  {
    id: 1,
    letter: 'A',
  },
  {
    id: 2,
    letter: 'B',
  },
  {
    id: 3,
    letter: 'C',
  },
  {
    id: 4,
    letter: 'D',
  },
  {
    id: 5,
    letter: 'E',
  },
  {
    id: 6,
    letter: 'F',
  },
];

const COLUMNS = [
  {
    id: 'id',
    Header: '#',
    accessor: (row: any) => row.id,
  },
  {
    id: 'letter',
    Header: 'Letter',
    accessor: (row: any) => row.letter,
  },
];

describe('<Table>', () => {
  test(' it should render properly', () => {
    const { container } = render(
      <>
        <Table
          title="Table"
          columns={COLUMNS}
          data={DATA}
          expandableRowComponent={subRow => (
            <div>
              {JSON.stringify(subRow, null, 2)}
            </div>
          )}
          showHeader
          showPagination
          isManualSorted
        />
        <Table title="Table" columns={COLUMNS} data={[]} />
        ,
      </>,
    );
    expect(container).not.toBeNull();
  });
});

