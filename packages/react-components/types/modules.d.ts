import { UseGlobalFiltersOptions } from 'react-table'

declare module 'react-table' {
  export interface TableOptions<D extends Record<string, unknown>>
    extends UseGlobalFiltersOptions<D> {}

  export interface TableInstance<D extends Record<string, unknown>>
    extends UseGlobalFiltersInstanceProps<D> {}
}
