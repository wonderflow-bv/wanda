/*
 * Copyright 2022 Wonderflow <authored by Wonderflow Design Team>
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
import { CSSProperties, forwardRef, PropsWithChildren } from 'react';

import * as styles from './grid-item.module.css';

export type GridItemProps = PropsWithChildren<PropsWithClass<{
  /**
   * Make the item span the entire row.
   */
  fullWidth?: boolean;
  /**
   * Set the explicit offsets (start/end) of the item across the grid columns.
   * This props refers to the CSS `grid-column` property.
   *
   * Read more: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
   */
  column?: string;
  /**
   * Set the explicit offsets (start/end) of the item across the grid rows.
   * This props refers to the CSS `grid-row` property.
   *
   * Read more: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row
   */
  row?: string;
}>>

export const GridItem = forwardRef<HTMLLIElement, GridItemProps>(({
  style,
  children,
  className,
  fullWidth = false,
  column,
  row,
  ...otherProps
}, forwardedRef) => {
  const dynamicStyle: CSSProperties = {
    '--column': column,
    '--row': row,
  };

  return (
    <li
      ref={forwardedRef}
      className={clsx(styles.GridItem, className)}
      style={{ ...dynamicStyle, ...style }}
      data-grid-item-fullwidth={fullWidth}
      {...otherProps}
    >
      {children}
    </li>
  );
});

GridItem.displayName = 'Grid.Item';
