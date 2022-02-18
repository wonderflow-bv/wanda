import {
  Column, CustomHeaderGroup, CustomCell, ColumnInstance
} from 'react-table'

export type OptionalColumnTypes = {
  isCollapsed?: boolean;
  align?: 'start' | 'center' | 'end';
  hideFromList?: boolean;
  expander?: boolean;
}

export type OptionalDataTypes<T> = {
  subRows?: T[]
}

export type HeaderGroupType = CustomHeaderGroup<OptionalColumnTypes>
export type CellType = CustomCell<OptionalColumnTypes>
export type CustomColumnsType<T extends object> = (Column<T> & OptionalColumnTypes)[]
export type CustomColumnInstanceType = ColumnInstance & OptionalColumnTypes
