import { domMax, LazyMotion, m, AnimatePresence } from 'framer-motion'
import { AutocompleteOption, AutocompleteOptionProps } from './autocomplete-option'
import {
  Children, ForwardRefExoticComponent,
  cloneElement, forwardRef, useCallback, useMemo, useRef,
  useState, useEffect, ReactNode, isValidElement
} from 'react'
import { useDebounce, useFocusWithin, useKeyPress, useSize } from 'ahooks'
import { Text, Menu, Textfield, TextfieldProps } from '@/components'
import styles from './autocomplete.module.css'
import { usePopperTooltip } from 'react-popper-tooltip'
import { useUIDSeed } from 'react-uid'
import { MenuProps } from '../menu'

export type AutocompleteProps = TextfieldProps & {
  /**
   * The callback called when an option is picked from the list
   */
  onChange?(value?: string): void;
  /**
   * Set the maximum height of the options list after which
   * it will scroll.
   */
  maxHeight?: MenuProps['maxHeight'];
  /**
   * Custom empty message to display when there are no options or
   * when the value does not match any of the options.
   */
  emptyMessage?: ReactNode;
};

type AutocompleteComponent = ForwardRefExoticComponent<AutocompleteProps> & {
  Option: ForwardRefExoticComponent<AutocompleteOptionProps>;
}

const AutocompleteAnimation = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0, 0, 0.34, 1],
      duration: 0.1
    }
  },
  hidden: {
    y: -5,
    opacity: 0,
    transition: {
      ease: [0.3, 0.07, 1, 1],
      duration: 0.1
    }
  }
}

export const Autocomplete = forwardRef<HTMLDivElement, AutocompleteProps>(({
  children,
  onChange,
  disabled,
  readOnly,
  value,
  maxHeight = '200px',
  emptyMessage = 'No results found',
  ...otherProps
}, forwardedRef) => {
  const seedID = useUIDSeed()
  const autocompleteRef = useRef<any>(forwardedRef)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [content, setContent] = useState<AutocompleteOptionProps['value']>(value ? String(value) : '')
  const isInteractive = useMemo(() => !disabled && !readOnly, [disabled, readOnly])

  const debouncedFieldContent = useDebounce(
    content,
    { wait: 100 }
  )

  const filteredOptions = useMemo(
    () => {
      const items = Children.toArray(children)
      return debouncedFieldContent
        ? items.filter(
          (o: any) => {
            const stringToMatch = typeof o.props.children === 'string' ? o.props.children : o.props.children.join('')
            return stringToMatch?.toLowerCase().includes(debouncedFieldContent.toLowerCase())
          }
        )
        : items
    },
    [debouncedFieldContent, children]
  )

  const isFocusWithin = useFocusWithin(autocompleteRef, {
    onChange: (isFocusWithin) => {
      isFocusWithin ? setIsOpen(true) : setIsOpen(false)
    }
  })

  useKeyPress('esc', () => setIsOpen(false))

  const {
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    triggerRef,
    visible
  } = usePopperTooltip({
    delayShow: 0,
    delayHide: 0,
    trigger: null,
    visible: isInteractive ? isOpen : false,
    closeOnTriggerHidden: true,
    placement: 'bottom-start',
    offset: [0, 8]
  })

  const triggerSize = useSize(triggerRef)

  const handleOptionClick = useCallback(
    (optionValue, optionContent) => {
      setContent(optionContent)
      setIsOpen(false)
      onChange && onChange(optionValue)
    },
    [onChange]
  )

  const handleFilter = useCallback(
    ({ currentTarget }) => {
      setContent(currentTarget.value)
    },
    []
  )

  useEffect(() => {
    value && setContent(String(value))
  }, [value])

  return (
    <div
      ref={autocompleteRef}
      className={styles.Autocomplete}
      data-focus-within={isFocusWithin}
    >
      <Textfield
        ref={setTriggerRef}
        id={seedID('autocomplete-trigger')}
        key={seedID('autocomplete-trigger')}
        aria-haspopup="true"
        aria-controls={seedID('autocomplete-menu')}
        aria-expanded={isOpen}
        onChange={handleFilter}
        value={content}
        autoComplete="off"
        disabled={disabled}
        readOnly={readOnly}
        {...otherProps}
      />
      <AnimatePresence>
        {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: styles.PopUp, style: { minInlineSize: triggerSize ? (triggerSize.width + 2) : 'auto' } })}
        >
          <LazyMotion features={domMax} strict>
            <m.div
              variants={AutocompleteAnimation}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Menu
                role="listbox"
                id={seedID('autocomplete-menu')}
                className={styles.OptionsList}
                maxHeight={maxHeight}
                aria-labelledby={seedID('autocomplete-trigger')}
              >
                {filteredOptions.length === 0
                  ? <Text as="div" textAlign="center" dimmed={5}>{emptyMessage}</Text>
                  : Children.map(filteredOptions, (child) => isValidElement(child) && cloneElement(
                    child,
                    {
                      onClick: handleOptionClick
                    }
                  ))
              }
              </Menu>
            </m.div>
          </LazyMotion>
        </div>
        )}
      </AnimatePresence>
    </div>
  )
}) as AutocompleteComponent

Autocomplete.Option = AutocompleteOption
Autocomplete.displayName = 'Autocomplete'
