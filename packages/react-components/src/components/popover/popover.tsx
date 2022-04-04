import {
  ReactNode,
  useState,
  Children,
  cloneElement,
  useRef,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo
} from 'react'
import { useKeyPress, useFocusWithin } from 'ahooks'
import styles from './popover.module.css'
import { useUIDSeed } from 'react-uid'
import { AutoPlacement, BasePlacement, VariationPlacement, Modifier } from '@popperjs/core'
import { usePopperTooltip } from 'react-popper-tooltip'
import { domMax, LazyMotion, m, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

export type PopoverProps = PropsWithClass & {
  /**
   * The content of the popover to display when the popover is open.
   */
  children: ReactNode;
  /**
   * The element to use as the trigger for the popover.
   */
  trigger: ReactNode;
  /**
   * The distance from the trigger to the popover.
   */
  offset?: number,
  /**
   * The placement of the popover. This is automatically handled based on
   * scroll and viewport edges. By default the popover is anchored at
   * the beginning of the trigger.
   *
   * The first key refers to the X axis, the second key refers to the Y axis.
   * Eg: `auto-start` means the popover will be placed automatically on left or right
   * based on the available space, and anchored at the top (start) of the trigger.
   */
  placement?: AutoPlacement | BasePlacement | VariationPlacement;
  /**
   * Enable or disable the itneraction on the trigger.
   */
  disabled?: boolean;
  /**
   * Callback triggered when the popover state changes.
   * It returns the new `boolean` state.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Programmatically open or close the popover. If set to `true`, the popover
   * will be open when rendered. This make the popover a controlled component.
   */
  open?: boolean;
  /**
   * Enable or disable the auto close of the popover when clicking outside of it.
   */
  closeOnOutsideClick?: boolean;
  /**
   * Set the popover element the same with of the trigger element.
   */
  matchTriggerWidth?: boolean;
}

const PopoverAnimation = {
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

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(({
  children,
  trigger,
  offset = 8,
  placement = 'auto-start',
  open,
  disabled,
  closeOnOutsideClick = true,
  className,
  matchTriggerWidth,
  onOpenChange,
  ...otherProps
}, forwardedRef) => {
  const seedID = useUIDSeed()
  const popoverRef = useRef<any>(forwardedRef)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const sameWidth = useMemo<Modifier<string, {}>>(() => ({
    name: 'sameWidth',
    enabled: true,
    phase: 'beforeWrite',
    requires: ['computeStyles'],
    fn: ({ state }) => {
      if (matchTriggerWidth) state.styles.popper.width = `${state.rects.reference.width}px`
    },
    effect: ({ state }) => {
      const referenceElement: Partial<HTMLElement> = state.elements.reference
      if (matchTriggerWidth) state.elements.popper.style.width = `${referenceElement.offsetWidth}px`
    }
  }), [matchTriggerWidth])

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
    closeOnOutsideClick,
    onVisibleChange: state => {
      onOpenChange?.(state)
      setIsOpen(state)
    }
  }, {
    placement,
    modifiers: [
      sameWidth,
      {
        name: 'offset',
        options: {
          offset: [0, offset]
        }
      }
    ]
  })

  const isFocusWithin = useFocusWithin(popoverRef, {
    onBlur: (e) => {
      if (e.relatedTarget && visible) {
        setIsOpen(false)
      }
    }
  })

  useKeyPress('esc', () => setIsOpen(false))

  useEffect(() => {
    open !== undefined && setIsOpen(open)
  }, [open])

  return (
    <div
      ref={popoverRef}
      className={clsx(styles.Popover, className)}
      data-popover-has-focus={isFocusWithin}
    >
      {Children.map(trigger, (child) => isValidElement(child) && cloneElement(
        child,
        {
          ref: setTriggerRef,
          id: seedID('popover-trigger'),
          key: seedID('popover-trigger'),
          'aria-haspopup': 'true',
          'aria-controls': seedID('popover-dialog'),
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
            <LazyMotion features={domMax}>
              <m.div
                variants={PopoverAnimation}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >

                {Children.map(children, (child) => isValidElement(child) && cloneElement(
                  child,
                  {
                    id: seedID('popover-dialog'),
                    'aria-labelledby': seedID('popover-trigger')
                  }
                ))}
              </m.div>
            </LazyMotion>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
})

Popover.displayName = 'Popover'
