import styles from './table-row.module.css'
import { PropsWithChildren, useCallback } from 'react'
import clsx from 'clsx'
import { Row } from 'react-table'

type TableRowProps<T extends {}> = PropsWithChildren<PropsWithClass> & {
  expanded?: boolean
  rowData?: Row<T>
  rowDepthGroup?: any[]
  expandedRows?: any[]
}

export const TableRow = <T extends {}>({
  children,
  className,
  expanded,
  rowData,
  expandedRows,
  ...otherProps
}: TableRowProps<T>) => {
  const highlightRow = useCallback(() => {
    const currentParentRowId = rowData?.id.match(/.*(?=\.)/)

    return currentParentRowId && expandedRows?.includes(currentParentRowId[0]) && expandedRows.every(r => {
      const parentRow = r.match(/.*(?=\.)/)
      parentRow && console.log(parentRow[0])
      console.log(currentParentRowId[0])
      return !parentRow || parentRow[0] !== currentParentRowId[0]
    })
  }, [expandedRows, rowData])

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
