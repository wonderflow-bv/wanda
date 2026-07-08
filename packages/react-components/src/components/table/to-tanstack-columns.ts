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

import { ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';

import {
  CustomColumnsType, CustomColumnType, HeaderRenderProps, OptionalColumnTypes,
} from './types';

/**
 * Converts a single public, `react-table` v7-shaped column definition
 * (`id`/`Header`/`accessor`/`Cell`/`disableSortBy` plus our own
 * `OptionalColumnTypes`) into a v8 `ColumnDef`. This is what lets every
 * existing consumer keep defining `columns` exactly as before while
 * `Table` runs on `@tanstack/react-table` internally.
 */
const toTanStackColumn = <T extends Record<string, unknown>>(
  column: CustomColumnType<T>,
): ColumnDef<T> => {
  const {
    id, Header, accessor, Cell, disableSortBy,
    isCollapsed, align, isToggable, expander, minWidth,
  } = column;

  const meta: OptionalColumnTypes = {
    isCollapsed, align, isToggable, expander, minWidth,
  };

  // `Header`/`Cell` are almost always a plain `ReactNode` (or unset) in
  // practice; the function form is only kept for source compatibility with
  // consumers that relied on `react-table` v7's row/column-based render props.
  const header = (typeof Header === 'function'
    ? (ctx: { column: HeaderRenderProps<T>['column'] }) => (
      Header as (props: HeaderRenderProps<T>) => ReactNode
    )({ column: ctx.column })
    : Header) as ColumnDef<T>['header'];

  const cell: ColumnDef<T>['cell'] = Cell
    ? ctx => Cell({ row: ctx.row, value: ctx.getValue() })
    : ctx => ctx.getValue() as ReactNode;

  const shared = {
    id,
    header,
    cell,
    enableSorting: !disableSortBy,
    meta,
  };

  // `shared` covers fields common to every `ColumnDef` variant; which
  // concrete variant applies (accessor-fn/accessor-key/display-only) is
  // only known at runtime, so TypeScript can't narrow the union for us here.
  if (typeof accessor === 'function') {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return { ...shared, accessorFn: accessor } as ColumnDef<T>;
  }

  if (typeof accessor === 'string') {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {
      ...shared,
      id: id ?? accessor,
      accessorKey: accessor,
    } as ColumnDef<T>;
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return shared as ColumnDef<T>;
};

export const toTanStackColumns = <T extends Record<string, unknown>>(
  columns: CustomColumnsType<T>,
): Array<ColumnDef<T>> => columns.map(column => toTanStackColumn(column));
