import clsx from 'clsx';
import { forwardRef } from 'react';

import { Polymorphic } from '@/components';

import styles from './prose.module.css';

export type ProseProps = Record<string, unknown>

type PolymorphicProse = Polymorphic.ForwardRefComponent<'div'>;

export const Prose = forwardRef(({
  children,
  className,
  as: Wrapper = 'div',
  ...otherProps
}, forwardedRef) => (
  <Wrapper
    ref={forwardedRef}
    className={clsx(styles.Prose, className)}
    {...otherProps}
  >
    {children}
  </Wrapper>
)) as PolymorphicProse;
