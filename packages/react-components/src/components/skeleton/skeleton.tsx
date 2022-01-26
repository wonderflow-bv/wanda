import { TokensTypes } from '@wonderflow/tokens/platforms/web'
import clsx from 'clsx'
import tkns from '@wonderflow/tokens/platforms/web/tokens.json'
import { CSSProperties, Fragment, useCallback } from 'react'
import { useUIDSeed } from 'react-uid'
import styles from './skeleton.module.css'

export type SkeletonProps = PropsWithClass & {
  /**
   * Set the edge radius of each skeleton block.
   * This value must be one of the available `radius` tokens
   */
  borderRadius?: TokensTypes['radius'],
  /**
   * Set the block to be a circle, ignoring the `borderRadius` property.
   */
  circle?: boolean,
  /**
   * Set how many skeleton blocks to display.
   */
  count?: number,
  /**
   * Set the width of each skeleton block.
   */
  width?: string | number,
  /**
   * Set the height of each skeleton block.
   */
  height?: string | number,
  /**
   * Renders every block on their own line or in a single line.
   *
   * Note: By default, if a width is not specified, every items will fill the available space
   */
  inline?: boolean,
  /**
   * Enable the shim animation and the announcement of the loading state.
   */
  enableAnimation?: boolean,
}

export const Skeleton = ({
  className,
  borderRadius = 4,
  style,
  width,
  height,
  count = 1,
  enableAnimation = true,
  inline,
  circle,
  ...otherProps
}: SkeletonProps) => {
  const uid = useUIDSeed()
  const computedWidth = typeof width === 'number' ? `${width}px` : width
  const computedHeight = typeof height === 'number' ? `${height}px` : height

  const SkeletonItem = useCallback(() => {
    const dynamicStyle: CSSProperties = {
      '--radius': borderRadius && tkns.radius[borderRadius],
      '--width': width && computedWidth,
      '--height': height && computedHeight
    }

    return (
      <span
        className={styles.SkeletonItem}
        data-skeleton-circle={circle}
        data-skeleton-animated={enableAnimation}
        style={{ ...dynamicStyle, ...style }}
      >
        &zwnj;
      </span>
    )
  }, [
    borderRadius, width, computedWidth, height,
    computedHeight, circle, style, enableAnimation
  ])

  return (
    <span
      className={clsx(styles.Skeleton, className)}
      aria-live="polite"
      aria-busy={enableAnimation}
      {...otherProps}
    >
      {
        Array.from({ length: count }).map((_, i) => {
          return inline
            ? <SkeletonItem key={uid(i)} />
            : (
              <Fragment key={uid(i)}>
                <SkeletonItem />
                <br />
              </Fragment>
              )
        })}
    </span>
  )
}
