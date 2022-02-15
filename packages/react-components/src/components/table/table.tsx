
import clsx from 'clsx'
import {
  useTable, useSortBy, useRowSelect,
  Column, Row, CustomHeaderGroup, CustomCell
} from 'react-table'
import { TableRow } from './table-row'
import { TableCell } from './table-cell'
import { TableCheckbox } from './table-checkbox'
import { AnimatePresence, motion } from 'framer-motion'

import styles from './table.module.css'
import { useEffect } from 'react'
import { Checkbox, Stack, Dropdown, Menu, Button } from '@/components'
import { Title } from '../title'

export type OptionalColumnTypes = {
  isCollapsed?: boolean;
  align?: 'start' | 'center' | 'end';
}
export type TableProps = PropsWithClass & {
  /**
   * Define the column headers of the table.
   */
  columns: (Column<object> & OptionalColumnTypes)[],
  /**
   * Pass the data structure to the table. Each object key can be used as `accessor` for a column.
   */
  data: Array<object>,
  /**
   * Show pagination below the table. This is recommended only for tables with a lot of rows.
   */
  pagination?: boolean
  /**
   * Enable row selection
   */
  selectableRows?: boolean
  /**
   * Callback run when the selected rows change
   */
  onSelectionChange?(selectedRows?: Row[]): void
  /**
   * Add an alternate style to the table rows
   */
  stripes?: boolean
  /**
   * Enable horizontal separators between the table rows
   */
  showSeparators?: boolean
  /**
   * Show the table header title
   */
  title?: string
  /**
   * Hide the table header which includes the title and controls.
   */
  noHeader?: boolean
  /**
   * Enable the dropdown to choose the visibility of the column
   */
  hasColumnHiding?: boolean
}

export const Table = ({
  columns,
  data,
  className,
  selectableRows,
  onSelectionChange,
  stripes,
  showSeparators,
  title,
  selectedLabel = 'Selected items',
  selectedActions,
  noHeader = false,
  hasColumnHiding = false,
  ...otherProps
}: TableProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    allColumns,
    prepareRow,
    selectedFlatRows,
    visibleColumns
  } = useTable(
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
          value: 'checkbox',
          Header: ({ getToggleAllRowsSelectedProps }) => {
            return (selectableRows ? <TableCheckbox {...getToggleAllRowsSelectedProps()} /> : null)
          },
          Cell: ({ row }) => (<TableCheckbox {...row.getToggleRowSelectedProps()} />),
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
    <Stack rowGap={16} className={clsx(styles.Table, className)}>

      {!noHeader && (
        <Stack direction="row">
          {title && <Title level="5">{title}</Title>}

          {!!hasColumnHiding && (
          <Dropdown
            placement="bottom-start"
            trigger={<Button kind="secondary" dimension="small">Manage columns</Button>}
          >
            <Menu>
              {allColumns.map(column => {
                if (column.id !== 'selection') {
                  return (
                    <Menu.Item as="div" padding={false}>
                      <Stack direction="row" fill={false} verticalAlign="center" columnGap={8} horizontalAlign="space-between">
                        <Checkbox
                          className={styles.Checkbox}
                          dimension="small"
                          {...column.getToggleHiddenProps()}
                          disabled={column.getToggleHiddenProps().checked && visibleColumns.length === 1}
                        />
                        {column.render('Header')}
                      </Stack>
                    </Menu.Item>
                  )
                }
                return null
              }
              )}
            </Menu>
          </Dropdown>
          )}
        </Stack>
      )}

      {!!selectedFlatRows?.length && (
        <Stack
          as={motion.div}
          className={styles.Toast}
          direction="row"
          horizontalAlign="space-between"
          verticalAlign="center"
          horizontalPadding={16}
          verticalPadding={8}
          fill={false}
          columnGap={16}
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%', transition: { ease: 'easeOut' } }}
        >
          <Text as="span" size={14} weight="bold">{`${selectedLabel}: ${selectedFlatRows.length}`}</Text>
          {selectedActions}
        </Stack>
        )}
      </AnimatePresence>

      {(!noHeader || selectableRows) && (
        <Stack
          direction="row"
          horizontalPadding={8}
          verticalPadding={8}
          verticalAlign="center"
          className={styles.Header}
        >
          {title && <Title level="5">{title}</Title>}
        </Stack>
      )}
      <table
        className={styles.TableElement}
        data-table-stripes={stripes}
        data-table-separators={showSeparators}
        {...getTableProps()}
        {...otherProps}
      >

        {/* THEAD */}
        <thead role="rowgroup" className={styles.THead}>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: CustomHeaderGroup<OptionalColumnTypes>) => (
                <TableCell
                  as="th"
                  collapsed
                  isSorted={column.isSorted}
                  isSortedDesc={column.isSorted && column.isSortedDesc}
                  align={column.align}
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
              <TableRow highlight={row.isSelected} {...row.getRowProps()}>
                {row.cells.map((cell: CustomCell<OptionalColumnTypes>) => (
                  <TableCell
                    collapsed={cell.column.isCollapsed}
                    align={cell.column.align}
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            )
          })}
        </tbody>
      </table>
    </Stack>
  )
}
