
import clsx from 'clsx'
import {
  useTable, useSortBy, useRowSelect, usePagination,
  Row, useExpanded, Hooks
} from 'react-table'
import { TableRow } from './table-row'
import { TableCell } from './table-cell'
import { TableCheckbox } from './table-checkbox'
import { TableHeader, TableHeaderProps } from './table-header'
import { ToggleColumnsControl } from './table-controls'
import { AnimatePresence, motion } from 'framer-motion'
import { useUIDSeed } from 'react-uid'

import styles from './table.module.css'
import { CSSProperties, Fragment, ReactNode, useEffect, FC, useMemo } from 'react'
import { Text, Stack, IconButton, Pagination, Select } from '@/components'
import { CellType, CustomColumnsType, HeaderGroupType, OptionalDataTypes } from './types'

export type TableProps<T extends object> = PropsWithClass & {
  /**
   * Define the column headers of the table.
   */
  columns: CustomColumnsType<T>,
  /**
   * Pass the data structure to the table. Each object key can be used as `accessor` for a column.
   */
  data: Array<T & OptionalDataTypes<T>>,
  /**
   * Show pagination below the table. This is recommended only for tables with a lot of rows.
   */
  pagination?: boolean
  /**
   * The amount of entries to show for each page.
   */
  itemsPerPage?: number
  /**
   * The index of the page that should be set as active when the table is rendered.
   */
  activePageIndex?: number
  /**
   * Set clusters of items to show in a single page. These values are used to
   * compute the select options for the page size dropdown.
   */
  pageClusters?: Array<number>
  /**
   * Enable row selection. This property will render an additiona column
   * at the start of the table, containing a checkbox.
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
   * Add an accessible title to the table component
   */
  title?: TableHeaderProps['title']
  /**
   * Hide the table header which includes the title and controls.
   */
  showHeader?: boolean
  /**
   * Enable the dropdown to choose the visibility of the column
   */
  columnsControl?: boolean
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
  showSeparators = true,
  title,
  actions,
  selectedActions,
  selectedLabel = 'Selected items',
  showHeader = false,
  columnsControl = false,
  height,
  background = 'var(--global-background)',
  ExpandableRowsComponent,
  pagination,
  itemsPerPage = 20,
  activePageIndex = 0,
  pageClusters = [5, 10, 20, 30, 50, 100],
  ...otherProps
}: TableProps<T>) => {
  const uid = useUIDSeed()
  const hasSomeExpandableRows = useMemo(() => data.some(d => d.subRows), [data])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    pageCount,
    gotoPage,
    allColumns,
    prepareRow,
    selectedFlatRows,
    visibleColumns,
    setPageSize,
    state: { pageSize }
  } = useTable(
    {
      columns,
      data,
      autoResetExpanded: false,
      expandSubRows: Boolean(!ExpandableRowsComponent),
      paginateExpandedRows: !pagination,
      initialState: {
        pageIndex: activePageIndex,
        pageSize: itemsPerPage
      }
    },
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks: Hooks<T>) => {
      const checkboxColumn: CustomColumnsType<T> = [{
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => <TableCheckbox {...getToggleAllRowsSelectedProps()} />,
        Cell: ({ row }: {row: Row<T>}) => <TableCheckbox {...row.getToggleRowSelectedProps()} />,
        isCollapsed: true,
        hideFromList: true
      }]

      const expanderColumn: CustomColumnsType<T> = hasSomeExpandableRows
        ? [{
            id: 'expander',
            isCollapsed: true,
            hideFromList: true,
            expander: true,
            Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
              <IconButton
                kind="flat"
                dimension="small"
                icon={isAllRowsExpanded ? 'chevron-down' : 'chevron-right'}
                {...getToggleAllRowsExpandedProps()}
              />
            ),
            Cell: ({ row }: {row: Row<T>}) => row.canExpand
              ? (
                <IconButton
                  kind="secondary"
                  dimension="small"
                  icon={row.isExpanded ? 'chevron-down' : 'chevron-right'}
                  {...row.getToggleRowExpandedProps()}
                />
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

  const rowsToDisplay = useMemo(() => {
    return pagination ? page : rows
  }, [pagination, page, rows])

  useEffect(() => {
    allColumns.find(column => column.id === 'selection')?.toggleHidden(!selectableRows)
  }, [selectableRows, allColumns])

  useEffect(() => {
    allColumns.find(column => column.id === 'expander')?.toggleHidden(!hasSomeExpandableRows)
  }, [ExpandableRowsComponent, hasSomeExpandableRows, allColumns])

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

      {/* HEADER */}
      {(showHeader || selectableRows) && (
        <TableHeader title={title}>
          {columnsControl && <ToggleColumnsControl columns={allColumns} visibleColumns={visibleColumns} />}
          {actions}
        </TableHeader>
      )}

      {/* TABLE */}
      <div className={styles.TableWrapper}>
        <table
          className={styles.TableElement}
          data-table-stripes={stripes}
          data-table-separators={showSeparators}
          aria-labelledby={uid('table-title')}
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
            {rowsToDisplay.map((row) => {
              prepareRow(row)
              return (
                <Fragment key={row.id}>
                  <TableRow highlight={row.isSelected} {...row.getRowProps()}>
                    {row.cells.map((cell: CellType) => (
                      <TableCell
                        collapsed={cell.column.isCollapsed}
                        isExpander={cell.column.expander}
                        expanded={row.isExpanded}
                        depth={row.depth}
                        align={cell.column.align}
                        hasSubrows={!!row.subRows?.length}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </TableCell>
                    ))}
                  </TableRow>
                  {(row.subRows && row.isExpanded && ExpandableRowsComponent) && row.subRows.map((subRow) =>
                    (
                      <TableRow data-table-row-expander key={subRow.id}>
                        <TableCell padding={false} colSpan={100}>
                          <ExpandComponent {...subRow.original} />
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {pagination && (
      <Stack
        fill={false}
        direction="row"
        columnGap={16}
        verticalAlign="center"
        horizontalAlign="end"
        verticalPadding={16}
      >
        <Stack direction="row" columnGap={4}>
          <Text as="label" htmlFor={uid('table-i-per-page')} size={14}>Items per page:</Text>
          <Select
            value={pageSize}
            dimension="small"
            id={uid('table-i-per-page')}
            onChange={e => { setPageSize(Number(e.target.value)) }}
          >
            {pageClusters.map(pSize => (
              <option key={pSize} value={pSize}>{pSize}</option>
            ))}
          </Select>
        </Stack>
        <Text aria-hidden="true" weight="bold" size={14}>
          {`${parseInt(page[0].id) + 1}-${parseInt(page[page.length - 1].id) + 1} of ${rows.length}`}
        </Text>
        <Pagination
          itemsCount={page.length}
          itemsPerPage={itemsPerPage}
          pageCount={pageCount}
          onPageClick={({ selected }) => gotoPage(selected)}
          renderOnZeroPageCount={() => null}
        />
      </Stack>
      )}
    </div>
  )
}
