/*
 * Copyright 2022 Wonderflow
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
import { forwardRef, Ref } from 'react';

import { Stack, Symbol, SymbolProps } from '@/components';

import * as styles from './chip.module.css';

export type ChipProps = {
  /**
   * Set the dimension of the component.
   */
  dimension?: 'small' | 'regular' | 'big';
  /**
   * Set a color from one of the provided values.
   */
  color?: 'gray' | 'cyan' | 'green' | 'purple' | 'yellow' | 'red' | 'blue' | 'magenta' | 'violet' | 'indigo' | 'mint' | 'dipsy' | 'salmon';
  /**
   * Make the chip dismissable. When `true` adds a close button on the side.
   */
  interactive?: boolean;
  /**
   * Callback function to be called when the dismiss button is pressed.
   */
  onDismissClick?: () => void;
}

export const Chip: FCChildrenClass<ChipProps> = forwardRef(({
  children,
  className,
  dimension = 'regular',
  color = 'gray',
  interactive,
  onDismissClick,
  ...otherProps
}, forwardedRef: Ref<HTMLSpanElement>) => {
  const properties = {
    small: {
      iconSize: 12,
      style: 'solid',
    },
    regular: {
      iconSize: 12,
      style: 'solid',
    },
    big: {
      iconSize: 16,
      style: 'outline',
    },
  };

  return (
    <Stack
      as="span"
      direction="row"
      columnGap={8}
      inline
      data-chip-color={color}
      data-chip-dimension={dimension}
      className={clsx(styles.Chip, className)}
      vAlign="center"
      ref={forwardedRef}
      {...otherProps}
    >
      <b>{children}</b>
      {interactive && (
        <button onClick={interactive && onDismissClick} className={styles.Action} type="button">
          <Symbol
            source="xmark"
            weight={properties[dimension].style as SymbolProps['weight']}
            dimension={properties[dimension].iconSize as SymbolProps['dimension']}
          />
        </button>
      )}
    </Stack>
  );
});

Chip.displayName = 'Chip';
