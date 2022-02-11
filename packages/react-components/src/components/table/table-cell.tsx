import styles from './table.module.css'
import { forwardRef } from 'react'
import { Polymorphic, Icon } from '@/components'
import clsx from 'clsx'

type TableCellProps = PropsWithClass & {
  collapsed?: boolean
  isSorted?: boolean
  isSortedDesc?: boolean
}

type PolymorphicCell = Polymorphic.ForwardRefComponent<'td', TableCellProps>;

export const TableCell = forwardRef(({
  children,
  className,
  as: Wrapper = 'td',
  collapsed,
  isSorted,
  style,
  isSortedDesc,
  ...otherProps
}, forwardedRef) => {
  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.Cell, className)}
      data-table-cell-collapsed={collapsed}
      style={{ ...style, userSelect: Wrapper === 'td' ? undefined : 'none' }}
      {...otherProps}
    >
      {children}
      {isSorted && (
        <Icon
          dimension={12}
          className={styles.HeadCellIcon}
          fill="var(--highlight-red-foreground)"
          source={isSortedDesc ? 'bars-sort-up' : 'bars-sort-down'}
        />
      )}
    </Wrapper>
  )
}) as PolymorphicCell
