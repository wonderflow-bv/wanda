
import clsx from 'clsx'
import { TableCommonProps, useTable, TableOptions, Column, useSortBy, useRowSelect } from 'react-table'
import { TableRow } from './table-row'
import { TableCell } from './table-cell'
import { Checkbox } from './table-checkbox'
import styles from './table.module.css'
import type { OptionalColumnTypes, CustomTableInstanceType, CustomColumnPropsType, CustomCellPropsType } from './custom-types'

export type TableProps<T extends {}> = TableCommonProps & TableOptions<T> & {
  columns: (Column<T> & OptionalColumnTypes)[]
  pagination?: boolean
  selectableRows?: boolean
}

export const Table = <T extends {}, >({
  columns,
  data,
  className,
  ...otherProps
}: TableProps<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows
  }: CustomTableInstanceType<T> = useTable({
    columns,
    data
  },
  useSortBy,
  useRowSelect,
  hooks => {
    hooks.visibleColumns.push(columns => [
      {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <TableCell role="columnheader">
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          </TableCell>
        ),
        Cell: ({ row }) => (
          <TableCell>
            <Checkbox {...row.getToggleRowSelectedProps()} />
          </TableCell>
        )
      },
      ...columns
    ])
  }
  )

  return (
    <div
      className={clsx(styles.Table, className)}
      role="table"
      {...getTableProps()}
      {...otherProps}
    >
      {!!selectedFlatRows.length && (
      <div>
        {`${selectedFlatRows.length}  items selected`}
      </div>
      )}
      {/* THEAD */}
      <div role="rowgroup" className={styles.THead}>
        {headerGroups.map(headerGroup => (
          <TableRow className={styles.Row} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: CustomColumnPropsType<T>) => (
              <TableCell
                role="columnheader"
                as="button"
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </div>

      {/* TBODY */}
      <div role="rowgroup" className={styles.TBody} {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell: CustomCellPropsType<T>) => {
                return (
                  <TableCell
                    role="cell"
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </div>
    </div>
  )
}
