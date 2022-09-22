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

import { TokensTypes } from '@wonderflow/tokens/platforms/web';
import tkns from '@wonderflow/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import {
  Children, cloneElement, CSSProperties, isValidElement, ReactElement,
} from 'react';
import MasonryLayout from 'react-masonry-css';

import * as styles from './masonry.module.css';

type Columns = {
  default: number;
  extraSmall?: number;
  small?: number;
  medium?: number;
  large?: number;
  extraLarge?: number;
}

export type MasonryProps = {
  /**
   * Set the space between items. This is applied on both vertical
   * and horizontal axis.
   */
  gutter?: 0 | TokensTypes['space'];
  /**
   * Set the breakpoints for the masonry layout. You can pass a fixed number
   * or an object map.
   *
   * The object map is used to change the number of the columns based on
   * the specified breakpoint. When passing an object, you must specify the
   * default key, other breakpoints are optional.
   *
   * @example
   *{
   *  default: 6,
   *  extraLarge: 5,
   *  large: 4,
   *  medium: 3,
   *  small: 2,
   *  extraSmall: 1
   *}
   */
  columns?: number | Columns;
}

export const Masonry: FCChildrenClass<MasonryProps> = ({
  className,
  children,
  columns = 3,
  gutter = 16,
  style,
  ...otherProps
}) => {
  const breakpoints: Record<string, number> = {
    'extra-small': 480,
    small: 768,
    medium: 960,
    large: 1280,
    'extra-large': 1600,
  };

  const dynamicStyle: CSSProperties = {
    '--gutter': gutter && tkns.space[gutter],
  };

  const computedColumns = typeof columns === 'object' && Object.keys(columns).reduce(
    (prev, current) => current !== 'default' && ({
      ...prev,
      default: columns.default,
      [breakpoints[current]]: columns[current as keyof Columns],
    }), {},
  );

  return (
    <MasonryLayout
      role="list"
      className={clsx(styles.Masonry, className)}
      columnClassName={styles.Column}
      breakpointCols={typeof columns === 'number' ? columns : computedColumns}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {Children.map(children, child => isValidElement(child) && cloneElement(
        child as ReactElement,
        {
          role: 'listitem',
        },
      ))}
    </MasonryLayout>
  );
};
