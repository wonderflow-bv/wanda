import { toTanStackColumns } from './to-tanstack-columns';
import { CustomColumnsType } from './types';

type Row = { name: string; age: number };

describe('toTanStackColumns()', () => {
  it('should map id, header and string accessor to accessorKey', () => {
    const columns: CustomColumnsType<Row> = [
      { id: 'name', Header: 'Name', accessor: 'name' },
    ];

    const [result] = toTanStackColumns(columns);

    expect(result.id).toBe('name');
    expect(result.header).toBe('Name');
    expect(result).toHaveProperty('accessorKey', 'name');
  });

  it('should fall back to accessor as id when id is not provided', () => {
    const columns: CustomColumnsType<Row> = [
      { accessor: 'age' },
    ];

    const [result] = toTanStackColumns(columns);

    expect(result.id).toBe('age');
  });

  it('should map function accessor to accessorFn', () => {
    const accessor = (row: Row) => row.age;
    const columns: CustomColumnsType<Row> = [
      { id: 'ageDoubled', accessor },
    ];

    const [result] = toTanStackColumns(columns);

    expect(result).toHaveProperty('accessorFn', accessor);
  });

  it('should support display-only columns without an accessor', () => {
    const columns: CustomColumnsType<Row> = [
      { id: 'actions', Header: 'Actions' },
    ];

    const [result] = toTanStackColumns(columns);

    expect(result.id).toBe('actions');
    expect(result).not.toHaveProperty('accessorKey');
    expect(result).not.toHaveProperty('accessorFn');
  });

  it('should enable sorting by default and disable it when disableSortBy is true', () => {
    const columns: CustomColumnsType<Row> = [
      { id: 'name', accessor: 'name' },
      { id: 'age', accessor: 'age', disableSortBy: true },
    ];

    const [sortable, notSortable] = toTanStackColumns(columns);

    expect(sortable.enableSorting).toBe(true);
    expect(notSortable.enableSorting).toBe(false);
  });

  it('should thread optional column fields through meta', () => {
    const columns: CustomColumnsType<Row> = [
      {
        id: 'name', accessor: 'name', align: 'center', isCollapsed: true, isToggable: true, minWidth: 120,
      },
    ];

    const [result] = toTanStackColumns(columns);

    expect(result.meta).toEqual({
      isCollapsed: true,
      align: 'center',
      isToggable: true,
      expander: undefined,
      minWidth: 120,
    });
  });

  it('should render function Header with the column instance', () => {
    const Header = jest.fn(() => 'Rendered Header');
    const columns: CustomColumnsType<Row> = [
      { id: 'name', accessor: 'name', Header },
    ];

    const [result] = toTanStackColumns(columns);
    const header = result.header as (ctx: unknown) => unknown;
    const fakeColumn = { id: 'name' };

    const output = header({ column: fakeColumn });

    expect(Header).toHaveBeenCalledWith({ column: fakeColumn });
    expect(output).toBe('Rendered Header');
  });

  it('should render Cell with row and value from the resolved cell context', () => {
    const Cell = jest.fn(({ value }: { value: number }) => `Age: ${value}`);
    const columns: CustomColumnsType<Row> = [
      { id: 'age', accessor: 'age', Cell },
    ];

    const [result] = toTanStackColumns(columns);
    const cell = result.cell as (ctx: unknown) => unknown;
    const fakeRow = { id: '0' };
    const fakeCtx = { row: fakeRow, getValue: () => 30 };

    const output = cell(fakeCtx);

    expect(Cell).toHaveBeenCalledWith({ row: fakeRow, value: 30 });
    expect(output).toBe('Age: 30');
  });

  it('should default cell to the raw value when Cell is not provided', () => {
    const columns: CustomColumnsType<Row> = [
      { id: 'name', accessor: 'name' },
    ];

    const [result] = toTanStackColumns(columns);
    const cell = result.cell as (ctx: unknown) => unknown;

    expect(cell({ getValue: () => 'John' })).toBe('John');
  });
});
