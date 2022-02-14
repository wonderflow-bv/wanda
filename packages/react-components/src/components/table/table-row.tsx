import styles from './table.module.css'
import { FC } from 'react'
import clsx from 'clsx'

type TableRowProps = PropsWithClass & {
  highlight?: boolean
}

export const TableRow: FC<TableRowProps> = ({
  children,
  className,
  highlight,
  ...otherProps
}) => {
  return (
    <tr data-table-row-highlight={highlight} className={clsx(styles.Row, className)} {...otherProps}>
      {children}
    </tr>
  )
}
