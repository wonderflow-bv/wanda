import styles from './table.module.css'
import { CSSProperties, forwardRef } from 'react'
import { Polymorphic, Icon } from '@/components'
import clsx from 'clsx'
import { OptionalColumnTypes } from './custom-types'

type TableCellProps = PropsWithClass & {
  collapsed?: OptionalColumnTypes['isCollapsed']
  isSorted?: boolean
  isSortedDesc?: boolean
  align?: OptionalColumnTypes['align']
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
  ...otherProps
}, forwardedRef) => {
  const dynamicStyle: CSSProperties = {
    '--text-align': align
  }

  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.Cell, className)}
      data-table-cell-collapsed={collapsed}
      style={{
        ...dynamicStyle,
        ...style,
        userSelect: Wrapper === 'td' ? undefined : 'none'
      }}
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
