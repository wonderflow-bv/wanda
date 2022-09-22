/*
 * Copyright 2022 Wonderflow <authored by Mattia Astorino>
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
  forwardRef, ReactNode, useCallback, useMemo, useRef,
} from 'react';
import { useFocusEffect, useRovingTabIndex } from 'react-roving-tabindex';

import {
  Polymorphic, Stack, Symbol, SymbolProps, Tooltip,
} from '@/components';

import * as styles from './menu-item.module.css';

export type MenuItemProps = {
  /**
   * Content to display in the menu item.
   */
  children: ReactNode;
  /**
   * Whether the menu item should have an icon
   */
  icon?: SymbolProps['source'];
  /**
   * Set the position of the icon. Used only when icon is defined.
   */
  iconPosition?: 'left' | 'right';
  /**
   * Set the size of the menu item.
   * Font size and icon style will be adjusted to match the size.
   */
  dimension?: 'small' | 'regular';
  /**
   * Callback function to be called when the menu item is pressed.
   */
  onClick?: (event: Event, value: string) => void;
  /**
   * Add an extra description to the menu item.
   * This uses the `<Tooltip>` component internally.
   */
  description?: ReactNode;
  /**
   * Set disabled state. The item is not interactive and grayed out.
   */
  disabled?: boolean;
  /**
   * Add or remove the padding from the menu item.
   * This space is used to keep the content aligned across items with or without icons.
   * We suggest to not remove the padding if you have items with icons in the same menu to
   * keep a good readability.
   *
   * Read more: https://design.wonderflow.ai/design/recipes/menu/#items-with-icons
   */
  padding?: boolean;
  /**
   * Set item to gain focus automatically when the menu is opened.
   * This property is commonly used on the first item in the menu.
   */
  autoFocus?: boolean;
  /**
   * Add an element to decorate the menu item. This is useful for adding extra elements
   * and informations to the menu item.
   *
   * @note Don't use interactive elements (link, buttons, etc..) as decoration
   * if `Menu.Item` is rendered as ´<button>´ (default).
   */
  decoration?: ReactNode;
  /**
   * Assign a string value to the menu option. This is returned when the menu item is clicked.
   */
  value: string;
}

type PolymorphicMenuItem = Polymorphic.ForwardRefComponent<'button', MenuItemProps>;

export const MenuItem = forwardRef(({
  className,
  children,
  onClick,
  icon,
  dimension = 'regular',
  as: Wrapper = 'button',
  iconPosition = 'left',
  description,
  padding = true,
  disabled = false,
  autoFocus,
  decoration,
  value,
  ...otherProps
}, forwardedRef) => {
  const itemRef = useRef<any>(forwardedRef);
  const [tabIndex, isFocused, handleKeyDown, handleClick] = useRovingTabIndex(itemRef, disabled);
  const isIconRight = iconPosition === 'right';

  useFocusEffect(isFocused, itemRef);

  const triggerClick = useCallback(
    (e) => {
      if (onClick) {
        handleClick();
        onClick(e, value);
      }
    },
    [handleClick, onClick, value],
  );

  const InnerContent = useMemo(() => (
    <Stack
      direction={isIconRight ? 'row-reverse' : 'row'}
      as="span"
      fill={false}
      className={styles.ItemContent}
      hAlign={isIconRight ? 'space-between' : 'start'}
      vAlign="center"
      columnGap={8}
      hPadding={16}
      vPadding={8}
      data-menu-item-icon-right={isIconRight}
      data-menu-item-has-icon={Boolean(icon)}
      data-menu-item-padding={padding}
      style={{ inlineSize: '100%' }}
    >
      {icon && (
        <Symbol
          className={styles.Icon}
          source={icon}
          dimension={dimension === 'small' ? 12 : 16}
        />
      )}
      <Stack className={styles.DecorationContent} columnGap={16} fill={false} direction="row" hAlign="space-between">
        {children}
        {decoration}
      </Stack>
    </Stack>
  ), [children, dimension, icon, isIconRight, decoration, padding]);

  return (
    <Stack as="li" role="none">
      <Wrapper
        autoFocus={autoFocus}
        ref={itemRef}
        role="menuitem"
        className={clsx(styles.MenuItem, className)}
        onClick={disabled ? undefined : triggerClick}
        onKeyDown={disabled ? undefined : handleKeyDown}
        tabIndex={tabIndex}
        aria-disabled={disabled}
        type={Wrapper === 'button' ? 'button' : undefined}
        data-menu-item-dimension={dimension}
        {...otherProps}
      >
        {description
          ? (
            <Tooltip
              fill
              open={isFocused}
              placement="right-start"
              interactive
              trigger={InnerContent}
            >
              {description}
            </Tooltip>
          )
          : InnerContent
      }
      </Wrapper>
    </Stack>
  );
}) as PolymorphicMenuItem;

MenuItem.displayName = 'Menu.Item';
