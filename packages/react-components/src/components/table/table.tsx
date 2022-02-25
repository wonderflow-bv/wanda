
import clsx from 'clsx'
import {
  useTable, useSortBy, useRowSelect, usePagination,
  Row, useExpanded, Hooks, IdType
} from 'react-table'
import { TableRow } from './table-row'
import { TableCell } from './table-cell'
import { TableCheckbox } from './table-checkbox'
import { TableHeader, TableHeaderProps } from './table-header'
import { ToggleColumnsControl } from './table-controls'
import { TableExpand } from './table-expand'
import { TablePagination, TablePaginationProps } from './table-pagination'
import { AnimatePresence, motion } from 'framer-motion'
import { useUIDSeed } from 'react-uid'

import styles from './table.module.css'
import { CSSProperties, Fragment, ReactNode, useEffect, useMemo, ComponentType } from 'react'
import { Text, Stack, IconButton, Skeleton } from '@/components'
import { CellType, CustomColumnInstanceType, CustomColumnsType, HeaderGroupType, OptionalDataTypes, PaginationType } from './types'

export type TableProps<T extends object> = PropsWithClass & {
  /**
   * Define the columns and headers of the table.
   */
  columns: CustomColumnsType<T>,
  /**
   * Pass the data structure to the table. Each object key can be used as `accessor` for a column.
   */
  data: Array<T & OptionalDataTypes<T>>,
  /**
   * Define the default visibility of the columns. This is an array of columns `id`,
   */
  defaultHiddenColumns? : Array<IdType<T>>,
  /**
   * Show pagination below the table. This is recommended only for tables with a lot of rows.
   */
  showPagination?: boolean
  /**
   * The amount of entries to show for each page.
   */
  itemsPerPage?: number
  /**
   * The index of the page that should be set as active when the table is rendered.
   */
  activePageIndex?: number
  /**
   * The callback that is called when the active page index and page size change.
   * Passing this property along side `showPagination` will enable manual pagination,
   * disabling the automatic one.
   */
  onDataUpdate?: ({ pageIndex, pageSize }: PaginationType) => Promise<void>
  /**
   * Set the number of pages to show in the pagination. Used only when doing manual pagination.
   */
  totalRows?: number
  /**
   * Set clusters of items to show in a single page. These values are used to
   * compute the select options for the page size dropdown.
   */
  pageClusters?: TablePaginationProps['clusters']
  /**
   * Enable row selection. This property will render an additiona column
   * at the start of the table, containing a checkbox.
   */
  selectableRows?: boolean
  /**
   * Callback run when the selected rows change
   */
  onSelectionChange?(selectedRows?: Row[], selectedRowIds?: Record<IdType<T>, boolean>): void
  /**
   * Add an alternate style to the table rows
   */
  stripes?: boolean
  /**
   * Set the loading state of the table. This will sho skeleton loaders instead of the actual data.
   */
  loading?: boolean
  /**
   * Enable horizontal separators between the table rows
   */
  showSeparators?: boolean
  /**
   * Add an accessible title to the table component
   */
  title?: TableHeaderProps['title']
  /**
   * Hide the header which includes the title and controls.
   * This option is ignored and set to `true` if `selectableRows` is set to `true`.
   */
  showHeader?: boolean
  /**
   * Hide the table header which includes columns names.
   */
  showTableHead?: boolean
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
   * Set the table height after which the table will scroll.
   */
  height?: string
  /**
   * Set the table background color. This must be set if `height` is set because
   * the color is used as background for sticky headers.
   */
  background?: string
  /**
   * A react component that add additional content when the row is expanded.
   * By passing this prop, the row will be expandable. If fuction is passed,
   * the function will be called with the `subRow` data and the function must return
   * a component.
   */
  expandableRowsComponent?: ComponentType<T>;
  /**
   * A react component that add custom actions to rows. If fuction is passed,
   * the function will be called with the row data and the function must return
   * a component.
   */
  actionsRowComponent?: ComponentType<Row<T>>;
  /**
   * Custom component/empty state to show when the table has no data or
   * all columns have been toggled off.
   */
  emptyComponent?: ReactNode;
}

