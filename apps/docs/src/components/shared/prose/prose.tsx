import { Polymorphic } from '@wonderflow/react-components';
import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './prose.module.css';

export type ProseProps = Record<string, unknown>

// eslint-disable-next-line
type PolymorphicProse = Polymorphic.ForwardRefComponent<'div', {}>;

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
