import clsx from 'clsx';
import { forwardRef, PropsWithChildren } from 'react';

import {
  Stack, Symbol, SymbolProps, Text, TextProps,
} from '@/components';

import { ListProps } from './list';
import styles from './list.module.css';

export type ListItemProps = PropsWithChildren<PropsWithClass> & Pick<ListProps, 'dimension' | 'hideMarker'> & {
  /**
   * Set the marker style. You can use any icon from the symbols as marker
   * by passing its name.
   */
  marker?: SymbolProps['source'];
  /**
   * Set the color of the marker.
   */
  markerColor?: string;
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(({
  className,
  hideMarker,
  marker = 'bullet',
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
        weight: 'solid',
      },
    },
    regular: {
      text: 18,
      icon: {
        size: 16,
        weight: 'solid',
      },
    },
    big: {
      text: 22,
      icon: {
        size: 18,
        weight: 'solid',
      },
    },
  };

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
        <Symbol
          source={marker}
          className={styles.Marker}
          fill={markerColor}
          data-list-default-marker={marker === 'bullet'}
          weight={marker === 'bullet' ? 'solid' : sizes[dimension].icon.weight as SymbolProps['weight']}
          dimension={marker !== 'bullet' ? sizes[dimension].icon.size as SymbolProps['dimension'] : 16}
        />
      )}
      <Text as="span" size={sizes[dimension].text as TextProps['size']}>
        {children}
      </Text>
    </Stack>
  );
});
