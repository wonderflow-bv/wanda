
import clsx from 'clsx'
import {
  useTable, useSortBy, useRowSelect,
  Column, Row, CustomHeaderGroup, CustomCell, useExpanded
} from 'react-table'
import { TableRow } from './table-row'
import { TableCell } from './table-cell'
import { TableCheckbox } from './table-checkbox'
import { AnimatePresence, motion } from 'framer-motion'

import styles from './table.module.css'
import { CSSProperties, Fragment, ReactNode, useEffect } from 'react'
import { Title, Text, Stack } from '@/components'
import { ToggleColumnsControl } from './table-controls'

export type OptionalColumnTypes = {
  isCollapsed?: boolean;
  align?: 'start' | 'center' | 'end';
  hideFromList?: boolean;
}

export type ColumnType = CustomHeaderGroup<OptionalColumnTypes>
export type CellType = CustomCell<OptionalColumnTypes>

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
  hideColumnsControl?: boolean
  /**
  * Pass custom actions to the table header
  */
  actions?: ReactNode
  /**
   * Set the label for selected items in the table. Default to "Selected items"
   */
  selectedLabel?: string
  /**
  * Pass custom components to show when rows are selected.
  */
  selectedActions?: ReactNode
  /**
  * Set the table height (including header) after which the table will scroll.
  */
  height?: string
  /**
   * Set the table background color. This must be set if `height` is set because
   * the color is used as background for sticky headers.
   */
  background?: string
}

export const Table = ({
  className,
  style,
  columns,
  data,
  selectableRows,
  onSelectionChange,
  stripes,
  showSeparators,
  title,
  actions,
  selectedActions,
  selectedLabel = 'Selected items',
  noHeader = false,
  hideColumnsControl = false,
  height,
  background = 'var(--global-background)',
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
      data,
      expandSubRows: false
    },
    useSortBy,
    useExpanded,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          value: 'checkbox',
          Header: ({ getToggleAllRowsSelectedProps }) => {
            return (selectableRows ? <TableCheckbox {...getToggleAllRowsSelectedProps()} /> : null)
          },
          Cell: ({ row }) => row.depth === 0 && (<TableCheckbox {...row.getToggleRowSelectedProps()} />),
          isCollapsed: true
        },
        {
          id: 'expander',
          isCollapsed: true,
          Cell: ({ row }) =>
            row.canExpand
              ? (
                <span {...row.getToggleRowExpandedProps()}>
                  {row.isExpanded ? '👇' : '👉'}
                </span>
                )
              : null
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

  const dynamicStyle: CSSProperties = {
    '--table-height': height,
    '--table-background': background
  }

  return (
    <div
      className={clsx(styles.Table, className)}
      style={{ ...dynamicStyle, ...style }}
    >

      {/* HEADER */}
      {(!noHeader || selectableRows) && (
      <Stack
        direction="row"
        horizontalPadding={8}
        columnGap={16}
        verticalAlign="center"
        horizontalAlign="space-between"
        fill={false}
        className={styles.Header}
      >
        {title && <Title level="5">{title}</Title>}

        <Stack direction="row" verticalAlign="center" columnGap={8} inline>
          {hideColumnsControl && <ToggleColumnsControl columns={allColumns} visibleColumns={visibleColumns} />}

          {actions}
        </Stack>
      </Stack>
      )}

      {/* CONTEXT TOAST */}
      <AnimatePresence>
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

      {/* TABLE */}
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
              {headerGroup.headers.map((column: ColumnType) => (
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
              <Fragment key={row.id}>
                <TableRow highlight={row.isSelected && row.depth === 0} {...row.getRowProps()}>
                  {row.cells.map((cell: CellType) => (
                    <TableCell
                      collapsed={cell.column.isCollapsed}
                      align={cell.column.align}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
                {(row.subRows && row.isExpanded) && (
                  <TableRow>
                    {row.subRows.map((subRow) => {
                      prepareRow(subRow)
                      return (
                        <TableCell colSpan={100}>
                          {subRow.cells.map((cell: CellType) => cell.render('Cell'))}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
