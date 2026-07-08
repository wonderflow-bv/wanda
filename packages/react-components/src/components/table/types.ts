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

import { Cell, Column, Header } from '@tanstack/react-table';
import { ReactNode } from 'react';

/**
 * Row/column ids are always plain strings (see `Table`'s `getRowId`), the
 * generic parameter is kept only for source-compatibility with the
 * previous `react-table` v7-based `IdType<T>`.
 */
export type IdType<T> = Extract<keyof T, string> | (string & Record<never, never>);

export type PaginationPageType = {
  pageIndex: number;
  pageSize: number;
}

/**
 * Extra, design-system-only fields a column definition can carry, on top of
 * the "core" fields (`id`/`Header`/`accessor`/`Cell`/`disableSortBy`) that
 * map 1:1 to `@tanstack/react-table` primitives. These aren't part of
 * TanStack's own `ColumnDef`, so `Table`'s column conversion shim
 * (`to-tanstack-columns.ts`) threads them through `columnDef.meta` (see the
 * `ColumnMeta` module augmentation in `types/tanstack-table.d.ts`) instead
 * of setting them directly on the column/cell object.
 */
export type OptionalColumnTypes = {
  isCollapsed?: boolean;
  align?: 'start' | 'center' | 'end';
  isToggable?: boolean;
  expander?: boolean;
  /**
   * Pixel width used for the column's CSS `--width`. This is a plain
   * design-system field (layout/CSS sizing), unrelated to TanStack's own
   * `size`/`minSize` column-sizing feature, which is a different concept
   * and only takes effect if the sizing feature/state is explicitly used
   * (it isn't, here).
   */
  minWidth?: number;
}

export type OptionalDataTypes<T> = {
  subRows?: T[];
  actions?: ReactNode | ReactNode[];
}

/**
 * Render-prop signatures kept source-compatible with the previous
 * `react-table` v7-based API: `Header`/`Cell` receive the row/column
 * directly, rather than v8's context-object shape
 * (`{ getValue(), row, column, table }`). `Table`'s column conversion shim
 * (`to-tanstack-columns.ts`) adapts between the two.
 */
export type HeaderRenderProps<T extends Record<string, unknown>> = {
  column: CustomColumnInstanceType<T>;
}
export type CellRenderProps<T extends Record<string, unknown>> = {
  row: import('@tanstack/react-table').Row<T>;
  value: unknown;
}

export type CustomColumnType<T extends Record<string, unknown>> = OptionalColumnTypes & {
  id?: string;
  Header?: ReactNode | ((props: HeaderRenderProps<T>) => ReactNode);
  accessor?: keyof T | ((row: T) => unknown);
  Cell?: (props: CellRenderProps<T>) => ReactNode;
  disableSortBy?: boolean;
}

export type CustomColumnsType<T extends Record<string, unknown>> = Array<CustomColumnType<T>>

/**
 * A resolved TanStack `Column`/`Header`/`Cell` instance. The
 * `OptionalColumnTypes` fields set on the original column definition are
 * available at runtime via `.columnDef.meta` (typed automatically through
 * the `ColumnMeta` module augmentation in `types/tanstack-table.d.ts`).
 */
export type CustomColumnInstanceType<T extends Record<string, unknown>> = Column<T>
export type HeaderGroupType<T extends Record<string, unknown>> = Header<T, unknown>
export type CellType<T extends Record<string, unknown>> = Cell<T, unknown>

export type CustomSortingRule<T> = {
  id: keyof T;
  desc?: boolean;
}
