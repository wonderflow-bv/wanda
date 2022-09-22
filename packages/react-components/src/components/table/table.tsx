/*
 * Copyright 2022 Wonderflow <authored by Mattia Astorino>
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

import { useUpdateEffect } from 'ahooks';
import clsx from 'clsx';
import {
  AnimatePresence, domMax, LazyMotion, m,
} from 'framer-motion';
import {
  ComponentType, CSSProperties, Fragment, ReactNode, useCallback, useEffect, useMemo,
} from 'react';
import {
  Hooks, IdType, Row,
  SortingRule,
  useExpanded, usePagination,
  useRowSelect, useSortBy, useTable,
} from 'react-table';
import { useUIDSeed } from 'react-uid';

import {
  Skeleton, Stack, Text,
  ToggleButton,
} from '@/components';

import * as styles from './table.module.css';
import { TableCell } from './table-cell';
import { TableCheckbox } from './table-checkbox';
import { ToggleColumnsControl } from './table-controls';
import { TableExpand } from './table-expand';
import { TableHeader, TableHeaderProps } from './table-header';
import { TablePagination, TablePaginationProps } from './table-pagination';
import { TableRow } from './table-row';
import {
  CellType, CustomColumnInstanceType, CustomColumnsType,
  CustomSortingRule, HeaderGroupType, OptionalDataTypes, PaginationPageType,
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
  initialSortBy?: Array<SortingRule<T>>;
  /**
    * Callback run when a column is sorted
    */
  onSortChange?: (sorting: Array<CustomSortingRule<T>>) => void;
  /**
   * Callback run on row expansion. Returns the expanded row data.
   */
  onRowExpandChange?: (row: Row<T>) => void;
}

