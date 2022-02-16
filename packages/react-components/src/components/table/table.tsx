
import clsx from 'clsx'
import {
  useTable, useSortBy, useRowSelect, usePagination,
  Row, useExpanded, Hooks
} from 'react-table'
import { TableRow } from './table-row'
import { TableCell } from './table-cell'
import { TableCheckbox } from './table-checkbox'
import { AnimatePresence, motion } from 'framer-motion'

import styles from './table.module.css'
import { CSSProperties, Fragment, ReactNode, useEffect, FC, useMemo } from 'react'
import { Title, Text, Stack } from '@/components'
import { ToggleColumnsControl } from './table-controls'
import { CellType, CustomColumsType, HeaderGroupType } from './types'

export type TableProps<T extends object> = PropsWithClass & {
  /**
   * Define the column headers of the table.
   */
  columns: CustomColumsType<T>,
  /**
   * Pass the data structure to the table. Each object key can be used as `accessor` for a column.
   */
  data: Array<T & {subRows?: T[]}>,
  /**
   * Show pagination below the table. This is recommended only for tables with a lot of rows.
   */
  pagination?: boolean
  /**
   * The amount of rows on any given page
   */
   pageSize?: number
  /**
   * The index of the page that should be displayed
   */
   pageIndex?: number
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
  /**
   * A react component that add additional content when the row is expanded.
   * By passing this prop, the row will be expandable.
   */
   ExpandableRowsComponent?: FC<T>;
}

export const Table = <T extends object>({
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
  ExpandableRowsComponent,
  pagination,
  pageSize = 20,
  pageIndex = 0,
  ...otherProps
}: TableProps<T>) => {
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
      expandSubRows: false,
      autoResetExpanded: false
    },
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks: Hooks<T>) => {
      const hasSomeExpandableRows = data.some(d => d.subRows)

      const checkboxColumn: CustomColumsType<T> = [{
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => <TableCheckbox {...getToggleAllRowsSelectedProps()} />,
        Cell: ({ row }: {row: Row<T>}) => row.depth === 0 ? <TableCheckbox {...row.getToggleRowSelectedProps()} /> : null,
        isCollapsed: true,
        hideFromList: true
      }]

      const expanderColumn: CustomColumsType<T> = ExpandableRowsComponent && hasSomeExpandableRows
        ? [{
            id: 'expander',
            isCollapsed: true,
            hideFromList: true,
            Cell: ({ row }: {row: Row<T>}) => row.canExpand
              ? (
                <span {...row.getToggleRowExpandedProps()}>
                  {row.isExpanded ? '👇' : '👉'}
                </span>
                )
              : null
          }]
        : []

      hooks.visibleColumns.push((columns) => [
        ...checkboxColumn,
        ...expanderColumn,
        ...columns
      ])
    }
  )

  useEffect(() => {
    if (allColumns[0].id === 'selection') {
      allColumns[0].toggleHidden(!selectableRows)
    }
  }, [selectableRows, allColumns])

  useEffect(() => {
    onSelectionChange && onSelectionChange(selectedFlatRows)
  }, [onSelectionChange, selectedFlatRows])

  const dynamicStyle: CSSProperties = {
    '--table-height': height,
    '--table-background': background
  }

  const ExpandComponent = useMemo(() => (data: T) => (
    <div className={styles.ExpandWrapper}>
      <div className={styles.ExpandContent}>
        {ExpandableRowsComponent ? <ExpandableRowsComponent {...data} /> : null}
      </div>
    </div>
  ), [ExpandableRowsComponent])

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
        <div>
          {title && <Title level="5">{title}</Title>}
        </div>

        <Stack direction="row" verticalAlign="center" columnGap={8} inline>
          {hideColumnsControl && <ToggleColumnsControl columns={allColumns} visibleColumns={visibleColumns} />}

          {actions}
        </Stack>
      </Stack>
      )}

      {/* CONTEXT TOAST */}
      <AnimatePresence>
        {selectedFlatRows?.length && (
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
              {headerGroup.headers.map((column: HeaderGroupType) => (
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
                  <TableRow data-table-row-expander>
                    {row.subRows.map((subRow) => (
                      <TableCell style={{ padding: 0 }} colSpan={100} key={subRow.id}>
                        <ExpandComponent {...subRow.original} />
                      </TableCell>
                    ))}
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
