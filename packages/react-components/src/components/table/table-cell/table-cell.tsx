/*
 * Copyright 2022 Wonderflow <authored by Wonderflow Design Team>
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
import { CSSProperties, forwardRef } from 'react';

import { Polymorphic, Symbol } from '@/components';

import { OptionalColumnTypes } from '../types';
import * as styles from './table-cell.module.css';

type TableCellProps = {
  collapsed?: OptionalColumnTypes['isCollapsed'];
  isSorted?: boolean;
  isSortedDesc?: boolean;
  align?: OptionalColumnTypes['align'];
  padding?: boolean;
  width?: string | number;
}

type PolymorphicCell = Polymorphic.ForwardRefComponent<'td', TableCellProps>;

export const TableCell = forwardRef(({
  children,
  className,
  collapsed,
  isSorted,
  align = 'start',
  style,
  isSortedDesc,
  as: Wrapper = 'td',
  padding = true,
  width,
  ...otherProps
}, forwardedRef) => {
  const isWidthString = typeof width === 'string';
  const computedWidthNumber = typeof width === 'number' ? `${width}px` : undefined;

  const dynamicStyle: CSSProperties = {
    '--width': isWidthString ? width : computedWidthNumber,
    '--text-align': align,
  };

  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.TableCell, className)}
      data-table-cell-collapsed={collapsed}
      data-table-cell-padding={padding}
      data-table-cell-fixed={Boolean(width)}
      style={{
        ...dynamicStyle,
        ...style,
        userSelect: Wrapper === 'td' ? undefined : 'none',
      }}
      {...otherProps}
    >
      {children}
      {isSorted && (
        <Symbol
          dimension={12}
          className={styles.HeadCellIcon}
          fill="var(--highlight-red-foreground)"
          source={isSortedDesc ? 'bars-sort-down' : 'bars-sort-up'}
        />
      )}
    </Wrapper>
  );
}) as PolymorphicCell;
