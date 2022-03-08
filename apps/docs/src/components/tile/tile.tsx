import React, { forwardRef, ReactNode } from 'react'
import { Stack, Icon, Polymorphic, Card, Title, Text } from '@wonderflow/react-components'
import { IconNames } from '@wonderflow/icons'
import clsx from 'clsx'
import { Tile as TileClass, IconBullet, Title as TitleClass } from './tile.module.css'

type TileProps = {
  children: ReactNode;
  icon?: IconNames;
  iconColor?: 'gray' | 'cyan' | 'red' | 'purple' | 'blue' | 'yellow' | 'green';
  title: string;
  description?: string;
}

type PolymorphicTile = Polymorphic.ForwardRefComponent<
  Polymorphic.IntrinsicElement<typeof Stack>,
  Polymorphic.OwnProps<typeof Stack> & TileProps
>;

// eslint-disable-next-line react/display-name
export const Tile = forwardRef(({
  children,
  className,
  icon,
  title,
  iconColor = 'gray',
  description,
  ...props
}, forwardedRef) => {
  return (
    <Card
      ref={forwardedRef}
      className={clsx(TileClass, className)}
      padding={32}
      bordered
      radius={false}
      left={icon && (
        <span className={IconBullet} style={{ backgroundColor: `var(--highlight-${iconColor}-background)` }}>
          <Icon source={icon} weight="duotone" fill={`var(--highlight-${iconColor}-foreground)`} dimension={16} />
        </span>
      )}
      {...props}
    >
      <Stack rowGap={40}>
        <Title className={TitleClass} as="h3" responsive={false} level="5">{title}</Title>
        {description && <Text dimmed={6} responsive={false} size={16}>{description}</Text>}
      </Stack>
    </Card>
  )
}) as PolymorphicTile

Tile.displayName = 'Tile'
