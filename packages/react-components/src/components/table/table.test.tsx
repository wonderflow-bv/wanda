import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

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

  describe('row selection', () => {
    test('checking a row and the "select all" checkbox notify onSelectedRowsChange', () => {
      const onSelectedRowsChange = jest.fn();
      render(
        <Table
          columns={COLUMNS}
          data={DATA}
          selectableRows
          onSelectedRowsChange={onSelectedRowsChange}
        />,
      );

      // index 0 is the header "select all" checkbox, followed by one per row
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(DATA.length + 1);

      fireEvent.click(checkboxes[1]);
      expect(onSelectedRowsChange).toHaveBeenLastCalledWith(expect.arrayContaining([expect.any(String)]));
      expect(onSelectedRowsChange.mock.calls.at(-1)?.[0]).toHaveLength(1);

      fireEvent.click(checkboxes[0]);
      expect(onSelectedRowsChange.mock.calls.at(-1)?.[0]).toHaveLength(DATA.length);
    });

    test('a data change clears the selection by default, but not with persistSelectionAcrossPages', () => {
      const defaultRun = render(
        <Table columns={COLUMNS} data={DATA} selectableRows selectedRowIds={['1']} />,
      );
      expect(screen.getAllByRole('checkbox')[2]).toBeChecked();
      defaultRun.rerender(
        <Table columns={COLUMNS} data={[...DATA]} selectableRows selectedRowIds={['1']} />,
      );
      expect(screen.getAllByRole('checkbox')[2]).not.toBeChecked();
      defaultRun.unmount();

      const persistedRun = render(
        <Table columns={COLUMNS} data={DATA} selectableRows persistSelectionAcrossPages selectedRowIds={['1']} />,
      );
      expect(screen.getAllByRole('checkbox')[2]).toBeChecked();
      persistedRun.rerender(
        <Table columns={COLUMNS} data={[...DATA]} selectableRows persistSelectionAcrossPages selectedRowIds={['1']} />,
      );
      expect(screen.getAllByRole('checkbox')[2]).toBeChecked();
    });
  });

  describe('sorting', () => {
    test('clicking a sortable column header notifies onSortChange', () => {
      const onSortChange = jest.fn();
      render(<Table columns={COLUMNS} data={DATA} onSortChange={onSortChange} />);

      fireEvent.click(screen.getByText('Letter'));

      expect(onSortChange).toHaveBeenCalledWith([{ id: 'letter', desc: false }]);
    });
  });

  describe('column visibility', () => {
    test('hiding a column removes its header and cells from the rendered rows, not just the header', () => {
      const { rerender } = render(
        <Table title="Table" columns={COLUMNS} data={DATA} />,
      );

      expect(screen.getByText('Letter')).toBeInTheDocument();
      expect(screen.getByText('A')).toBeInTheDocument();

      rerender(
        <Table title="Table" columns={COLUMNS} data={DATA} defaultHiddenColumns={['letter']} />,
      );

      expect(screen.queryByText('Letter')).not.toBeInTheDocument();
      expect(screen.queryByText('A')).not.toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();

      rerender(
        <Table title="Table" columns={COLUMNS} data={DATA} />,
      );

      expect(screen.getByText('Letter')).toBeInTheDocument();
      expect(screen.getByText('A')).toBeInTheDocument();
    });
  });

  describe('expandable rows', () => {
    test('toggling an expandable row renders the custom expand content', () => {
      const dataWithSubRows: any[] = [
        { id: 1, letter: 'A', subRows: [{ id: '1.1', letter: 'A.1' }] },
      ];

      render(
        <Table
          columns={COLUMNS}
          data={dataWithSubRows}
          expandableRowComponent={subRow => <div>{subRow.letter}</div>}
        />,
      );

      expect(screen.queryByText('A.1')).not.toBeInTheDocument();
      fireEvent.click(screen.getByTestId('ToggleButton'));
      expect(screen.getByText('A.1')).toBeInTheDocument();
    });
  });

  describe('pagination', () => {
    test('showPagination paginates client-side using itemsPerPage and initialPageIndex', () => {
      render(
        <Table
          columns={COLUMNS}
          data={DATA}
          showPagination
          itemsPerPage={2}
          initialPageIndex={1}
        />,
      );

      // page index 1 with 2 items per page shows rows 3 and 4 (C, D)
      expect(screen.getByText('C')).toBeInTheDocument();
      expect(screen.getByText('D')).toBeInTheDocument();
      expect(screen.queryByText('A')).not.toBeInTheDocument();
      expect(screen.queryByText('E')).not.toBeInTheDocument();
    });

    test('manual pagination defers to onPaginationChange instead of paginating client-side', () => {
      const onPaginationChange = jest.fn();
      render(
        <Table
          columns={COLUMNS}
          data={DATA.slice(0, 2)}
          showPagination
          itemsPerPage={2}
          totalRows={DATA.length}
          onPaginationChange={onPaginationChange}
        />,
      );

      // manual pagination: only the rows explicitly passed in `data` are rendered
      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('B')).toBeInTheDocument();
      expect(screen.queryByText('C')).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId('RightChevron'));
      expect(onPaginationChange).toHaveBeenLastCalledWith({ pageIndex: 1, pageSize: 2 });
    });
  });

  describe('showTableHead', () => {
    test('showTableHead={false} hides column headers but still renders cell data', () => {
      render(<Table columns={COLUMNS} data={DATA} showTableHead={false} />);

      expect(screen.queryByText('Letter')).not.toBeInTheDocument();
      expect(screen.getByText('A')).toBeInTheDocument();
    });
  });

  describe('emptyComponent', () => {
    test('renders the custom empty component when there is no data', () => {
      render(
        <Table columns={COLUMNS} data={[]} emptyComponent={<div>Nothing here</div>} />,
      );

      expect(screen.getByText('Nothing here')).toBeInTheDocument();
    });

    test('falls back to the default "No data" message', () => {
      render(<Table columns={COLUMNS} data={[]} />);

      expect(screen.getByText('No data')).toBeInTheDocument();
    });
  });

  describe('manual sorting', () => {
    test('isManualSorted still notifies onSortChange but leaves row order untouched', () => {
      const onSortChange = jest.fn();
      render(
        <Table columns={COLUMNS} data={DATA} isManualSorted onSortChange={onSortChange} />,
      );

      fireEvent.click(screen.getByText('Letter'));
      expect(onSortChange).toHaveBeenCalledWith([{ id: 'letter', desc: false }]);

      // row order in the DOM is unchanged since sorting is delegated to the consumer
      const cells = screen.getAllByText(/^[A-F]$/);
      expect(cells.map(cell => cell.textContent)).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
    });
  });

  describe('initialSortBy', () => {
    test('applies the initial sort order on mount', () => {
      render(
        <Table columns={COLUMNS} data={DATA} initialSortBy={[{ id: 'letter', desc: true }]} />,
      );

      const cells = screen.getAllByText(/^[A-F]$/);
      expect(cells[0]).toHaveTextContent('F');
    });
  });

  describe('selectSubRows', () => {
    test('selecting a parent row selects its sub rows by default', () => {
      const onSelectedRowsChange = jest.fn();
      const dataWithSubRows: any[] = [
        {
          _id: '1', id: 1, letter: 'A', subRows: [{ _id: '1.1', id: '1.1', letter: 'A.1' }],
        },
      ];

      render(
        <Table
          columns={COLUMNS}
          data={dataWithSubRows}
          selectableRows
          onSelectedRowsChange={onSelectedRowsChange}
        />,
      );

      fireEvent.click(screen.getByTestId('ToggleButton'));
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]);

      expect(onSelectedRowsChange.mock.calls.at(-1)?.[0]).toEqual(expect.arrayContaining(['1', '1.1']));
    });

    test('selectSubRows={false} keeps parent and sub row selection independent', () => {
      const onSelectedRowsChange = jest.fn();
      const dataWithSubRows: any[] = [
        {
          _id: '1', id: 1, letter: 'A', subRows: [{ _id: '1.1', id: '1.1', letter: 'A.1' }],
        },
      ];

      render(
        <Table
          columns={COLUMNS}
          data={dataWithSubRows}
          selectableRows
          selectSubRows={false}
          onSelectedRowsChange={onSelectedRowsChange}
        />,
      );

      fireEvent.click(screen.getByTestId('ToggleButton'));
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]);

      expect(onSelectedRowsChange.mock.calls.at(-1)?.[0]).toEqual(['1']);
    });
  });

  describe('stripes and showSeparators', () => {
    test('reflect as data attributes on the table element', () => {
      const { container, rerender } = render(
        <Table columns={COLUMNS} data={DATA} stripes showSeparators={false} />,
      );

      const tableEl = container.querySelector('table');
      expect(tableEl).toHaveAttribute('data-table-stripes', 'true');
      expect(tableEl).toHaveAttribute('data-table-separators', 'false');

      rerender(<Table columns={COLUMNS} data={DATA} stripes={false} showSeparators />);
      expect(tableEl).toHaveAttribute('data-table-stripes', 'false');
      expect(tableEl).toHaveAttribute('data-table-separators', 'true');
    });
  });

  describe('loading', () => {
    test('shows skeleton rows instead of data while loading', () => {
      const { container } = render(<Table columns={COLUMNS} data={DATA} loading />);

      expect(screen.queryByText('A')).not.toBeInTheDocument();
      expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument();
    });
  });

  describe('header', () => {
    test('title and actions render inside the header when showHeader is true', () => {
      render(
        <Table
          columns={COLUMNS}
          data={DATA}
          showHeader
          title="My table"
          actions={<button type="button">Custom action</button>}
        />,
      );

      expect(screen.getByText('My table')).toBeInTheDocument();
      expect(screen.getByText('Custom action')).toBeInTheDocument();
    });

    test('title is not rendered when showHeader is false', () => {
      render(<Table columns={COLUMNS} data={DATA} title="Hidden title" />);

      expect(screen.queryByText('Hidden title')).not.toBeInTheDocument();
    });
  });

  describe('selection labels and actions', () => {
    test('selectedLabel and selectedActions render once a row is selected', () => {
      render(
        <Table
          columns={COLUMNS}
          data={DATA}
          selectableRows
          selectedLabel={ids => `Picked: ${ids.length}`}
          selectedActions={() => <button type="button">Bulk delete</button>}
        />,
      );

      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]);

      expect(screen.getByText('Picked: 1')).toBeInTheDocument();
      expect(screen.getByText('Bulk delete')).toBeInTheDocument();
    });

    test('defaults to "Selected items: N" when selectedLabel is not provided', () => {
      render(<Table columns={COLUMNS} data={DATA} selectableRows />);

      fireEvent.click(screen.getAllByRole('checkbox')[1]);

      expect(screen.getByText('Selected items: 1')).toBeInTheDocument();
    });
  });

  describe('height and background', () => {
    test('set the scrolling wrapper and CSS custom properties', () => {
      const { container } = render(
        <Table columns={COLUMNS} data={DATA} height="400px" background="white" />,
      );

      const wrapper = container.querySelector('[data-table-scrolling]');
      expect(wrapper).toHaveAttribute('data-table-scrolling', 'true');
      expect(wrapper?.parentElement).toHaveStyle({
        '--table-height': '400px',
        '--table-background': 'white',
      });
    });
  });
});

