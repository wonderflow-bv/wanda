import { IconNames } from '@wonderflow/icons'
import {
  Children,
  cloneElement,
  forwardRef,
  ReactElement,
  SVGAttributes
} from 'react'
import sprite from '@wonderflow/icons/sprite'
import { TokensTypes } from '@wonderflow/tokens/platforms/web'
import clsx from 'clsx'
import styles from './icon.module.css'

export type IconProps = SVGAttributes<SVGElement | SVGSVGElement> & {
  /**
   * Set the icon name to display. Icon names are defined in
   * the `IconNames` enum and are part of Wanda's iconography system.
   *
   * Learn more: https://design.wonderflow.ai/design/iconography/
   */
   source: IconNames | ReactElement<HTMLOrSVGElement>;
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
  source,
  dimension = 16,
  fill,
  ...otherProps
}: IconProps, forwardedRef) => {
  const computedSize = dimension < 24 ? 16 : 24

  return (typeof source === 'string')
    ? (
      <svg
        aria-hidden="true"
        width={dimension}
        height={dimension}
        fill={fill}
        className={clsx(styles.Icon, className)}
        ref={forwardedRef}
        {...otherProps}
      >
        <use href={`${sprite}#${computedSize}/${source}`} />
      </svg>
      )
    : (
      <>
        {Children.map(source, (child: ReactElement) => cloneElement(
          child,
          {
            className,
            'aria-hidden': 'true',
            width: dimension,
            height: dimension
          }
        ))}
      </>
      )
})

Icon.displayName = 'Icon'
