import { Children, cloneElement, forwardRef, isValidElement, useMemo } from 'react'
import styles from './list.module.css'
import clsx from 'clsx'
import { Polymorphic } from '@/components'
import { ListItem, ListItemProps } from './list-item'

export type ListProps = {
  /**
   * Set the dimension of the items in the list. This affects also the marker size.
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Set to show or hide the marker indicator beside each item in the list.
   */
  hideMarker?: boolean;
}

type PolymorphicList = Polymorphic.ForwardRefComponent<'ul', ListProps> & {
  Li: React.ForwardRefExoticComponent<ListItemProps>;
};

export const List = forwardRef(({
  as: Wrapper = 'ul',
  children,
  dimension = 'regular',
  className,
  hideMarker = false,
  ...otherProps
}, forwardedRef) => {
  const isUnordered = useMemo(() => Wrapper === 'ul', [Wrapper])

  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.List, className)}
      data-list-size={dimension}
      data-list-ordered={!isUnordered}
      data-list-no-marker={hideMarker}
      {...otherProps}
    >
      {Children.map(children, (child) => isValidElement(child) && cloneElement(
        child,
        {
          hideMarker: !isUnordered && !hideMarker,
          dimension
        }
      ))}
    </Wrapper>
  )
}) as PolymorphicList

List.Li = ListItem
