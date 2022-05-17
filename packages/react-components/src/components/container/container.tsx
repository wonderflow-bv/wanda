import clsx from 'clsx';
import { forwardRef } from 'react';

import { Polymorphic } from '@/components';

import styles from './container.module.css';

export type ContainerProps = {
  /**
   * Set the horizontal max-width of the container.
   */
  dimension?: 'full' | 'small' | 'medium' | 'large';
  /**
   * Set or remove the container's predefined horizontal padding.
   */
  padding?: boolean;
}

type PolymorphicContainer = Polymorphic.ForwardRefComponent<'div', ContainerProps>;

export const Container = forwardRef(({
  children,
  className,
  dimension = 'full',
  padding = true,
  as: Wrapper = 'div',
  ...otherProps
}, forwardedRef) => (
  <Wrapper
    ref={forwardedRef}
    className={clsx(styles.Container, className)}
    data-container-dimension={dimension}
    data-container-padding={padding}
    {...otherProps}
  >
    {children}
  </Wrapper>
)) as PolymorphicContainer;
