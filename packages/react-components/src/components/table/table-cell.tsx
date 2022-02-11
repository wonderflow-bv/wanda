import styles from './table.module.css'
import { FC } from 'react'
import clsx from 'clsx'

type TableCellProps = PropsWithClass & {

}

export const TableCell: FC<TableCellProps> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <div className={clsx(styles.Cell, className)} {...otherProps}>
      {children}
    </div>
  )
}
