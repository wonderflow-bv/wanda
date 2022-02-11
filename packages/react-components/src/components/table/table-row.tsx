import styles from './table.module.css'
import { FC } from 'react'
import clsx from 'clsx'

type TableRowProps = PropsWithClass & {

}

export const TableRow: FC<TableRowProps> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <div role="row" className={clsx(styles.Row, className)} {...otherProps}>
      {children}
    </div>
  )
}
