import { Menu, MenuItemProps } from '@/components'
import { PropsWithChildren, forwardRef, useCallback, useRef } from 'react'
import { Except } from 'type-fest'

export type AutocompleteOptionProps = PropsWithChildren<PropsWithClass> & Except<
  MenuItemProps,
  'padding' | 'autoFocus' | 'description' | 'onClick'
> & {
  /**
   * Callback called when the option is clicked.
   * It passes the value and the inner text of the option as arguments.
   */
  onClick?(value?: string, content?: string): void;
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
  const contentRef = useRef<HTMLSpanElement>(null)
  const handleClick = useCallback(
    () => {
      onClick && onClick(value, contentRef?.current?.innerText)
    },
    [onClick, value]
  )

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
  )
})

AutocompleteOption.displayName = 'Autocomplete.Option'
