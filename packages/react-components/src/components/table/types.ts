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

import { ReactNode } from 'react';
import {
  Column, ColumnInstance,
  CustomCell,
  CustomHeaderGroup,
} from 'react-table';

export type PaginationPageType = {
  pageIndex: number;
  pageSize: number;
}

export type OptionalColumnTypes = {
  isCollapsed?: boolean;
  align?: 'start' | 'center' | 'end';
  isToggable?: boolean;
  expander?: boolean;
}

export type OptionalDataTypes<T> = {
  subRows?: T[];
  actions?: ReactNode | ReactNode[];
}

export type HeaderGroupType<T extends Record<string, unknown>> = CustomHeaderGroup<T, OptionalColumnTypes>
export type CellType<T extends Record<string, unknown>> = CustomCell<T, OptionalColumnTypes>
export type CustomColumnsType<T extends Record<string, unknown>> = Array<Column<T> & OptionalColumnTypes>
export type CustomColumnInstanceType<T extends Record<string, unknown>> = ColumnInstance<T> & OptionalColumnTypes
export type CustomSortingRule<T> = {
  id: keyof T;
  desc?: boolean;
}
