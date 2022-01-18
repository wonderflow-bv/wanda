import { forwardRef, PropsWithChildren, ReactNode } from 'react'
import { IconNames } from '@wonderflow/icons'
import { Stack, StackProps, Icon, Title, Text } from '../..'
import styles from './info-state.module.css'

export type InfoStateProps = PropsWithChildren<PropsWithClass> & {
  /**
   * Set the main tagline of the info state. This should be catchy and short
   * as much as possible.
   */
  title: ReactNode
  /**
   * The icon to display. This is used to enforce the message of the info state.
   * This is not displayed if `image` is set.
   */
  icon?: IconNames
  /**
   * Set the icon color. Please use the correct color based on the type of the message.
   * Eg. Don't use `green` for negative informations.
   */
  iconColor?: 'gray' | 'cyan' | 'green' | 'purple' | 'yellow' | 'red' | 'blue'
  /**
   * An image may be used instead of an icon. The image is centered and scaled.
   */
  image?: string
  /**
   * Set the direction of the content (column or row).
   */
  direction?: StackProps['direction'];
  /**
   * Pass the suplementary actions to the info state. Even if you can pass
   * as many elements as you want, we suggest to add no more than two actions.
   */
  actions?: ReactNode;
}

export const InfoState = forwardRef<HTMLDivElement, InfoStateProps>(({
  className,
  children,
  title,
  icon,
  image,
  direction = 'column',
  iconColor = 'blue',
  actions,
  ...otherProps
}, forwardedRef) => {
  const isHorizontal = direction === 'row'

  return (
    <Stack
      ref={forwardedRef}
      direction={direction}
      rowGap={24}
      columnGap={32}
      className={className}
      horizontalAlign={isHorizontal ? 'start' : 'center'}
      verticalAlign={(isHorizontal && image) ? 'center' : 'start'}
      fill={false}
      wrap={!!image}
      {...otherProps}
    >
      {(!image && icon) && (
        <span data-info-state-icon-color={iconColor} className={styles.IconWrapper}>
          <Icon name={icon} dimension={48} />
        </span>
      )}

      {(image && !icon) && <img className={styles.Image} alt="" width="400" src={image} loading="lazy" decoding="async" />}

      <Stack
        rowGap={16}
        horizontalAlign={isHorizontal ? 'start' : 'center'}
        verticalAlign="center"
        fill={false}
      >
        <Title maxWidth="20ch" textAlign={isHorizontal ? 'start' : 'center'} level="4">{title}</Title>
        <Text maxWidth="60ch" dimmed={6} textAlign={isHorizontal ? 'start' : 'center'}>{children}</Text>
        {actions && (
          <Stack verticalPadding={16} inline direction="row" columnGap={16} rowGap={16} wrap>
            {actions}
          </Stack>
        )}
      </Stack>
    </Stack>
  )
})

InfoState.displayName = 'InfoState'
