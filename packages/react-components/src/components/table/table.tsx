/*
 * Copyright 2022-2026 Wonderflow Design Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  ColumnDef,
  createColumnHelper,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useUpdateEffect } from 'ahooks';
import clsx from 'clsx';
import {
  AnimatePresence, domAnimation, LazyMotion, m,
} from 'framer-motion';
import {
  ComponentType, CSSProperties, memo, ReactNode, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useUIDSeed } from 'react-uid';

import {
  Skeleton, Stack, Text,
  ToggleButton,
} from '@/components';

import * as styles from './table.module.css';
import { MemoTableCell, TableCell } from './table-cell';
import { TableCheckbox } from './table-checkbox';
import { ToggleColumnsControl } from './table-controls';
import { TableExpand } from './table-expand';
import { TableHeader, TableHeaderProps } from './table-header';
import { TablePagination, TablePaginationProps } from './table-pagination';
import { MemoTableRow, TableRow } from './table-row';
import { toTanStackColumns } from './to-tanstack-columns';
import {
  CustomColumnsType, CustomSortingRule, IdType, OptionalDataTypes, PaginationPageType,
} from './types';

export type TableProps<T extends Record<string, unknown>> = PropsWithClass & {
  /**
   * Define the columns and headers of the table.
   */
  columns: CustomColumnsType<T>;
  /**
   * Pass the data structure to the table. Each object key can be used as `accessor` for a column.
   */
  data: Array<T & OptionalDataTypes<T>>;
  /**
   * Define the default visibility of the columns. This is an array of columns `id`,
   */
  defaultHiddenColumns?: Array<IdType<T>>;
  /**
   * Enable row selection. This property will render an additiona column
   * at the start of the table, containing a checkbox.
   */
  selectableRows?: boolean;
  /**
   * The ids of the rows which are selected
   */
  selectedRowIds?: Array<IdType<T>>;
  /**
   * A function to trigger every time a row changes its selection status
   */
  onSelectedRowsChange?: (selectedRowIds: Array<IdType<T>>) => void;
  /**
   * When `true`, `Table` stops clearing `selectedRowIds` whenever `data`
   * changes (e.g. navigating to a different server-fetched page). This lets
   * a consumer-owned superset selection list persist across pages.
   *
   * This only concerns *persisting* previously-known selected ids: the
   * header "select all" checkbox always stays scoped to the currently
   * loaded rows. See `packages/TABLE_CROSS_PAGE_SELECTION.md` for the
   * consumer-side requirements before enabling this.
   *
   * Defaults to `false`, matching `Table`'s historical behavior of
   * resetting selection whenever `data` changes.
   */
  persistSelectionAcrossPages?: boolean;
  /**
   * Add an alternate style to the table rows
   */
  stripes?: boolean;
  /**
   * Set the loading state of the table. This will sho skeleton loaders instead of the actual data.
   */
  loading?: boolean;
  /**
   * Enable horizontal separators between the table rows
   */
  showSeparators?: boolean;
  /**
   * Add an accessible title to the table component
   */
  title?: TableHeaderProps['title'];
  /**
   * Hide the header which includes the title and controls.
   * This option is ignored and set to `true` if `selectableRows` is set to `true`.
   */
  showHeader?: boolean;
  /**
   * Hide the table header which includes columns names.
   */
  showTableHead?: boolean;
  /**
   * Enable the dropdown to choose the visibility of the column
   */
  columnsControl?: boolean;
  /**
   * Pass custom actions to the table header
   */
  actions?: ReactNode;
  /**
   * Set the label for selected items in the table. Default to "Selected items"
   */
  selectedLabel?: (selectedRowIds: Array<IdType<T>>) => ReactNode;
  /**
   * Pass custom components to show when rows are selected.
   */
  selectedActions?: (selectedRowIds: Array<IdType<T>>) => ReactNode;
  /**
   * Set the table height after which the table will scroll.
   */
  height?: string;
  /**
   * Set the table background color. This must be set if `height` is set because
   * the color is used as background for sticky headers.
   */
  background?: string;
  /**
   * A react component that add additional content when the row is expanded.
   * By passing this prop, the row will be expandable. If fuction is passed,
   * the function will be called with the `subRow` data and the function must return
   * a component.
   */
  expandableRowComponent?: ComponentType<T>;
  /**
   * Custom component/empty state to show when the table has no data or
   * all columns have been toggled off.
   */
  emptyComponent?: ReactNode;
  /**
   * Enable or disable the sub rows selection when the parent row is selected.
   */
  selectSubRows?: boolean;
  /**
   * Show pagination below the table. This is recommended only for tables with a lot of rows.
   */
  showPagination?: boolean;
  /**
   * The index of the page that should be set as active when the table is rendered.
   */
  initialPageIndex?: number;
  /**
    * The amount of entries to show for each page.
    */
  itemsPerPage?: number;
  /**
    * Set the number of pages to show in the pagination. Used only when doing manual pagination.
    */
  totalRows?: number;
  /**
    * Set clusters of items to show in a single page. These values are used to
    * compute the select options for the page size select.
    */
  pageClusters?: TablePaginationProps['clusters'];
  /**
    * The callback that is called when the active page index and page size change.
    * Passing this property will enable manual pagination,
    * disabling the automatic one.
    */
  onPaginationChange?: ({ pageIndex, pageSize }: PaginationPageType) => Promise<void> | void;
  /**
   * If true, disable the automatic column sorting of the table. Turn this on if you want to
   * to control the sorting yourself.
   */
  isManualSorted?: boolean;
  /**
   * Set the initial sorted column and order by passing column id and order.
   */
  initialSortBy?: Array<CustomSortingRule<T>>;
  /**
    * Callback run when a column is sorted
    */
  onSortChange?: (sorting: Array<CustomSortingRule<T>>) => void;
  /**
   * Callback run on row expansion. Returns the expanded row data.
   */
  onRowExpandChange?: (row: Row<T>) => void;
}

