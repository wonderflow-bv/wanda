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
  const shouldHighlightRow = useMemo(() => {
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
      data-table-row-highlight={shouldHighlightRow || undefined}
      {...otherProps}
    >
      {children}
    </tr>
  );
};
