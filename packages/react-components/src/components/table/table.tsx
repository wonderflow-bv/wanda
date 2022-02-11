
import clsx from 'clsx'
import { TableCommonProps, useTable, TableOptions, Cell, Column } from 'react-table'
import { TableRow } from './table-row'
import { TableCell } from './table-cell'
import styles from './table.module.css'

type OptionalColumnTypes = {
  collapse?: boolean;
}

type OptionalCellColumnTypes = { column: OptionalColumnTypes }

export type TableProps<T extends {}> = TableCommonProps & TableOptions<T> & {
  columns: (Column<T> & OptionalColumnTypes)[]
  pagination?: boolean
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
    prepareRow
  } = useTable({
    columns,
    data
  })

  return (
    <div
      className={clsx(styles.Table, className)}
      role="table"
      {...getTableProps()}
      {...otherProps}
    >
      {/* THEAD */}
      <div role="rowgroup" className={styles.THead}>
        {headerGroups.map(headerGroup => (
          <TableRow className={styles.Row} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell role="columnheader" {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
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
              {row.cells.map((cell: Cell<T, unknown> & OptionalCellColumnTypes) => {
                return (
                  <TableCell
                    role="cell"
                    {...cell.getCellProps()}
                    style={{ background: cell.column.collapse ? 'red' : 'blue' }}
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
