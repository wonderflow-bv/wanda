import { forwardRef, ReactNode } from 'react'
import styles from './snackbar.module.css'
import clsx from 'clsx'
import { Title, Stack, Icon, IconProps, Polymorphic, Button } from '@/components'

export type SnackbarProps = {
  /**
   * The message to display. Describes the action that the snackbar takes
   * or the feedback that the user has received.
   */
  children: ReactNode;
  /**
   * Set the icon to be displaye alongside the title.
   * This icon have to enforce the message in a not misleading way.
   */
  icon?: IconProps['source'];
  /**
   * Set the title of the snackbar. This must concisely describe the message.
   */
  title?: string;
  /**
   * Set the color and the sentiment of the snackbar.
   * This affects the the color of all the elements inside and should be defined
   * according to the message.
   */
  kind?: 'info' | 'warning' | 'neutral' | 'positive' | 'danger';
  /**
   * Define if the snackbar can be dismissed by user interaction.
   * If `true` a button will be displayed.
   */
  dismissable?: boolean;
  /**
   * Set the label of the dismiss button.
   */
  dismissLabel?: string;
  /**
   * Callback function to be called when the dismiss button is clicked.
   */
  onDismiss?(): void;
}

type PolymorphicSnackbar = Polymorphic.ForwardRefComponent<'output', SnackbarProps>;

export const Snackbar = forwardRef(({
  children,
  className,
  title,
  icon,
  kind = 'neutral',
  as: Wrapper = 'output',
  dismissable,
  dismissLabel = 'Dismiss',
  onDismiss,
  ...otherProps
}, forwardedRef) => {
  const defaultIcons: Record<string, IconProps['source']> = {
    info: 'circle-info',
    warning: 'triangle-exclamation',
    neutral: 'compass',
    positive: 'check',
    danger: 'circle-x'
  }

  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.Snackbar, className)}
      data-snackbar-kind={kind}
      role="status"
      {...otherProps}
    >
      <Stack verticalAlign="start" horizontalAlign="start" direction="row" columnGap={16} fill={false}>
        <Icon className={styles.Icon} weight="duotone" source={icon || defaultIcons[kind]} dimension={24} />
        <Stack rowGap={16}>
          <Stack rowGap={8}>
            {title && <Title level="5">{title}</Title>}
            <p>{children}</p>
          </Stack>
          {dismissable && (
            <Stack horizontalAlign="end">
              <Button onClick={onDismiss} className={styles.Action}>{dismissLabel}</Button>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Wrapper>
  )
}) as PolymorphicSnackbar