type TableBodyRowProps<T extends Record<string, unknown>> = {
  row: Row<T>;
  expandedRowsKey?: string;
  expandableRowComponent?: ComponentType<T>;
  /**
   * `true` when this row (or one of its sub rows) is currently selected.
   * Passed down explicitly (rather than reading `row.getIsSelected()`
   * directly inside the memo comparator) so the comparator can cheaply
   * detect real selection changes without depending on `row` identity.
   */
  isRowSelected: boolean;
  isRowExpanded: boolean;
  /**
   * Stable signature (joined ids of `table.getVisibleLeafColumns()`) computed
   * by the parent `Table`. Column visibility toggles don't change `row.id`,
   * `row.original`, selection or expansion state, so without this the memo
   * comparator below would bail out of re-rendering every row and
   * `row.getVisibleCells()` would keep returning the previously visible
   * columns even after the header updates.
   */
  columnVisibilityKey: string;
};

/**
 * Owns `row.getVisibleCells().map(cell => flexRender(...))` for a single
 * row. This work must happen *inside* the memo boundary: doing it in the
 * parent's `.map()` (as before) means the ~10 cell renders for every one of
 * the 500 rows still run on every selection change even though the
 * resulting `<MemoTableRow>` bails out of its own re-render — `React.memo`
 * only skips the child's render, it can't stop the parent from doing the
 * work to build that child's props/children in the first place.
 *
 * Wrapping this component itself in `memo` (with a comparator based on
 * `isRowSelected`/`isRowExpanded`, not `row` identity, since v8 hands out a
 * new `row`/cell objects on most re-renders too) means unaffected rows skip
 * `flexRender` entirely, not just the DOM diff.
 */
const TableBodyRowComponent = <T extends Record<string, unknown>>({
  row,
  expandedRowsKey,
  expandableRowComponent,
  isRowSelected: _isRowSelected,
  isRowExpanded: _isRowExpanded,
  columnVisibilityKey: _columnVisibilityKey,
}: TableBodyRowProps<T>) => {
  const canRenderSubRows = row.subRows.length > 0 && row.getIsExpanded() && expandableRowComponent;

  return (
    <>
      <MemoTableRow
        expanded={
          row.getIsExpanded() && !row.subRows.some(subRow => subRow.getIsExpanded() && subRow.getCanExpand())
        }
        rowData={row}
        expandedRowsKey={expandedRowsKey}
        rowSignature={`${row.id}:${row.getIsSelected() ? 1 : 0}:${row.getIsExpanded() ? 1 : 0}:${_columnVisibilityKey}`}
      >
        {row.getVisibleCells().map(cell => (
          <MemoTableCell
            key={cell.id}
            collapsed={cell.column.columnDef.meta?.isCollapsed}
            width={
              cell.column.columnDef.meta?.minWidth === 0
                ? undefined
                : cell.column.columnDef.meta?.minWidth
            }
            align={cell.column.columnDef.meta?.align}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </MemoTableCell>
        ))}
      </MemoTableRow>
      {canRenderSubRows && row.subRows.map(subRow => (
        <MemoTableRow data-table-row-expander key={subRow.id}>
          <MemoTableCell padding={false} colSpan={100}>
            <TableExpand data={subRow.original} component={expandableRowComponent} />
          </MemoTableCell>
        </MemoTableRow>
      ))}
    </>
  );
};

