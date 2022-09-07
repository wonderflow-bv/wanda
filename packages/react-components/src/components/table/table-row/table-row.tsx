import clsx from 'clsx';
import { PropsWithChildren, useMemo } from 'react';
import { IdType, Row } from 'react-table';

import * as styles from './table-row.module.css';

type TableRowProps<T extends Record<string, unknown>> = PropsWithChildren<PropsWithClass<{
  expanded?: boolean;
  rowData?: Row<T>;
  expandedRows?: Array<IdType<T>>;
}>>

export const TableRow = <T extends Record<string, unknown>>({
  children,
  className,
  expanded,
  rowData,
  expandedRows,
  ...otherProps
}: TableRowProps<T>) => {
  const highlightRow = useMemo(() => {
    const [currentParentRowId] = rowData?.id.match(/.*(?=\.)/) ?? [];
    const isHighlight = expandedRows?.includes(currentParentRowId) && expandedRows.every((rowId) => {
      const [parentRowMatch] = rowId.match(/.*(?=\.)/) ?? [];
      return parentRowMatch !== currentParentRowId;
    });

    return Boolean(isHighlight);
  }, [expandedRows, rowData]);

  return (
    <tr
      className={clsx(styles.TableRow, className)}
      data-table-row-expanded={expanded}
      data-table-row-highlight={highlightRow || undefined}
      {...otherProps}
    >
      {children}
    </tr>
  );
};
