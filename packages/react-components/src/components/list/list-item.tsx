/*
 * Copyright 2022-2023 Wonderflow Design Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import clsx from 'clsx';
import { forwardRef, PropsWithChildren } from 'react';

import {
  Stack, Symbol, SymbolProps, Text, TextProps,
} from '@/components';

import { ListProps } from './list';
import * as styles from './list.module.css';

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
