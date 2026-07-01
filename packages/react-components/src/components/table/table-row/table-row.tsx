/*
 * Copyright 2022-2023 Wonderflow Design Team
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

import clsx from 'clsx';
import { memo, PropsWithChildren, useMemo } from 'react';
import { Row } from 'react-table';

import * as styles from './table-row.module.css';

type TableRowProps<T extends Record<string, unknown>> = PropsWithChildren<PropsWithClass<{
  expanded?: boolean;
  rowData?: Row<T>;
  expandedRowsKey?: string;
  /**
   * Cheap, stable signature (e.g. `${row.id}:${isSelected}:${isExpanded}`)
   * computed by the parent `Table`. `react-table` v7 returns a brand new
   * `row` object (and new `getRowProps()`/cell elements) on every render,
   * even for rows whose own state did not change, which defeats
   * `React.memo`'s default shallow comparison. `MemoTableRow` uses this
   * signature instead of `rowData`/`children` identity to decide whether a
   * row actually needs to re-render.
   */
  rowSignature?: string;
}>>

export const TableRow = <T extends Record<string, unknown>>({
  children,
  className,
  expanded,
  rowData,
  expandedRowsKey,
  rowSignature: _rowSignature,
  ...otherProps
}: TableRowProps<T>) => {
  const shouldHighlightRow = useMemo(() => {
    if (!expandedRowsKey || !rowData) return false;
    const [currentParentRowId] = (/.*(?=\.)/.exec(rowData.id)) ?? [];
    if (!currentParentRowId) return false;
    const expandedIds = expandedRowsKey.split('|');
    const isHighlight = expandedIds.includes(currentParentRowId) && expandedIds.every((rowId) => {
      const [parentRowMatch] = (/.*(?=\.)/.exec(rowId)) ?? [];
      return parentRowMatch !== currentParentRowId;
    });

    return isHighlight;
  }, [expandedRowsKey, rowData]);

  return (
    <tr
      className={clsx(styles.TableRow, className)}
      data-table-row-expanded={expanded}
      data-table-row-highlight={shouldHighlightRow || undefined}
      {...otherProps}
    >
      {children}
    </tr>
  );
};

/**
 * `react-table` v7's `useRowSelect`/`useExpanded` recompute the `rows`
 * array (new object refs + new `cell.render('Cell')` elements per row) on
 * every selection/expansion change, even for rows that did not actually
 * change. That defeats `React.memo`'s default shallow comparison, so
 * clicking one checkbox re-renders all 500 rows instead of the 1 or 2 that
 * changed — the visible lag on select/select-all.
 *
 * Comparing on `rowSignature` (and the other primitive props) instead of
 * `rowData`/`children` identity lets a row skip re-rendering when nothing
 * that affects its output actually changed.
 */
const areRowPropsEqual = <T extends Record<string, unknown>>(
  prevProps: TableRowProps<T>,
  nextProps: TableRowProps<T>,
) => (
    prevProps.rowSignature === nextProps.rowSignature
    && prevProps.expandedRowsKey === nextProps.expandedRowsKey
    && prevProps.expanded === nextProps.expanded
    && prevProps.className === nextProps.className
  );

export const MemoTableRow = memo(TableRow, areRowPropsEqual) as typeof TableRow;
