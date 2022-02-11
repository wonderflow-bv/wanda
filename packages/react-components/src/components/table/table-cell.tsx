import styles from './table.module.css'
import { forwardRef } from 'react'
import { Polymorphic } from '@/components'
import clsx from 'clsx'

type TableCellProps = PropsWithClass & {

}

type PolymorphicCell = Polymorphic.ForwardRefComponent<'div', TableCellProps>;

export const TableCell = forwardRef(({
  children,
  className,
  as: Wrapper = 'div',
  ...otherProps
}, forwardedRef) => {
  return (
    <Wrapper
      ref={forwardedRef}
      type={Wrapper === 'div' ? undefined : 'button'}
      className={clsx(styles.Cell, className)}
      {...otherProps}
    >
      {children}
    </Wrapper>
  )
}) as PolymorphicCell
