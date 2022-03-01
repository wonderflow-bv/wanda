import styles from './table-row.module.css'
import { FC } from 'react'
import clsx from 'clsx'

type TableRowProps = PropsWithClass

export const TableRow: FC<TableRowProps> = ({
  children,
  className,
  ...otherProps
}) => {
  return (
    <tr
      className={clsx(styles.TableRow, className)}
      {...otherProps}
    >
      {children}
    </tr>
  )
}
