import { Stack, Icon, Text, IconProps, TextProps } from '@/components'
import styles from './list.module.css'
import clsx from 'clsx'
import { forwardRef, PropsWithChildren } from 'react'
import { ListProps } from './list'

export type ListItemProps = PropsWithChildren<PropsWithClass> & Pick<ListProps, 'dimension' | 'hideMarker'> & {
  /**
   * Set the marker style. You can use any icon from the iconography as marker
   * by passing its name.
   */
  marker?: IconProps['source'];
  /**
   * Set the color of the marker.
   */
  markerColor?: string;
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(({
  className,
  hideMarker,
  marker = 'circle',
  markerColor,
  children,
  dimension = 'regular',
  ...otherProps
}, forwardedRef) => {
  const sizes = {
    small: {
      text: 16,
      icon: {
        size: 16,
        weight: 'solid'
      }
    },
    regular: {
      text: 18,
      icon: {
        size: 16,
        weight: 'outline'
      }
    },
    big: {
      text: 22,
      icon: {
        size: 24,
        weight: 'duotone'
      }
    }
  }

  return (
    <Stack
      className={clsx(styles.ListItem, className)}
      as="li"
      direction="row"
      hAlign="start"
      vAlign="start"
      fill={false}
      ref={forwardedRef}
      {...otherProps}
    >
      {!hideMarker && (
        <Icon
          source={marker}
          className={styles.Marker}
          fill={markerColor}
          data-list-default-marker={marker === 'circle'}
          weight={marker === 'circle' ? 'solid' : sizes[dimension].icon.weight as IconProps['weight']}
          dimension={marker !== 'circle' ? sizes[dimension].icon.size as IconProps['dimension'] : 16}
        />
      )}
      <Text as="span" size={sizes[dimension].text as TextProps['size']}>
        {children}
      </Text>
    </Stack>
  )
})
