import { forwardRef } from 'react';

import { MenuItem, MenuItemProps, Polymorphic } from '@/components';

export type MenuItemCheckboxProps = MenuItemProps & {
  /**
   * Set the default checked state of the checkbox item
   */
  checked?: boolean;
}

type MenuItemCheckboxComponent = Polymorphic.ForwardRefComponent<
Polymorphic.IntrinsicElement<typeof MenuItem>,
Polymorphic.OwnProps<typeof MenuItem> & MenuItemCheckboxProps
>;

export const MenuItemCheckbox = forwardRef(({
  children,
  checked,
  ...otherProps
}, forwardedRef) => (
  <MenuItem
    role="menuitemcheckbox"
    aria-checked={checked}
    ref={forwardedRef}
    {...otherProps}
  >
    {children}
  </MenuItem>
)) as MenuItemCheckboxComponent;

MenuItemCheckbox.displayName = 'Menu.ItemCheckbox';
