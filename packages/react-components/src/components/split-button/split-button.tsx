import clsx from 'clsx'
import { forwardRef } from 'react'
import { Button, Popover, PopoverProps, Stack, Polymorphic } from '@/components'
import styles from './split-button.module.css'
import { Except } from 'type-fest'

export type SplitButtonProps = Pick<PopoverProps, 'placement' | 'offset'> & {
  /**
   * Set the label of the action associated to the dropdown.
   */
  label: string;
}

type PolymorphicSplitButton = Polymorphic.ForwardRefComponent<
  Polymorphic.IntrinsicElement<typeof Button>,
  Except<Polymorphic.OwnProps<typeof Button>, 'iconPosition' | 'iconColor' | 'pressed'> & SplitButtonProps
>;

export const SplitButton = forwardRef(({
  className,
  label,
  icon = 'chevron-down',
  kind,
  dimension,
  fullWidth,
  disabled,
  busy,
  children,
  placement,
  offset,
  onClick,
  ...otherProps
}, forwardedRef) => {
  const commonProps = {
    kind,
    dimension,
    disabled
  }

  return (
    <Stack
      className={clsx(styles.SplitButton, className)}
      direction="row"
      inline={!fullWidth}
    >
      <Button
        busy={busy}
        fullWidth={fullWidth}
        onClick={onClick}
        ref={forwardedRef}
        {...commonProps}
        {...otherProps}
      >
        {label}
      </Button>
      <Popover
        placement={placement}
        offset={offset}
        disabled={disabled}
        trigger={<Button icon={icon} {...commonProps} />}
      >
        {children}
      </Popover>
    </Stack>
  )
}) as PolymorphicSplitButton
