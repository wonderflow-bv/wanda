import { TokensTypes } from '@wonderflow/tokens/platforms/web';
import tkns from '@wonderflow/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { CSSProperties, forwardRef, ReactNode } from 'react';

import * as styles from './grid.module.css';
import { GridItem, GridItemProps } from './item/grid-item';

export type GridProps = {
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
  rowGap?: TokensTypes['space'];
  /**
   * Add a gap between columns.
   */
  columnGap?: TokensTypes['space'];
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

export const Grid = forwardRef<HTMLUListElement, PropsWithClass<GridProps>>(({
  className,
  children,
  columns,
  rows,
  rowGap,
  columnGap,
  style,
  filling = 'fill',
  colMinWidth = '10rem',
  rowMinHeight = '1fr',
  ...otherProps
}, forwardedRef) => {
  const computedStyle: CSSProperties = {
    '--row-gap': rowGap ? tkns.space[rowGap] : 0,
    '--column-gap': columnGap ? tkns.space[columnGap] : 0,
    '--columns': columns,
    '--column-min-w': colMinWidth,
    '--rows': rows,
    '--row-min-h': rowMinHeight,
  };

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
  );
}) as GridComponent;

Grid.displayName = 'Grid';
Grid.Item = GridItem;
