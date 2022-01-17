import { Children, forwardRef, useMemo } from 'react'
import styles from './list.module.css'
import clsx from 'clsx'
import { IconNames } from '@wonderflow/icons'
import { Text, Stack, TextProps, Icon, IconProps, Polymorphic } from '../..'

export type ListProps = {
  /**
   * Set the dimension of the items in the list. This affects also the marker size.
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Set the marker style. You can use any icon from the iconography as marker
   * by passing its name.
   */
  marker?: IconNames;
  /**
   * Set the color of the marker.
   */
  markerColor?: string;
  /**
   * Set to show or hide the marker indicator beside each item in the list.
   */
  hideMarker?: boolean;
}

type PolymorphicList = Polymorphic.ForwardRefComponent<'ul', ListProps>;

export const List = forwardRef(({
  as: Wrapper = 'ul',
  children,
  marker = 'circle',
  dimension = 'regular',
  className,
  markerColor,
  hideMarker = false,
  ...otherProps
}, forwardedRef) => {
  const sizes = {
    small: {
      text: 16,
      icon: 16
    },
    regular: {
      text: 18,
      icon: 16
    },
    big: {
      text: 22,
      icon: 24
    }
  }

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
      {Children.map(children, (child: any) => (
        <Stack as="li" direction="row" horizontalAlign="start" verticalAlign="start" fill={false}>
          {(isUnordered && !hideMarker) && (
            <Icon
              name={marker}
              className={styles.Marker}
              fill={markerColor}
              data-list-default-marker={marker === 'circle'}
              dimension={marker !== 'circle' ? sizes[dimension].icon as IconProps['dimension'] : 16}
            />
          )}
          <Text as="span" size={sizes[dimension].text as TextProps['size']}>
            {child.props.children}
          </Text>
        </Stack>
      ))}
    </Wrapper>
  )
}) as PolymorphicList
