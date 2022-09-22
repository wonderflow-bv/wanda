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

import {
  forwardRef, PropsWithChildren, useCallback, useRef,
} from 'react';
import { Except } from 'type-fest';

import { Menu, MenuItemProps } from '@/components';

export type AutocompleteOptionProps = PropsWithChildren<PropsWithClass> & Except<
MenuItemProps,
'padding' | 'autoFocus' | 'description' | 'onClick'
> & {
  /**
   * Callback called when the option is clicked.
   * It passes the value and the inner text of the option as arguments.
   */
  onClick?: (value?: string, content?: string) => void;
  /**
   * Label of the option. This is the text that will be displayed in the option, which can be
   * different from the value.
   */
  children: string | string[];
}

export const AutocompleteOption = forwardRef<HTMLButtonElement, AutocompleteOptionProps>(({
  children,
  value,
  onClick,
  ...otherProps
}, forwardedRef) => {
  const contentRef = useRef<HTMLSpanElement>(null);
  const handleClick = useCallback(
    () => {
      onClick?.(value, contentRef?.current?.innerText);
    },
    [onClick, value],
  );

  return (
    <Menu.Item
      value={value}
      ref={forwardedRef}
      role="option"
      padding={false}
      onClick={handleClick}
      {...otherProps}
    >
      <span ref={contentRef}>{children}</span>
    </Menu.Item>
  );
});

AutocompleteOption.displayName = 'Autocomplete.Option';