export const Table = <T extends object>({
  className,
  style,
  columns,
  data = [],
  selectableRows,
  onSelectionChange,
  stripes,
  showSeparators = true,
  title,
  actions,
  selectedActions,
  selectedLabel = 'Selected items',
  showHeader = false,
  showTableHead = true,
  columnsControl = false,
  defaultHiddenColumns,
  height,
  loading,
  background,
  expandableRowsComponent: ExpandableRowsComponent,
  actionsRowComponent: ActionsRowComponent,
  emptyComponent,
  showPagination,
  onDataUpdate,
  itemsPerPage = 20,
  totalRows,
  activePageIndex = 0,
  pageClusters,
  ...otherProps
}: TableProps<T>) => {
  const uid = useUIDSeed()
  const hasSomeExpandableRows = useMemo(() => data.some(d => d.subRows), [data])
  const isManualPaginated = useMemo(() => {
    return Boolean(onDataUpdate && showPagination && totalRows)
  },
  [onDataUpdate, showPagination, totalRows])

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
    setHiddenColumns,
    state: { pageSize, pageIndex, selectedRowIds }
  } = useTable(
    {
      columns,
      data,
      expandSubRows: Boolean(!ExpandableRowsComponent),
      autoResetHiddenColumns: false,
      autoResetPage: false,
      manualPagination: isManualPaginated,
      autoResetSelectedRows: false,
      pageCount: (isManualPaginated && totalRows) ? Math.ceil(totalRows / itemsPerPage) : 10,
      // This `paginateExpandedRows` prop prevent expanded rows to be placed in the next page. But it breaks row selection
      // paginateExpandedRows: !showPagination,
      initialState: {
        pageIndex: activePageIndex,
        pageSize: showPagination ? itemsPerPage : undefined,
        hiddenColumns: ['selection', 'expander']
      }
    },
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks: Hooks<T>) => {
      const checkboxColumn: CustomColumnsType<T> = [{
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => !loading ? <TableCheckbox {...getToggleAllRowsSelectedProps()} /> : null,
        Cell: ({ row }: {row: Row<T>}) => <TableCheckbox {...row.getToggleRowSelectedProps()} />,
        isCollapsed: true,
        hideFromList: true
      }]

      const expanderColumn: CustomColumnsType<T> = [{
        id: 'expander',
        isCollapsed: true,
        hideFromList: true,
        expander: true,
        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
          !loading
            ? (
              <IconButton
                kind="flat"
                dimension="small"
                icon={isAllRowsExpanded ? 'chevron-down' : 'chevron-right'}
                {...getToggleAllRowsExpandedProps()}
              />
              )
            : null
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

      const actionsColumn: CustomColumnsType<T> = [{
        id: 'actions',
        isCollapsed: true,
        hideFromList: true,
        Cell: ({ row }: {row: Row<T>}) => ActionsRowComponent ? <ActionsRowComponent {...row} /> : null
      }]

      hooks.visibleColumns.push((columns) => [
        ...checkboxColumn,
        ...expanderColumn,
        ...actionsColumn,
        ...columns
      ])
    }
  )

  useEffect(() => {
    const artificialColumns = defaultHiddenColumns || []
    if (!selectableRows) artificialColumns.push('selection')
    if (!hasSomeExpandableRows) artificialColumns.push('expander')
    if (!ActionsRowComponent) artificialColumns.push('actions')

    setHiddenColumns(artificialColumns)
  }, [selectableRows, setHiddenColumns, defaultHiddenColumns, ExpandableRowsComponent, hasSomeExpandableRows, ActionsRowComponent])

  useEffect(() => {
    onSelectionChange && onSelectionChange(selectedFlatRows, selectedRowIds)
  }, [onSelectionChange, selectedFlatRows, selectedRowIds])

  useEffect(() => {
    onDataUpdate && onDataUpdate({ pageIndex, pageSize })
  }, [onDataUpdate, pageIndex, pageSize])

  const rowEntries = useMemo(() => showPagination ? page : rows, [page, rows, showPagination])
  const filteredVisibleColumns = useMemo(() => visibleColumns.filter((col: CustomColumnInstanceType) => !col.hideFromList), [visibleColumns])

  const dynamicStyle: CSSProperties = {
    '--table-height': height,
    '--table-background': background
  }

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
            initial={{ y: '-16px', opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 700,
                damping: 30
              }
            }}
            exit={{ y: '-16px', opacity: 0 }}
          >
            <Text as="span" size={14} weight="bold">{`${selectedLabel}: ${selectedFlatRows.length}`}</Text>
            {selectedActions}
          </Stack>
        )}
      </AnimatePresence>

      {/* HEADER */}
      {(showHeader || selectableRows) && (
        <TableHeader title={title}>
          {(columnsControl && data.length)
            ? (
              <ToggleColumnsControl
                columns={allColumns}
                visibleColumns={filteredVisibleColumns}
              />
              )
            : null}
          {actions}
        </TableHeader>
      )}

      {/* TABLE */}
      {(data.length && filteredVisibleColumns.length)
        ? (
          <div className={styles.TableWrapper} data-table-scrolling={Boolean(height)}>
            <table
              className={styles.TableElement}
              data-table-stripes={stripes}
              data-table-separators={showSeparators}
              aria-labelledby={uid('table-title')}
              {...getTableProps()}
              {...otherProps}
            >

              {/* THEAD */}
              {showTableHead && (
                <thead role="rowgroup" className={styles.THead}>
                  {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column: HeaderGroupType) => (
                        <TableCell
                          as="th"
                          width={column.minWidth === 0 ? undefined : column.minWidth}
                          collapsed={column.isCollapsed}
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
              )}

              {/* TBODY */}
              <tbody role="rowgroup" className={styles.TBody} {...getTableBodyProps()}>
                {loading
                  ? (
                    <TableRow>
                      {visibleColumns.map(() => (
                        <TableCell>
                          <Skeleton gap={16} height={16} count={5} />
                        </TableCell>
                      ))}
                    </TableRow>
                    )
                  : rowEntries.map((row) => {
                    prepareRow(row)
                    return (
                      <Fragment key={row.id}>
                        <TableRow {...row.getRowProps()}>
                          {row.cells.map((cell: CellType) => (
                            <TableCell
                              collapsed={cell.column.isCollapsed}
                              isExpander={cell.column.expander}
                              expanded={row.isExpanded}
                              depth={row.depth}
                              width={cell.column.minWidth === 0 ? undefined : cell.column.minWidth}
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
                                <TableExpand data={subRow.original} component={ExpandableRowsComponent} />
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
          )
        : (
          <Stack verticalAlign="center" horizontalAlign="center">
            {emptyComponent || 'No data'}
          </Stack>
          )
      }

      {/* PAGINATION */}
      {(showPagination && filteredVisibleColumns.length > 0 && !!rows.length) && (
        <TablePagination
          clusters={pageClusters}
          pageSize={pageSize}
          totalItems={totalRows || rows.length}
          currentPage={pageIndex}
          totalPages={pageCount}
          isManual={Boolean(isManualPaginated && totalRows)}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          onPageClick={(selected) => gotoPage(selected)}
        />
      )}
    </div>
  )
}
