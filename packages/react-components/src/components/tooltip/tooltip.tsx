import { FC, Children, cloneElement, CSSProperties, ReactNode, useState, useRef, isValidElement } from 'react'
import { useUIDSeed } from 'react-uid'
import { useKeyPress, useFocusWithin } from 'ahooks'
import { Elevator } from '@/components'
import styles from './tooltip.module.css'
import { AutoPlacement, BasePlacement, VariationPlacement } from '@popperjs/core/lib'
import { usePopperTooltip } from 'react-popper-tooltip'

export type TooltipProps = PropsWithClass & {
  /**
   * Pass the content of the tooltip. It can be any valid React node.
   */
  children: ReactNode;
  /**
   * Set the element that will be used as the trigger of the tooltip.
   */
  trigger: ReactNode;
  /**
   * The placement of the tooltip. This is automatically handled based on
   * scroll and viewport edges.
   *
   * The first key refers to the X axis, the second key refers to the Y axis.
   * Eg: `auto-start` means the tooltip will be placed automatically on left or right
   * based on the available space, and anchored at the top (start) of the trigger.
   */
  placement?: AutoPlacement | BasePlacement | VariationPlacement;
  /**
   * Set if the tooltip should be shown or hidden.
   */
  open?: boolean;
  /**
   * Define a delay time in milliseconds before the tooltip is shown.
   */
  delay?: number;
  /**
   * Set the max width of the tooltip. This prevents the tooltip content
   * from filling the whole screen.
   */
  maxWidth?: string;
  /**
   * Make the tooltip interactive.
   * This will allow the user to interact with the tooltip content.
   */
  interactive?: boolean;
  /**
   * Set the trigger container to behave like inline or block element
   */
  fill?: boolean;
}

export const Tooltip: FC<TooltipProps> = ({
  children,
  trigger,
  placement = 'bottom-start',
  open,
  style,
  maxWidth = '40ch',
  fill = false,
  interactive = false,
  delay = 500
}) => {
  const seedID = useUIDSeed()
  const [isOpen, setIsOpen] = useState(false)
  const tooltipContainerRef = useRef<HTMLDivElement>(null)
  useKeyPress('esc', () => setIsOpen(false))

  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible
  } = usePopperTooltip({
    delayShow: delay,
    delayHide: 300,
    trigger: ['hover'],
    visible: open || isOpen,
    closeOnTriggerHidden: true,
    interactive: interactive,
    onVisibleChange: setIsOpen,
    placement: placement,
    offset: [0, 16]
  }, {
    strategy: 'fixed'
  })

  const isFocusWithin = useFocusWithin(tooltipContainerRef, {
    onFocus: () => {
      setIsOpen(true)
    },
    onBlur: (e: any) => {
      if (e.currentTarget?.parentElement !== tooltipContainerRef.current) setIsOpen(false)
    }
  })

  const dynamycStyle: CSSProperties = {
    '--max-w': maxWidth
  }

  return (
    <div
      data-tooltip-fill={fill}
      className={styles.TooltipClass}
      ref={tooltipContainerRef}
      data-tooltip-has-focus-within={isFocusWithin}
      style={{ ...style }}
    >
      {Children.map(trigger, (child) => isValidElement(child) && cloneElement(
        child,
        {
          ref: setTriggerRef,
          tabIndex: 0,
          'aria-describedby': seedID('tooltip-content')
        }
      ))}
      {visible && (
        <Elevator resting={1}>
          <div
            ref={setTooltipRef}
            role="tooltip"
            id={seedID('tooltip-content')}
            data-theme="dark"
            {...getTooltipProps({ className: styles.Balloon, style: dynamycStyle })}
          >
            {children}
            <div {...getArrowProps({ className: styles.Arrow })} />
          </div>
        </Elevator>
      )}
    </div>
  )
}
