import React, { CSSProperties } from 'react'
import clsx from 'clsx'
import { Stack, StackProps } from '@wonderflow/react-components'

import { LiveArea as LiveAreaClass } from './live-area.module.css'

export type LiveAreaProps = PropsWithClass & StackProps & {
  minHeight?: string;
  maxHeight?: string;
}

export const LiveArea: React.FC<LiveAreaProps> = ({
  children,
  className,
  minHeight = '200px',
  maxHeight,
  style,
  direction = 'row',
  ...props
}) => {
  const dynamicStyle: CSSProperties = {
    '--minHeight': minHeight,
    '--maxHeight': maxHeight
  }

  return (
    <Stack
      className={clsx(LiveAreaClass, className)}
      wrap
      fill={false}
      hAlign="center"
      vAlign="center"
      direction={direction}
      columnGap={16}
      rowGap={16}
      style={{ ...dynamicStyle, ...style }}
      {...props}
    >
      {children}
    </Stack>
  )
}
