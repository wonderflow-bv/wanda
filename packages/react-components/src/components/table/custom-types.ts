import {
  UseTableInstanceProps, HeaderGroup,
  UseSortByColumnProps, Cell, UseRowSelectInstanceProps
} from 'react-table'

export type OptionalColumnTypes = {
  isCollapsed?: boolean;
  align?: 'start' | 'center' | 'end';
}

export type OptionalCellColumnTypes = { column: OptionalColumnTypes }

export type CustomTableInstanceType<T extends {}> = UseTableInstanceProps<T> & Partial<UseRowSelectInstanceProps<T>>
export type CustomColumnPropsType<T extends {}> = HeaderGroup<T> & UseSortByColumnProps<T> & OptionalColumnTypes
export type CustomCellPropsType<T extends {}> = Cell<T, unknown> & OptionalCellColumnTypes
