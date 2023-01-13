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
import {
  Children, cloneElement, forwardRef, isValidElement, ReactElement, useMemo,
} from 'react';

import { Polymorphic } from '@/components';

import * as styles from './list.module.css';
import { ListItem, ListItemProps } from './list-item';

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
  const isUnordered = useMemo(() => Wrapper === 'ul', [Wrapper]);

  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.List, className)}
      data-list-size={dimension}
      data-list-ordered={!isUnordered}
      data-list-no-marker={hideMarker}
      {...otherProps}
    >
      {Children.map(children, child => isValidElement(child) && cloneElement(
        child as ReactElement<ListItemProps>,
        {
          hideMarker: !isUnordered && !hideMarker,
          dimension,
        },
      ))}
    </Wrapper>
  );
}) as PolymorphicList;

List.Li = ListItem;
