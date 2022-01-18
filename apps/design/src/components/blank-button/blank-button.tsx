import clsx from 'clsx'
import React, { ButtonHTMLAttributes } from 'react'

import { BlankButton as BlankButtonClass } from './blank-button.module.css'

type BlankButtonProps = {
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>

export const BlankButton = ({
  children,
  className,
  onClick,
  ...props
}: BlankButtonProps) => (
  <button onClick={onClick} type="button" className={clsx(BlankButtonClass, className)} {...props}>
    {children}
  </button>
)
