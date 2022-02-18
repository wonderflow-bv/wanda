import styles from './table-cell.module.css'
import { CSSProperties, forwardRef } from 'react'
import { Polymorphic, Icon } from '@/components'
import clsx from 'clsx'
import { OptionalColumnTypes } from '../types'
import tkns from '@wonderflow/tokens/platforms/web/tokens.json'

type TableCellProps = PropsWithClass & {
  collapsed?: OptionalColumnTypes['isCollapsed']
  isSorted?: boolean
  isSortedDesc?: boolean
  align?: OptionalColumnTypes['align']
  padding?: boolean
  depth?: number
  expander?: boolean
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
  padding = true,
  expander,
  depth = 0,
  ...otherProps
}, forwardedRef) => {
  const colors = [
    'var(--highlight-gray-background)',
    `hsl(${tkns.color.blue[30]})`,
    `hsl(${tkns.color.green[30]})`,
    `hsl(${tkns.color.red[30]})`,
    `hsl(${tkns.color.yellow[20]})`,
    `hsl(${tkns.color.purple[20]})`
  ]

  const dynamicStyle: CSSProperties = {
    '--text-align': align,
    '--line-style': (depth && depth > colors.length) ? 'dotted' : 'solid',
    '--line-color': depth && colors[(depth - 1) % colors.length]
  }

  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.TableCell, className)}
      data-table-cell-collapsed={collapsed}
      data-table-cell-padding={padding}
      data-table-cell-is-expander={expander}
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
