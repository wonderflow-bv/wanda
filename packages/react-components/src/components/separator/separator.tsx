import { forwardRef, HTMLAttributes } from 'react'
import clsx from 'clsx'
import styles from './separator.module.css'

export type SeparatorProps = HTMLAttributes<HTMLHRElement>

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(({
  className,
  ...otherProps
}, forwardedRef) => {
  return (
    <hr
      ref={forwardedRef}
      className={clsx(styles.Separator, className)}
      {...otherProps}
    />
  )
})

Separator.displayName = 'Separator'
