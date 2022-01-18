import { forwardRef } from 'react'
import { Polymorphic } from '../..'
import styles from './prose.module.css'
import clsx from 'clsx'

export type ProseProps = {}

type PolymorphicProse = Polymorphic.ForwardRefComponent<'div', ProseProps>;

export const Prose = forwardRef(({
  children,
  className,
  as: Wrapper = 'div',
  ...otherProps
}, forwardedRef) => {
  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.Prose, className)}
      {...otherProps}
    >
      {children}
    </Wrapper>
  )
}) as PolymorphicProse
