/*
 * Copyright 2022-2023 Wonderflow Design Team
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
  AutoPlacement, BasePlacement, Modifier, VariationPlacement,
} from '@popperjs/core';
import tkns from '@wonderflow/tokens/platforms/web/tokens.json';
import { useFocusWithin, useKeyPress } from 'ahooks';
import clsx from 'clsx';
import {
  domMax,
  LazyMotion,
  m,
} from 'framer-motion';
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { mergeRefs } from 'react-merge-refs';
import { usePopperTooltip } from 'react-popper-tooltip';
import { useUIDSeed } from 'react-uid';

import { isBrowser } from '../../utils/browser';
import * as styles from './popover.module.css';

export type PopoverProps = {
  /**
   * The content of the popover to display when the popover is open.
   */
  children: ReactNode;
  /**
  /**
   * The element to use as the trigger for the popover.
   */
  trigger: ReactNode;
  /**
   * The distance from the trigger to the popover.
   */
  offset?: number;
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
  /**
   * Auto close the popover when clicking inside of it.
   */
  closeOnInsideClick?: boolean;
  /**
   * Set the root element to render the Popover into.
   */
  root?: HTMLElement;
}

const cssEasingToArray = (cssEasing: string) => {
  const [x1, y1, x2, y2] = cssEasing.replace(/[^0-9.,]+/g, '').split(',').map(i => parseFloat(i));
  return [x1, y1, x2, y2];
};

const PopoverAnimation = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: cssEasingToArray(tkns.easing.entrance),
      duration: 0.1,
    },
  },
  hidden: {
    y: -5,
    opacity: 0,
    transition: {
      ease: cssEasingToArray(tkns.easing.exit),
      duration: 0.1,
    },
  },
};

export const Popover = forwardRef<HTMLDivElement, PropsWithClass<PopoverProps>>(({
  children,
  trigger,
  offset = 8,
  placement = 'auto-start',
  open,
  disabled,
  closeOnOutsideClick = true,
  closeOnInsideClick = false,
  className,
  matchTriggerWidth,
  onOpenChange,
  root,
  ...otherProps
}, forwardedRef) => {
  const seedID = useUIDSeed();
  const [isOpen, setIsOpen] = useState(false);
  const popoverContainerRef = useRef<HTMLDivElement>(null);

  const sameWidth = useMemo<Modifier<string, Record<string, unknown>>>(() => ({
    name: 'sameWidth',
    enabled: true,
    phase: 'beforeWrite',
    requires: ['computeStyles'],
    fn: ({ state }) => {
      const s = state;
      if (matchTriggerWidth) s.styles.popper.width = `${s.rects.reference.width}px`;
    },
    effect: ({ state }) => {
      const s = state;
      const referenceElement: Partial<HTMLElement> = s.elements.reference;
      if (matchTriggerWidth) s.elements.popper.style.width = `${referenceElement.offsetWidth ?? 0}px`;
    },
  }), [matchTriggerWidth]);

  const handleCloseOnClickInside = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (isOpen && closeOnInsideClick) {
      setIsOpen(false);
    }
  };

  const {
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    visible,
  } = usePopperTooltip({
    delayShow: 0,
    delayHide: 0,
    trigger: !disabled ? ['click'] : null,
    visible: isOpen,
    closeOnTriggerHidden: true,
    closeOnOutsideClick,
    onVisibleChange: (state) => {
      onOpenChange?.(state);
      setIsOpen(state);
    },
  }, {
    placement,
    modifiers: [
      sameWidth,
      {
        name: 'offset',
        options: {
          offset: [0, offset],
        },
      },
    ],
  });

  const isFocusWithin = useFocusWithin(popoverContainerRef, {
    onBlur: (e) => {
      if (e.relatedTarget && visible) {
        setIsOpen(true);
      }
    },
  });

  useKeyPress('esc', () => setIsOpen(false));

  useEffect(() => {
    if (open !== undefined) setIsOpen(open);
  }, [open]);

  return (
    <div
      ref={mergeRefs([popoverContainerRef, forwardedRef])}
      className={clsx(styles.Popover, className)}
      data-popover-has-focus={isFocusWithin}
    >
      {isValidElement(trigger) && cloneElement(
        trigger as ReactElement,
        {
          ref: setTriggerRef,
          id: seedID('popover-trigger'),
          key: seedID('popover-trigger'),
          'aria-haspopup': 'true',
          'aria-controls': seedID('popover-dialog'),
          'aria-expanded': isOpen,
          ...otherProps,
        },
      )}
      {isBrowser() && visible && createPortal(
        <div
          aria-hidden
          data-testid="tooltip"
          ref={setTooltipRef}
          role="tooltip"
          id={seedID('tooltip-content')}
          key={seedID('tooltip-content')}
          {...getTooltipProps({ className: styles.PopUp })}
          onClick={e => handleCloseOnClickInside(e)}
        >
          <LazyMotion features={domMax} strict>
            <m.div
              variants={PopoverAnimation}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div>
                {Children.map(children, child => isValidElement(child) && cloneElement(
                  child as ReactElement,
                  {
                    id: seedID('popover-dialog'),
                    'aria-labelledby': seedID('popover-trigger'),
                  },
                ))}
              </div>
            </m.div>
          </LazyMotion>
        </div>, root ?? document.body,
      )}
    </div>
  );
});

Popover.displayName = 'Popover';
