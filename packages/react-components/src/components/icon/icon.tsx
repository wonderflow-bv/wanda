import { IconNames } from '@wonderflow/icons'
import {
  Children,
  cloneElement,
  forwardRef,
  ReactElement,
  SVGAttributes,
  useMemo
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
   * Available icons: https://design.wonderflow.ai/design/iconography/
   */
  source: IconNames | ReactElement<HTMLOrSVGElement>;
  /**
   * Set the size of the icon. To improve readability at any size, the style of the icon
   * is automatically defined based on the dimension.
   */
  dimension?: TokensTypes['icon']['size'];
  /**
   * Set the weight of the icon.
   * The default weight is `solid` and outline or duotone icons are available
   * only for icons sized 24pt or larger.
  */
  weight?: 'solid' | 'outline' | 'duotone';
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(({
  className,
  source,
  dimension = 16,
  weight = 'outline',
  fill,
  ...otherProps
}: IconProps, forwardedRef) => {
  const computedStyle = useMemo(() => dimension < 16 ? 'solid' : weight, [weight, dimension])

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
        <use href={`${sprite}#${computedStyle}/${source}`} />
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
