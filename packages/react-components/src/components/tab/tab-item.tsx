import {
  useCallback,
  useRef,
  ButtonHTMLAttributes,
  forwardRef
} from 'react'
import { useRovingTabIndex, useFocusEffect } from 'react-roving-tabindex'
import clsx from 'clsx'
import { Stack, Icon, IconProps } from '@/components'
import { useTabState } from './primitive-tab'

import styles from './tab.module.css'

/**
 * Tab.Item
 * Public api
 */
export type TabItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * An optional icon to show beside the tab label.
   */
  icon?: IconProps['source'];
}

/**
 * Tab.Item
 * Component
 */
export const TabItem = forwardRef<HTMLButtonElement, TabItemProps>(({
  children,
  className,
  icon,
  ...otherProps
}, forwardedRef) => {
  const { onClick, isActive } = useTabState(children)
  const internalRef = useRef<any>(forwardedRef)
  const [, focused, handleKeyDown, handleClick] = useRovingTabIndex(internalRef, false)

  useFocusEffect(focused, internalRef)

  const fireClick = useCallback(
    () => {
      onClick()
      handleClick()
    },
    [handleClick, onClick]
  )

  return (
    <Stack
      as="button"
      direction="row"
      vAlign="center"
      hAlign="start"
      fill={false}
      columnGap={8}
      role="tab"
      ref={internalRef}
      className={clsx(styles.TabItem, className)}
      aria-selected={isActive}
      onClick={fireClick}
      onKeyDown={handleKeyDown}
      onFocus={fireClick}
      type="button"
      tabIndex={isActive ? 0 : -1}
      {...otherProps}
    >
      {icon && <Icon source={icon} dimension={16} />}
      {children}
    </Stack>
  )
})

TabItem.displayName = 'Tab.Item'
