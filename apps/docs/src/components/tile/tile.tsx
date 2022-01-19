import React, { forwardRef, ReactNode } from 'react'
import { Stack, Icon, Polymorphic } from '@wonderflow/react-components'
import { IconNames } from '@wonderflow/icons'
import clsx from 'clsx'
import { Tile as TileClass, IconBullet } from './tile.module.css'

type TileProps = {
  children: ReactNode;
  icon?: IconNames;
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
  ...props
}, forwardedRef) => {
  return (
    <Stack ref={forwardedRef} className={clsx(TileClass, className)} {...props}>
      <Stack rowGap={32}>
        {children}
      </Stack>
      {icon && <Icon name={icon} dimension={24} className={IconBullet} />}
    </Stack>
  )
}) as PolymorphicTile

Tile.displayName = 'Tile'
