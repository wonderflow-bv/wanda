import '@tanstack/react-table';
import { RowData } from '@tanstack/react-table';

import { OptionalColumnTypes } from '../src/components/table/types';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> extends OptionalColumnTypes {}
}
