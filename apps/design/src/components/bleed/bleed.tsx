import clsx from 'clsx'
import React, { CSSProperties, HTMLAttributes } from 'react'
import { Bleed as BleedClass } from './bleed.module.css'

type BleedProps = {
  maxWidth?: string;
  offset?: string;
} & HTMLAttributes<HTMLOrSVGElement>

export const Bleed: React.FC<BleedProps> = ({
  children,
  maxWidth = '85ch',
  offset,
  style,
  className,
  ...props
}) => {
  const dynamicStyle: CSSProperties = {
    '--max-w': maxWidth,
    '--offset': offset
  }

  return (
    <div style={{ ...dynamicStyle, ...style }} className={clsx(BleedClass, className)} {...props}>
      {children}
    </div>
  )
}
