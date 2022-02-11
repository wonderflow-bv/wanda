import styles from './table.module.css'
import { forwardRef } from 'react'
import { Polymorphic } from '@/components'
import clsx from 'clsx'

type TableCellProps = PropsWithClass & {
  collapsed?: boolean
}

type PolymorphicCell = Polymorphic.ForwardRefComponent<'td', TableCellProps>;

export const TableCell = forwardRef(({
  children,
  className,
  as: Wrapper = 'td',
  collapsed,
  ...otherProps
}, forwardedRef) => {
  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.Cell, className)}
      data-table-cell-collapsed={collapsed}
      {...otherProps}
    >
      {children}
    </Wrapper>
  )
}) as PolymorphicCell
