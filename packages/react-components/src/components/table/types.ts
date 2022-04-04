import { ReactNode } from 'react'
import {
  Column, ColumnInstance,
  CustomCell,
  CustomHeaderGroup,
  SortingRule
} from 'react-table'
import { TablePaginationProps } from './table-pagination'

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

export type PaginationType = {
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
}

export type SortingType<T> = {
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
}
