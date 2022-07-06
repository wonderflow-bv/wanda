
import clsx from 'clsx';
import {
  CSSProperties, forwardRef, ForwardRefExoticComponent, HTMLAttributes, ReactNode,
} from 'react';
import { RovingTabIndexProvider } from 'react-roving-tabindex';

import { Elevator, Polymorphic, Stack } from '@/components';

import styles from './menu.module.css';
import { MenuItem, MenuItemProps } from './menu-item/menu-item';
import { MenuItemCheckbox, MenuItemCheckboxProps } from './menu-item/menu-item-checkbox';
import { MenuSeparator } from './menu-separator/menu-separator';

export type MenuProps = HTMLAttributes<HTMLUListElement> & {
  /**
   * The items of the menu.
   */
  children: ReactNode;
  /**
   * Set a maximum height of the menu after which it will scroll.
   */
  maxHeight?: string;
}

type MenuComponent = ForwardRefExoticComponent<MenuProps> & {
  Item: Polymorphic.ForwardRefComponent<
  Polymorphic.IntrinsicElement<typeof MenuItem>,
  Polymorphic.OwnProps<typeof MenuItem> & MenuItemProps
  >;
  ItemCheckbox: Polymorphic.ForwardRefComponent<
  Polymorphic.IntrinsicElement<typeof MenuItemCheckbox>,
  Polymorphic.OwnProps<typeof MenuItemCheckbox> & MenuItemCheckboxProps
  >;
  Separator: typeof MenuSeparator;
}

export const Menu = forwardRef<HTMLUListElement, MenuProps>(({
  className,
  children,
  maxHeight,
  style,
  ...otherProps
}, forwardedRef) => {
  const computedStyle: CSSProperties = {
    '--max-height': maxHeight,
  };

  return (
    <Elevator resting={2}>
      <Stack
        as="ul"
        ref={forwardedRef}
        className={clsx(styles.Menu, className)}
        style={{ ...computedStyle, ...style }}
        data-menu-should-scroll={Boolean(maxHeight)}
        vPadding={8}
        role="menu"
        {...otherProps}
      >
        <RovingTabIndexProvider options={{ direction: 'vertical', loopAround: true }}>
          {children}
        </RovingTabIndexProvider>
      </Stack>
    </Elevator>
  );
}) as MenuComponent;

Menu.displayName = 'Menu';

Menu.Item = MenuItem;
Menu.ItemCheckbox = MenuItemCheckbox;
Menu.Separator = MenuSeparator;