export const Table = <T extends Record<string, unknown>>({
  className,
  style,
  columns,
  data = [],
  selectableRows,
  selectedRowIds = [],
  onSelectedRowsChange,
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
  ...otherProps
}: TableProps<T>) => {
  const uid = useUIDSeed();
  const hasSomeExpandableRows = useMemo(() => data.some(d => d.subRows), [data]);
  const isManualPaginated = useMemo(
    () => Boolean(showPagination && onPaginationChange && totalRows),
    [showPagination, totalRows, onPaginationChange],
  );
  const manualPaginationPageCount = useMemo(
    () => ((isManualPaginated && totalRows) ? Math.ceil(totalRows / itemsPerPage) : -1),
    [isManualPaginated, totalRows, itemsPerPage],
  );

  const getHiddenColumns = useCallback(() => {
    const hiddenColumns = defaultHiddenColumns ? [...defaultHiddenColumns] : [];
    if (!selectableRows) hiddenColumns.push('selection');
    if (!hasSomeExpandableRows) hiddenColumns.push('expander');

    return hiddenColumns;
  }, [defaultHiddenColumns, selectableRows, hasSomeExpandableRows]);

  const getRowId = useCallback((originalRow, relativeIndex, parent) => originalRow?._id || (parent && [parent.id, relativeIndex].join('.')) || relativeIndex.toString(),
    []);

  const computePageSize = useCallback(
    () => ((data.length > 0) ? data.length : 9999),
    [data],
  );

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
    visibleColumns,
    setPageSize,
    setHiddenColumns,
    state: {
      pageSize,
      pageIndex,
      sortBy,
      selectedRowIds: selectedRowIdsState,
    },
  } = useTable(
    {
      columns,
      data,
      getRowId,
      expandSubRows: Boolean(!expandableRowComponent),
      manualPagination: isManualPaginated,
      pageCount: manualPaginationPageCount,
      manualSortBy: isManualSorted,
      disableMultiSort: true,
      autoResetHiddenColumns: false,
      autoResetPage: false,
      autoResetSortBy: false,
      /**
       * This `paginateExpandedRows` prop prevent expanded rows to
       * be placed in the next page. But it breaks row selection
       * paginateExpandedRows: !showPagination,
       */
      initialState: {
        sortBy: initialSortBy,
        pageIndex: initialPageIndex,
        pageSize: showPagination ? itemsPerPage : computePageSize(),
        hiddenColumns: getHiddenColumns(),
        selectedRowIds: selectedRowIds.reduce<Record<IdType<string>, boolean>>((acc, curr) => ({
          ...acc,
          [curr]: true,
        }), {}),
      },
    },
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks: Hooks<T>) => {
      const checkboxColumn: CustomColumnsType<T> = [{
        id: 'selection',
        isCollapsed: true,
        isToggable: true,
        Header: ({ getToggleAllPageRowsSelectedProps }) => (
          <TableCheckbox {...getToggleAllPageRowsSelectedProps()} />
        ),
        Cell: ({ row }: { row: Row<T> }) => <TableCheckbox {...row.getToggleRowSelectedProps()} />,
      }];

      const expanderColumn: CustomColumnsType<T> = [{
        id: 'expander',
        isToggable: true,
        expander: true,
        minWidth: 40,
        align: 'center',
        Cell: ({ row }: { row: Row<T> }) => (row.canExpand
          ? (
            <ToggleButton
              kind="flat"
              dimension="small"
              restingIcon="chevron-right"
              pressedIcon="chevron-down"
              {...row.getToggleRowExpandedProps()}
              pressed={row.isExpanded}
              onClick={() => {
                const subRowsExpanded = row.subRows.filter(r => r.isExpanded);
                subRowsExpanded.forEach(r => r.toggleRowExpanded(!r.isExpanded));
                row.toggleRowExpanded(!row.isExpanded);

                onRowExpandChange?.(row);
              }}
            />
          )
          : null),
      }];

      hooks.visibleColumns.push(columns => [
        ...checkboxColumn,
        ...expanderColumn,
        ...columns,
      ]);
    },
  );

  useUpdateEffect(() => {
    const hiddenColumns = getHiddenColumns();
    setHiddenColumns(hiddenColumns);
  }, [
    setHiddenColumns,
    getHiddenColumns,
  ]);

  useUpdateEffect(() => {
    onSelectedRowsChange?.(Object.keys(selectedRowIdsState));
  }, [
    selectedRowIdsState,
    onSelectedRowsChange,
  ]);

  useUpdateEffect(() => {
    onSortChange?.(sortBy);
  }, [onSortChange, sortBy]);

  useUpdateEffect(() => {
    void onPaginationChange?.({ pageIndex, pageSize });
  }, [onPaginationChange, pageIndex, pageSize]);

  useEffect(() => {
    if (pageIndex >= pageCount) {
      gotoPage(0);
    }
  }, [pageCount, pageIndex, gotoPage]);

  const rowEntries = useMemo(() => (showPagination ? page : rows), [page, rows, showPagination]);

  const filteredVisibleColumns = useMemo(() => (
    visibleColumns.filter((col: CustomColumnInstanceType<T>) => !col.isToggable)
  ), [visibleColumns]);

  const expandedRows = useMemo(() => rows.filter(row => row.canExpand && row.isExpanded).map(r => r.id), [rows]);

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
        <LazyMotion features={domMax}>
          {!!Object.keys(selectedRowIdsState).length && selectableRows && (
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
              <Text as="span" size={14} weight="bold">
                {selectedLabel(Object.keys(selectedRowIdsState))}
              </Text>
              {selectedActions?.(Object.keys(selectedRowIdsState))}
            </Stack>
          )}

          {/* HEADER */}
          {(showHeader || selectableRows) && (
            <m.div
              animate={{
                y: Object.keys(selectedRowIdsState).length ? 20 : 0,
                opacity: Object.keys(selectedRowIdsState).length ? 0 : 1,
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
              {...getTableProps()}
              {...otherProps}
            >

              {/* THEAD */}
              {showTableHead && (
                <thead className={styles.THead}>
                  {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column: HeaderGroupType<T>) => (
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
              <tbody {...getTableBodyProps()}>
                {loading
                  ? (
                    <TableRow>
                      <TableCell colSpan={100}>
                        <Skeleton gap={16} height={24} count={10} />
                      </TableCell>
                    </TableRow>
                  )
                  : rowEntries.map((row) => {
                    prepareRow(row);
                    return (
                      <Fragment key={row.id}>
                        <TableRow
                          {...row.getRowProps()}
                          expanded={(
                            row.isExpanded && !row.subRows.some(subrow => subrow.isExpanded && subrow.canExpand)
                          )}
                          rowData={row}
                          expandedRows={expandedRows}
                        >
                          {row.cells.map((cell: CellType<T>) => (
                            <TableCell
                              collapsed={cell.column.isCollapsed}
                              width={cell.column.minWidth === 0 ? undefined : cell.column.minWidth}
                              align={cell.column.align}
                              {...cell.getCellProps()}
                            >
                              {cell.render('Cell')}
                            </TableCell>
                          ))}
                        </TableRow>
                        {(row.subRows && row.isExpanded && expandableRowComponent) && row.subRows.map(subRow => (
                          <TableRow data-table-row-expander key={subRow.id}>
                            <TableCell padding={false} colSpan={100}>
                              <TableExpand data={subRow.original} component={expandableRowComponent} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </Fragment>
                    );
                  })}
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
      {(showPagination && filteredVisibleColumns.length > 0 && !!rows.length) && (
        <TablePagination
          clusters={pageClusters}
          pageSize={pageSize}
          totalItems={totalRows ?? rows.length}
          currentPage={pageIndex}
          totalPages={pageCount}
          isManual={Boolean(isManualPaginated && totalRows)}
          onPageSizeChange={setPageSize}
          onPageClick={selected => gotoPage(selected)}
        />
      )}
    </div>
  );
};
