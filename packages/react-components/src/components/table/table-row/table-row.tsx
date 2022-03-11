import styles from './table-row.module.css'
import { PropsWithChildren, useCallback } from 'react'
import clsx from 'clsx'
import { Row } from 'react-table'

type TableRowProps<T extends {}> = PropsWithChildren<PropsWithClass> & {
  expanded?: boolean
  rowData?: Row<T>
  rowDepthGroup?: any[]
}

export const TableRow = <T extends {}>({
  children,
  className,
  expanded,
  rowData,
  rowDepthGroup,
  ...otherProps
}: TableRowProps<T>) => {
  const highlightRow = useCallback(() => {
    const currentParentRow = rowData?.id.split('.').slice(0, rowData.depth).join('.')
    if (rowDepthGroup && rowData) {
      return rowData.depth > 0 && rowDepthGroup.includes(rowData) && rowDepthGroup.every((rowData) => {
        const parentRow = rowData?.id.split('.').slice(0, rowData.depth).join('.')

        return !rowData.isExpanded || parentRow !== currentParentRow
      })
    }
    return null
  }, [rowData, rowDepthGroup])

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
