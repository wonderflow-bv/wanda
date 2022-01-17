import { CSSProperties, forwardRef, PropsWithChildren } from 'react'
import clsx from 'clsx'
import styles from './grid-item.module.css'

export type GridItemProps = PropsWithChildren<PropsWithClass> & {
  /**
   * Make the item span the entire row.
   */
  fullWidth?: boolean;
  /**
   * Set the explicit offsets (start/end) of the item across the grid columns.
   * This props refers to the CSS `grid-column` property.
   *
   * Read more: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
   */
  column?: string;
  /**
   * Set the explicit offsets (start/end) of the item across the grid rows.
   * This props refers to the CSS `grid-row` property.
   *
   * Read more: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row
   */
  row?: string;
}

export const GridItem = forwardRef<HTMLLIElement, GridItemProps>(({
  children,
  style,
  className,
  fullWidth = false,
  column,
  row,
  ...otherProps
}, forwardedRef) => {
  const dynamicStyle: CSSProperties = {
    '--column': column,
    '--row': row
  }

  return (
    <li
      ref={forwardedRef}
      className={clsx(styles.GridItem, className)}
      style={{ ...dynamicStyle, ...style }}
      data-grid-item-fullwidth={fullWidth}
      {...otherProps}
    >
      {children}
    </li>
  )
})

GridItem.displayName = 'Grid.Item'
