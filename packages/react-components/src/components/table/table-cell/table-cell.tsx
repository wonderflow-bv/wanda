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
