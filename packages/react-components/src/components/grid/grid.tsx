import { CSSProperties, ReactNode, forwardRef } from 'react'
import clsx from 'clsx'
import tksn from '@wonderflow/tokens/platforms/web/tokens.json'
import { TokensTypes } from '@wonderflow/tokens/platforms/web'
import { GridItem, GridItemProps } from './item/grid-item'
import styles from './grid.module.css'

export type GridProps = PropsWithClass & {
  /**
   * The children to be rendered in the grid.
   * Even though this component doesn't block you to use any elements as children,
   * it's recommended to use only `<Grid.Item>` component to generate the grid items.
   */
  children: ReactNode;
  /**
   * Specify how many columns the grid should have.
   */
  columns?: number;
  /**
   * Specify how many rows the grid should have.
   */
  rows?: number;
  /**
   * Add a gap between rows.
   */
  rowGap?: 0 | TokensTypes['space'];
  /**
   * Add a gap between columns.
   */
  columnGap?: 0 | TokensTypes['space'];
  /**
   * Set the columns repeating behaviour.
   * This refers to the CSS function `repeat()`, which can use both `auto-fit`
   * and `auto-fill` parameters.
   *
   * Read more: https://developer.mozilla.org/en-US/docs/Web/CSS/repeat
   */
  filling?: 'fit' | 'fill' | false;
  /**
   * Set the minimum columns width
   */
  colMinWidth?: string;
  /**
   * Set the minimum rows height
   */
  rowMinHeight?: string;
}

type GridComponent = React.ForwardRefExoticComponent<GridProps> & {
  Item: React.ForwardRefExoticComponent<GridItemProps>;
}

export const Grid = forwardRef<HTMLUListElement, GridProps>(({
  className,
  children,
  columns,
  rows,
  rowGap = 8,
  columnGap = 8,
  style,
  filling = 'fill',
  colMinWidth = '10rem',
  rowMinHeight = '1fr',
  ...otherProps
}, forwardedRef) => {
  const computedStyle: CSSProperties = {
    '--rGap': rowGap && tksn.space[rowGap],
    '--cGap': columnGap && tksn.space[columnGap],
    '--columns': columns,
    '--column-min-w': colMinWidth,
    '--rows': rows,
    '--row-min-h': rowMinHeight
  }

  return (
    <ul
      className={clsx(styles.Grid, className)}
      style={{ ...computedStyle, ...style }}
      data-grid-filling-type={filling}
      ref={forwardedRef}
      {...otherProps}
    >
      {children}
    </ul>
  )
}) as GridComponent

Grid.displayName = 'Grid'
Grid.Item = GridItem
