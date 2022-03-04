import { forwardRef, ReactNode } from 'react'
import clsx from 'clsx'
import { useUIDSeed } from 'react-uid'
import { Text, TextProps, Stack, Icon, Polymorphic, IconProps } from '@/components'

import styles from './star-meter.module.css'

export type StarMeterProps = {
  /**
   * Set the value of the star meter.
   * This value must be between `0` and `starCount`.
   *
   * This data is used to calculate the number of filled stars
   * based on predefined thresholds of the fraction.
   *
   * @example
   * fraction < `0.25` = rounded to 0 (empty star)
   * fraction >= `0.75` = rounded to 1 (filled star)
   * fraction >= `0.25` and < 0.75 = rounded to 0.5 (half star)
   */
  value: number;
  /**
   * Set the number of stars to use as maximum.
   */
  starCount?: number;
  /**
   * Set a custom label instead of the current value.
   */
  label?: ReactNode;
  /**
   * Set the size of the star meter.
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Hide the label beside the stars
   */
  hideLabel?: boolean;
}

type PolymorphicStarMeter = Polymorphic.ForwardRefComponent<
  Polymorphic.IntrinsicElement<typeof Stack>,
  Polymorphic.OwnProps<typeof Stack> & StarMeterProps
>;

export const StarMeter = forwardRef(({
  className,
  value = 0,
  starCount = 5,
  label,
  dimension = 'regular',
  hideLabel = false,
  ...otherProps
}, forwardedRef) => {
  const seedID = useUIDSeed()

  const properties = {
    small: {
      labelSize: 14,
      iconSize: 12
    },
    regular: {
      labelSize: 16,
      iconSize: 16
    },
    big: {
      labelSize: 18,
      iconSize: 24
    }
  }

  const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)

  const roundValue = (value: number) => {
    const integer = parseInt(String(value), 10)
    const fraction = value - integer

    if (fraction >= 0.75) {
      return Math.ceil(value)
    }

    if (fraction < 0.25) {
      return Math.floor(value)
    }

    if (fraction >= 0.25 && fraction < 0.75) {
      return integer + 0.5
    }

    return 0
  }

  const starType = (maxStars: number, value: number) => {
    const roundedValue = roundValue(value)
    return new Array(maxStars).fill(0).map((_, index) => {
      const starIndex = index + 1
      let fillType = 'var(--star-dimmed-color)'

      if (roundedValue >= starIndex) {
        fillType = 'var(--star-color)'
      }

      if (roundedValue < starIndex && roundedValue > starIndex - 1) {
        fillType = 'url(#HalfStar)'
      }

      return <Icon source="star" weight="solid" className={styles.Icon} dimension={properties[dimension].iconSize as IconProps['dimension']} fill={fillType} key={starIndex} />
    })
  }

  return (
    <Stack
      inline
      direction="row"
      vAlign="center"
      columnGap={8}
      className={clsx(styles.StarMeter, className)}
      role="meter"
      fill={false}
      aria-valuenow={clamp(value, 0, starCount)}
      aria-valuemin={0}
      aria-valuemax={starCount}
      aria-labelledby={seedID('star-meter')}
      data-star-meter-dimension={dimension}
      ref={forwardedRef}
      {...otherProps}
    >
      <svg aria-hidden="true" className={styles.Gradient} width="100" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="HalfStar">
            <stop offset="0" style={{ stopColor: 'var(--star-color)' }} />
            <stop offset="50%" style={{ stopColor: 'var(--star-color)' }} />
            <stop offset="50.1%" style={{ stopColor: 'var(--star-dimmed-color)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--star-dimmed-color)' }} />
          </linearGradient>
        </defs>
      </svg>
      <Stack direction="row" columnGap={dimension === 'small' ? 2 : 4}>
        {starType(starCount, value)}
      </Stack>
      <Text dimmed={6} id={seedID('star-meter')} size={properties[dimension].labelSize as TextProps['size']} weight="bold">
        {!hideLabel && <>{label || value.toString()}</>}
      </Text>
    </Stack>
  )
}) as PolymorphicStarMeter