const areTableBodyRowPropsEqual = <T extends Record<string, unknown>>(
  prevProps: TableBodyRowProps<T>,
  nextProps: TableBodyRowProps<T>,
) => (
    prevProps.row.id === nextProps.row.id
    && prevProps.row.original === nextProps.row.original
    && prevProps.isRowSelected === nextProps.isRowSelected
    && prevProps.isRowExpanded === nextProps.isRowExpanded
    && prevProps.expandedRowsKey === nextProps.expandedRowsKey
    && prevProps.expandableRowComponent === nextProps.expandableRowComponent
    && prevProps.columnVisibilityKey === nextProps.columnVisibilityKey
  );

const TableBodyRow = memo(
  TableBodyRowComponent,
  areTableBodyRowPropsEqual,
) as typeof TableBodyRowComponent;

const arrayToRowSelection = <T extends Record<string, unknown>>(
  ids: Array<IdType<T>>,
): RowSelectionState => ids.reduce<RowSelectionState>((acc, id) => ({ ...acc, [id]: true }), {});

export const Table = <T extends Record<string, unknown>>({
  className,
  style,
  columns,
  data = [],
  selectableRows,
  selectedRowIds = [],
  onSelectedRowsChange,
  persistSelectionAcrossPages = false,
  stripes,
  showSeparators = true,
  title,
  actions,
  selectedActions,
  selectedLabel = selectedRowIds => `Selected items: ${selectedRowIds.length}`,
  showHeader = false,
  showTableHead = true,
  columnsControl = false,
  defaultHiddenColumns,
  height,
  loading,
  background,
  expandableRowComponent,
  emptyComponent,
  showPagination,
  isManualSorted,
  itemsPerPage = 10,
  totalRows,
  initialPageIndex = 0,
  onPaginationChange,
  onSortChange,
  pageClusters,
  initialSortBy = [],
  onRowExpandChange,
  selectSubRows = true,
  ...otherProps
}: TableProps<T>) => {
  const uid = useUIDSeed();
  const columnHelper = useMemo(() => createColumnHelper<T>(), []);
  const hasSomeExpandableRows = useMemo(() => data.some(d => d.subRows), [data]);

  const isManualPaginated = useMemo(
    () => Boolean(showPagination && onPaginationChange && totalRows),
    [showPagination, totalRows, onPaginationChange],
  );

  const getHiddenColumns = useCallback(() => {
    const hiddenColumns = defaultHiddenColumns ? [...defaultHiddenColumns] : [];
    if (!selectableRows) hiddenColumns.push('selection');
    if (!hasSomeExpandableRows) hiddenColumns.push('expander');

    return hiddenColumns;
  }, [defaultHiddenColumns, selectableRows, hasSomeExpandableRows]);

  const getRowId = useCallback((
    originalRow: T & OptionalDataTypes<T>,
    relativeIndex: number,
    parent?: Row<T>,
  ) => (originalRow as { _id?: string })?._id || (parent && [parent.id, relativeIndex].join('.')) || relativeIndex.toString(),
  []);

  const [sorting, setSorting] = useState<SortingState>(() => initialSortBy as unknown as SortingState);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialPageIndex,
    pageSize: itemsPerPage,
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    () => getHiddenColumns().reduce<VisibilityState>((acc, id) => ({ ...acc, [id]: false }), {}),
  );
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    () => arrayToRowSelection(selectedRowIds),
  );

  const manualPaginationPageCount = useMemo(
    () => ((isManualPaginated && totalRows) ? Math.ceil(totalRows / pagination.pageSize) : -1),
    [isManualPaginated, totalRows, pagination.pageSize],
  );

  const convertedColumns = useMemo(() => toTanStackColumns(columns), [columns]);

  const tableColumns = useMemo<Array<ColumnDef<T>>>(() => {
    const selectionColumn = columnHelper.display({
      id: 'selection',
      meta: { isCollapsed: true, isToggable: true },
      header: ({ table }) => (
        <TableCheckbox
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={!table.getIsAllPageRowsSelected() && table.getIsSomePageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <TableCheckbox
          checked={row.getIsSelected()}
          indeterminate={row.getIsSomeSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    });

    const expanderColumn = columnHelper.display({
      id: 'expander',
      meta: {
        isToggable: true, expander: true, minWidth: 40, align: 'center',
      },
      cell: ({ row }) => (row.getCanExpand()
        ? (
          <ToggleButton
            kind="flat"
            dimension="small"
            restingIcon="chevron-right"
            pressedIcon="chevron-down"
            pressed={row.getIsExpanded()}
            onClick={() => {
              row.subRows
                .filter(subRow => subRow.getIsExpanded())
                .forEach(subRow => subRow.toggleExpanded(false));
              row.toggleExpanded();

              onRowExpandChange?.(row);
            }}
          />
        )
        : null),
    });

    return [selectionColumn, expanderColumn, ...convertedColumns];
  }, [columnHelper, convertedColumns, onRowExpandChange]);

  const table = useReactTable<T>({
    data,
    columns: tableColumns,
    getRowId,
    getSubRows: row => (row as OptionalDataTypes<T>).subRows,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    /**
     * When `expandableRowComponent` is set, `Table` renders sub rows itself
     * (via the dedicated `TableExpand` block below, fed from the
     * pre-expansion row model) instead of letting them flatten into the
     * table's own row list. Only include `getExpandedRowModel` — the thing
     * that makes expanded sub rows flatten into `table.getRowModel().rows`
     * through the *same* columns — when there's no custom renderer.
     */
    ...(expandableRowComponent ? {} : { getExpandedRowModel: getExpandedRowModel() }),
    ...(showPagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),
    manualPagination: isManualPaginated,
    pageCount: isManualPaginated ? manualPaginationPageCount : undefined,
    manualSorting: isManualSorted,
    enableMultiSort: false,
    enableSubRowSelection: selectSubRows,
    autoResetPageIndex: false,
    /**
     * Deliberately left at its default (unset): forcing
     * `paginateExpandedRows: false` prevents expanded rows from spilling
     * into the next page, but it also breaks row selection. Do not
     * re-introduce that regression.
     */
    state: {
      sorting, expanded, pagination, columnVisibility, rowSelection,
    },
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

  useUpdateEffect(() => {
    setColumnVisibility(getHiddenColumns().reduce<VisibilityState>((acc, id) => ({ ...acc, [id]: false }), {}));
  }, [getHiddenColumns]);

  const selectedRowIdsKey = useMemo(
    () => [...selectedRowIds].sort((a, b) => (a < b ? -1 : Number(a > b))).join('\u0000'),
    [selectedRowIds],
  );

  /**
   * Honors external changes to `selectedRowIds` made *after* mount (e.g. a
   * "Clear selection" button), independently of `persistSelectionAcrossPages`.
   * `react-table` v7 only ever seeded `selectedRowIds` into `initialState`,
   * silently ignoring later prop updates — this fixes that in both modes.
   */
  useUpdateEffect(() => {
    setRowSelection(arrayToRowSelection(selectedRowIds));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRowIdsKey]);

  /**
   * Default behavior: clear selection whenever `data` changes (matching
   * `Table`'s historical behavior). Opting into `persistSelectionAcrossPages`
   * skips this, so a consumer-owned superset selection list survives page
   * navigations for manual/server pagination.
   */
  useUpdateEffect(() => {
    if (persistSelectionAcrossPages) return;
    setRowSelection({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useUpdateEffect(() => {
    onSelectedRowsChange?.(Object.keys(rowSelection) as Array<IdType<T>>);
  }, [rowSelection, onSelectedRowsChange]);

  useUpdateEffect(() => {
    onSortChange?.(sorting as unknown as Array<CustomSortingRule<T>>);
  }, [sorting, onSortChange]);

  useUpdateEffect(() => {
    void onPaginationChange?.({ pageIndex: pagination.pageIndex, pageSize: pagination.pageSize });
  }, [onPaginationChange, pagination.pageIndex, pagination.pageSize]);

  const pageCount = table.getPageCount();
  useEffect(() => {
    if (pagination.pageIndex >= pageCount) {
      table.setPageIndex(0);
    }
  }, [pageCount, pagination.pageIndex, table]);

  const rowEntries = table.getRowModel().rows;

  const allColumns = table.getAllLeafColumns();
  /**
   * `table` is a new object every render (TanStack memoizes row/column
   * model *computations* internally, not the `table` instance itself), so
   * wrapping these in `useMemo` keyed on `table` would recompute every
   * render anyway — they're cheap array filters, just derive them directly.
   */
  const filteredVisibleColumns = table.getVisibleLeafColumns()
    .filter(col => !col.columnDef.meta?.isToggable);

  const columnVisibilityKey = table.getVisibleLeafColumns().map(col => col.id).join('|');

  const expandedRowsKey = hasSomeExpandableRows
    ? table.getPrePaginationRowModel().rows
      .filter(row => row.getCanExpand() && row.getIsExpanded())
      .map(r => r.id)
      .join('|')
    : '';

  const dynamicStyle: CSSProperties = {
    '--table-height': height,
    '--table-background': background,
  };

  return (
    <div
      className={clsx(styles.Table, className)}
      style={{ ...dynamicStyle, ...style }}
    >

      {/* CONTEXT TOAST */}
      <AnimatePresence>
        <LazyMotion features={domAnimation}>
          {!!Object.keys(rowSelection).length && selectableRows && (
            <Stack
              as={m.div}
              className={styles.Toast}
              direction="row"
              hAlign="space-between"
              vAlign="center"
              hPadding={16}
              vPadding={8}
              fill={false}
              columnGap={16}
              initial={{ y: '-16px', opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: {
                  type: 'spring',
                  stiffness: 700,
                  damping: 30,
                },
              }}
              exit={{ y: '-16px', opacity: 0 }}
            >
              <Text as="span" variant="body-1">
                <b>{selectedLabel(Object.keys(rowSelection) as Array<IdType<T>>)}</b>
              </Text>
              {selectedActions?.(Object.keys(rowSelection) as Array<IdType<T>>)}
            </Stack>
          )}

          {/* HEADER */}
          {(showHeader || selectableRows) && (
            <m.div
              animate={{
                y: Object.keys(rowSelection).length ? 20 : 0,
                opacity: Object.keys(rowSelection).length ? 0 : 1,
                transition: {
                  type: 'spring',
                  stiffness: 700,
                  damping: 30,
                },
              }}
            >
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
            </m.div>
          )}
        </LazyMotion>
      </AnimatePresence>

      {/* TABLE */}
      {((data.length || loading) && filteredVisibleColumns.length)
        ? (
          <div className={styles.TableWrapper} data-table-scrolling={Boolean(height)}>
            <table
              className={styles.TableElement}
              data-table-stripes={stripes}
              data-table-separators={showSeparators}
              data-table-loading={loading}
              aria-labelledby={uid('table-title')}
              {...otherProps}
            >

              {/* THEAD */}
              {showTableHead && (
                <thead className={styles.THead}>
                  {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <TableCell
                          key={header.id}
                          as="th"
                          width={
                            header.column.columnDef.meta?.minWidth === 0
                              ? undefined
                              : header.column.columnDef.meta?.minWidth
                          }
                          collapsed={header.column.columnDef.meta?.isCollapsed}
                          isSorted={Boolean(header.column.getIsSorted())}
                          isSortedDesc={header.column.getIsSorted() === 'desc'}
                          align={header.column.columnDef.meta?.align}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </thead>
              )}

              {/* TBODY */}
              <tbody>
                {loading
                  ? (
                    <TableRow>
                      <TableCell colSpan={100}>
                        <Skeleton gap={16} height={24} count={10} />
                      </TableCell>
                    </TableRow>
                  )
                  : rowEntries.map(row => (
                    <TableBodyRow
                      key={row.id}
                      row={row}
                      expandedRowsKey={expandedRowsKey}
                      expandableRowComponent={expandableRowComponent}
                      isRowSelected={row.getIsSelected()}
                      isRowExpanded={row.getIsExpanded()}
                      columnVisibilityKey={columnVisibilityKey}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        )
        : (
          <Stack vAlign="center" hAlign="center">
            {emptyComponent ?? 'No data'}
          </Stack>
        )
      }

      {/* PAGINATION */}
      {(showPagination && filteredVisibleColumns.length > 0 && !!rowEntries.length) && (
        <TablePagination
          clusters={pageClusters}
          pageSize={pagination.pageSize}
          totalItems={totalRows ?? table.getPrePaginationRowModel().rows.length}
          currentPage={pagination.pageIndex}
          totalPages={pageCount}
          isManual={Boolean(isManualPaginated && totalRows)}
          onPageSizeChange={table.setPageSize}
          onPageClick={selected => table.setPageIndex(selected)}
        />
      )}
    </div>
  );
};
