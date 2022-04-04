import { ReactNode } from 'react'
import {
  Column, ColumnInstance,
  CustomCell,
  CustomHeaderGroup
} from 'react-table'

export type PaginationPageType = {
  pageIndex: number;
  pageSize: number;
}

export type OptionalColumnTypes = {
  isCollapsed?: boolean;
  align?: 'start' | 'center' | 'end';
  hideFromList?: boolean;
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
