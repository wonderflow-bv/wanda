import Skeleton, { SkeletonProps } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { TokensTypes } from '@wonderflow/tokens/platforms/web'

export type SkeletonBlockProps = SkeletonProps & {
  /**
   * Set the edge radius of each skeleton block.
   * This value must be one of the available `radius` tokens
   */
  borderRadius?: TokensTypes['radius']
}

export const SkeletonBlock = ({
  className,
  borderRadius = 4,
  ...otherProps
}: SkeletonBlockProps) => {
  return (
    <Skeleton
      className={className}
      borderRadius={borderRadius}
      baseColor="var(--dimmed-1)"
      highlightColor="var(--dimmed-0)"
      {...otherProps}
    />
  )
}
