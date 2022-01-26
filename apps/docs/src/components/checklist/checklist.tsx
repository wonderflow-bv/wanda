import React, { Children, cloneElement, ReactElement } from 'react'
import { Icon, IconProps } from '@wonderflow/react-components'

import { Checklist as ChecklistClass, Li, Bullet } from './checklist.module.css'
import clsx from 'clsx'

type ChecklistProps = PropsWithClass & {
  icon?: IconProps['source']
}
type ChecklistLiProps = ChecklistProps

export const Checklist: {
  List: React.FC<ChecklistProps>,
  Li: React.FC<ChecklistLiProps>
} = {
  List: ({
    children,
    icon = 'check',
    className,
    ...props
  }) => {
    return (
      <ul className={clsx(ChecklistClass, className)} {...props}>
        {Children.map(children, (child: ReactElement) => cloneElement(
          child,
          {
            icon
          }
        ))}
      </ul>
    )
  },
  Li: ({ children, className, icon, ...props }) => {
    return (
      <li className={clsx(Li, className)} {...props}>
        {icon && (
          <span className={Bullet}>
            <Icon source={icon} dimension={12} />
          </span>
        )}
        {children}
      </li>
    )
  }
}

Checklist.List.displayName = 'Checklist.List'
Checklist.Li.displayName = 'Checklist.Li'
