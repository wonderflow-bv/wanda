import clsx from 'clsx'
import { forwardRef, PropsWithChildren } from 'react'
import { Icon, IconProps, Stack } from '../'
import styles from './chip.module.css'

export type ChipProps = PropsWithChildren<PropsWithClass> & {
  /**
   * Set the dimension of the component.
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Set a color from one of the provided values.
   */
  color?: 'gray' | 'cyan' | 'green' | 'purple' | 'yellow' | 'red' | 'blue';
  /**
   * Make the chip dismissable. When `true` adds a close button on the side.
   */
  interactive?: boolean;
  /**
   * Callback function to be called when the dismiss button is pressed.
   */
  onDismissClick?(): void;
}

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(({
  children,
  className,
  dimension = 'regular',
  color = 'gray',
  interactive,
  onDismissClick,
  ...otherProps
}, forwardedRef) => {
  const properties = {
    small: {
      iconSize: 12
    },
    regular: {
      iconSize: 12
    },
    big: {
      iconSize: 16
    }
  }

  return (
    <Stack
      as="span"
      direction="row"
      columnGap={8}
      inline
      data-chip-color={color}
      data-chip-dimension={dimension}
      className={clsx(styles.Chip, className)}
      verticalAlign="center"
      ref={forwardedRef}
      {...otherProps}
    >
      <b>{children}</b>
      {interactive && (
        <button onClick={interactive && onDismissClick} className={styles.Action} type="button">
          <Icon source="xmark" dimension={properties[dimension].iconSize as IconProps['dimension']} />
        </button>
      )}
    </Stack>
  )
})

Chip.displayName = 'Chip'
