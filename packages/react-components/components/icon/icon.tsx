import { IconNames } from '@wonderflow/icons'
import {
  forwardRef,
  SVGAttributes
} from 'react'
import sprite from '@wonderflow/icons/sprite'
import { TokensTypes } from '@wonderflow/tokens/platforms/web/types'

export type IconProps = SVGAttributes<SVGElement | SVGSVGElement> & {
  /**
   * Set the icon name to display. Icon names are defined in
   * the `IconNames` enum and are part of Wanda's iconography system.
   *
   * Learn more: https://design.wonderflow.ai/design/iconography/
   */
  name: IconNames;
  /**
   * Set the size of the icon. To improve readability at any size, the style of the icon
   * is automatically defined based on the dimension.
   *
   * Icons sized 16pt or less are displayed with the solid style.
   * If the size is 24pt or larger, the icon is displayed with the outline style.
   */
  dimension?: TokensTypes['icon']['size'] | 32 | 40 | 48 | 56;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(({
  className,
  name,
  dimension = 16,
  fill,
  ...otherProps
}: IconProps, forwardedRef) => {
  const computedSize = dimension < 24 ? 16 : 24

  return (
    <svg
      aria-hidden="true"
      width={dimension}
      height={dimension}
      fill={fill}
      className={className}
      ref={forwardedRef}
      {...otherProps}
    >
      <use href={`${sprite}#${computedSize}/${name}`} />
    </svg>
  )
})

Icon.displayName = 'Icon'
