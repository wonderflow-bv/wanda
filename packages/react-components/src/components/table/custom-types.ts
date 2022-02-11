import {
  UseTableInstanceProps, HeaderGroup,
  UseSortByColumnProps, Cell
} from 'react-table'

export type OptionalColumnTypes = {
  collapse?: boolean;
}

export type OptionalCellColumnTypes = { column: OptionalColumnTypes }

export type CustomTableInstanceType<T extends {}> = UseTableInstanceProps<T>
export type CustomColumnPropsType<T extends {}> = HeaderGroup<T> & UseSortByColumnProps<T>
export type CustomCellPropsType<T extends {}> = Cell<T, unknown> & OptionalCellColumnTypes
