import clsx from 'clsx'
import { FC, Children, cloneElement, CSSProperties } from 'react'
import MasonryLayout from 'react-masonry-css'
import tkns from '@wonderflow/tokens/platforms/web/tokens.json'
import { TokensTypes } from '@wonderflow/tokens/platforms/web'
import styles from './masonry.module.css'

export type MasonryProps = PropsWithClass & {
  /**
   * Set the space between items. This is applied on both vertical
   * and horizontal axis.
   */
  gutter?: 0 | TokensTypes['space'];
  /**
   * Set the breakpoints for the masonry layout. You can pass a fixed number
   * or an object map.
   *
   * The object map is used to change the number of the columns based on
   * the specified breakpoint. When passing an object, you must specify the
   * default key, other breakpoints are optional.
   *
   * @example
   *{
   *  default: 6,
   *  extraLarge: 5,
   *  large: 4,
   *  medium: 3,
   *  small: 2,
   *  extraSmall: 1
   *}
   */
  columns?: number | {
    default: number,
    extraSmall?: number,
    small?: number,
    medium?: number,
    large?: number,
    extraLarge?: number
  };
}

export const Masonry: FC<MasonryProps> = ({
  className,
  children,
  columns = 3,
  gutter = 16,
  style,
  ...otherProps
}) => {
  const breakpoints = {
    extraSmall: 480,
    small: 768,
    medium: 960,
    large: 1280,
    extraLarge: 1600
  }

  const dynamicStyle: CSSProperties = {
    '--gutter': gutter && tkns.space[gutter]
  }

  const computedColumns = typeof columns === 'object' && Object.keys(columns).reduce((prev, current) => current !== 'default' && ({
    ...prev,
    default: columns.default,
    [breakpoints[current]]: columns[current]
  }), {})

  return (
    <MasonryLayout
      role="list"
      className={clsx(styles.Masonry, className)}
      columnClassName={styles.Column}
      breakpointCols={typeof columns === 'number' ? columns : computedColumns}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {Children.map(children, (child: any) => cloneElement(
        child,
        {
          role: 'listitem'
        }
      ))}
    </MasonryLayout>
  )
}
