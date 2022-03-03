import {
  ReactNode,
  useState,
  Children,
  cloneElement,
  useRef,
  forwardRef,
  isValidElement
} from 'react'
import { useKeyPress, useFocusWithin } from 'ahooks'
import styles from './dropdown.module.css'
import { useUIDSeed } from 'react-uid'
import { AutoPlacement, BasePlacement, VariationPlacement } from '@popperjs/core'
import { usePopperTooltip } from 'react-popper-tooltip'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'

export type DropdownProps = PropsWithClass & {
  /**
   * The content of the dropdown to display when the dropdown is open.
   */
  children: ReactNode;
  /**
   * The element to use as the trigger for the dropdown.
   */
  trigger: ReactNode;
  /**
   * The distance from the trigger to the dropdown.
   */
  offset?: number,
  /**
   * The placement of the dropdown. This is automatically handled based on
   * scroll and viewport edges. By default the dropdown is anchored at
   * the beginning of the trigger.
   *
   * The first key refers to the X axis, the second key refers to the Y axis.
   * Eg: `auto-start` means the dropdown will be placed automatically on left or right
   * based on the available space, and anchored at the top (start) of the trigger.
   */
  placement?: AutoPlacement | BasePlacement | VariationPlacement;
  /**
   * Enable or disable the itneraction on the trigger.
   */
  disabled?: boolean;
  /**
   * Calllback triggered when the dropdown state changes.
   * It returns the new `boolean` state.
   */
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

const DropdownAnimation = {
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

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(({
  children,
  trigger,
  offset = 8,
  placement = 'auto-start',
  disabled,
  className,
  onOpenChange,
  ...otherProps
}, forwardedRef) => {
  const renderedChildren = Children.toArray(children).filter(Boolean)
  const seedID = useUIDSeed()
  const dropdownRef = useRef<any>(forwardedRef)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const {
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible
  } = usePopperTooltip({
    delayShow: 0,
    delayHide: 0,
    trigger: !disabled ? ['click'] : null,
    visible: isOpen,
    closeOnTriggerHidden: true,
    onVisibleChange: state => {
      onOpenChange?.(state)
      setIsOpen(state)
    },
    placement: placement,
    offset: [0, offset],
    closeOnOutsideClick: true
  })

  const isFocusWithin = useFocusWithin(dropdownRef, {
    onBlur: (e) => {
      if (e.relatedTarget && visible) {
        setIsOpen(false)
      }
    }
  })

  useKeyPress('esc', () => setIsOpen(false))

  return (
    <div
      ref={dropdownRef}
      className={clsx(styles.Dropdown, className)}
      data-dropdown-has-focus={isFocusWithin}
    >
      {Children.map(trigger, (child) => isValidElement(child) && cloneElement(
        child,
        {
          ref: setTriggerRef,
          id: seedID('dropdown-trigger'),
          key: seedID('dropdown-trigger'),
          'aria-haspopup': 'true',
          'aria-controls': seedID('dropdown-menu'),
          'aria-expanded': isOpen,
          ...otherProps
        }
      ))}
      <AnimatePresence>
        {visible && (
          <div
            ref={setTooltipRef}
            role="tooltip"
            id={seedID('tooltip-content')}
            key={seedID('tooltip-content')}
            {...getTooltipProps({ className: styles.PopUp })}
          >
            <motion.div
              variants={DropdownAnimation}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >

              {Children.map(renderedChildren, (child) => isValidElement(child) && cloneElement(
                child,
                {
                  id: seedID('dropdown-menu'),
                  'aria-labelledby': seedID('dropdown-trigger')
                }
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
})

Dropdown.displayName = 'Dropdown'
