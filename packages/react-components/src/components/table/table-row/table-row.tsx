import styles from './table-row.module.css'
import { PropsWithChildren, useCallback } from 'react'
import clsx from 'clsx'
import { Row } from 'react-table'

type TableRowProps<T extends {}> = PropsWithChildren<PropsWithClass> & {
  expanded?: boolean
  row?: Row<T>
  rowDepthGroup?: any[]
}

export const TableRow = <T extends {}>({
  children,
  className,
  expanded,
  row,
  rowDepthGroup,
  ...otherProps
}: TableRowProps<T>) => {
  const highlightRow = useCallback(() => {
    if (rowDepthGroup && row) {
      const currentParentRow = row.depth && row.id.split('.').slice(0, row.depth).join('.')

      return row.depth > 0 && rowDepthGroup.includes(row) && rowDepthGroup.every((row: Row<T>) => {
        const parentRow = row.id.split('.').slice(0, row.depth).join('.')

        return !row.isExpanded || parentRow !== currentParentRow
      })
    }
    return null
  }, [row, rowDepthGroup])

  return (
    <tr
      className={clsx(styles.TableRow, className)}
      data-table-row-expanded={expanded}
      data-table-row-highlight={highlightRow() || undefined}
      {...otherProps}
    >
      {children}
    </tr>
  )
}
