
import clsx from 'clsx'
import { TableCommonProps, useTable, TableOptions, Row, Column, useSortBy, useRowSelect } from 'react-table'
import { TableRow } from './table-row'
import { TableCell } from './table-cell'
import { Checkbox } from '@/components'
import type {
  OptionalColumnTypes,
  CustomTableInstanceType, CustomColumnPropsType, CustomCellPropsType
} from './custom-types'

import styles from './table.module.css'
import { useEffect } from 'react'

export type TableProps<T extends {}> = TableCommonProps & TableOptions<T> & {
  columns: (Column<T> & OptionalColumnTypes)[]
  pagination?: boolean
  selectableRows?: boolean
  onSelectionChange?(selectedRows?: Row<T>[]): void
}

export const Table = <T extends {}, >({
  columns,
  data,
  className,
  selectableRows,
  onSelectionChange,
  ...otherProps
}: TableProps<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    allColumns,
    prepareRow,
    selectedFlatRows
  }: CustomTableInstanceType<T> = useTable(
    {
      columns,
      data
    },
    useSortBy,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }: CustomTableInstanceType<T>) => {
            return (getToggleAllRowsSelectedProps && selectableRows) && <Checkbox dimension="small" {...getToggleAllRowsSelectedProps()} />
          },
          Cell: ({ row }: any) => (<Checkbox dimension="small" {...row.getToggleRowSelectedProps()} />),
          isCollapsed: true
        },
        ...columns
      ])
    }
  )

  useEffect(() => {
    allColumns[0].toggleHidden(!selectableRows)
  }, [selectableRows, allColumns])

  useEffect(() => {
    onSelectionChange && onSelectionChange(selectedFlatRows)
  }, [onSelectionChange, selectedFlatRows])

  return (
    <div className={clsx(styles.Table, className)}>
      {!!selectedFlatRows?.length && (
        <div>
          {`${selectedFlatRows.length}  items selected`}
        </div>
      )}

      <table
        className={styles.TableElement}
        {...getTableProps()}
        {...otherProps}
      >

        {/* THEAD */}
        <thead role="rowgroup" className={styles.THead}>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: CustomColumnPropsType<T>) => (
                <TableCell
                  as="th"
                  collapsed
                  isSorted={column.isSorted}
                  isSortedDesc={column.isSorted && column.isSortedDesc}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </thead>

        {/* TBODY */}
        <tbody role="rowgroup" className={styles.TBody} {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell: CustomCellPropsType<T>) => {
                  return (
                    <TableCell
                      collapsed={cell.column.isCollapsed}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
