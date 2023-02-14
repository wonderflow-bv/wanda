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

import { AutoPlacement, BasePlacement, VariationPlacement } from '@popperjs/core/lib';
import { useFocusWithin, useKeyPress } from 'ahooks';
import {
  Children, cloneElement, CSSProperties, isValidElement, ReactElement, ReactNode, useRef, useState,
} from 'react';
import { createPortal } from 'react-dom';
import { usePopperTooltip } from 'react-popper-tooltip';
import { useUIDSeed } from 'react-uid';

import { Elevator } from '@/components';

import { usePopUpWrapper } from '../../hooks';
import * as styles from './tooltip.module.css';

export type TooltipProps = {
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

export const Tooltip: FCChildrenClass<TooltipProps> = ({
  children,
  trigger,
  placement = 'bottom-start',
  open,
  style,
  maxWidth = '40ch',
  fill = false,
  interactive = false,
  delay = 500,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const seedID = useUIDSeed();
  const id = seedID('tooltip-content');
  const tooltipContainerRef = useRef<HTMLDivElement>(null);
  useKeyPress('esc', () => setIsOpen(false));
  const { wrapper } = usePopUpWrapper('tooltip-root');

  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    /* eslint-disable @typescript-eslint/naming-convention */
    visible,
  } = usePopperTooltip({
    delayShow: delay,
    delayHide: 300,
    trigger: ['hover'],
    visible: open ?? isOpen,
    closeOnTriggerHidden: true,
    interactive,
    onVisibleChange: setIsOpen,
    placement,
    offset: [0, 16],
  }, {
    strategy: 'fixed',
  });

  const isFocusWithin = useFocusWithin(tooltipContainerRef, {
    onFocus: () => {
      setIsOpen(true);
    },
    onBlur: (e: any) => {
      if (e.currentTarget?.parentElement !== tooltipContainerRef.current) setIsOpen(false);
    },
  });

  const dynamycStyle: CSSProperties = {
    '--max-w': maxWidth,
  };

  return (
    <div
      data-tooltip-fill={fill}
      className={styles.Tooltip}
      ref={tooltipContainerRef}
      data-tooltip-has-focus-within={isFocusWithin}
      style={{ ...style }}
    >
      {Children.map(trigger, child => isValidElement(child) && cloneElement(
        child as ReactElement,
        {
          ref: setTriggerRef,
          tabIndex: 0,
          'aria-describedby': id,
        },
      ))}
      {visible && createPortal(
        <Elevator resting={1}>
          <div
            ref={setTooltipRef}
            role="tooltip"
            id={id}
            data-theme="dark"
            {...getTooltipProps({ className: styles.Balloon, style: dynamycStyle })}
          >
            {children}
            <div {...getArrowProps({ className: styles.Arrow })} />
          </div>
        </Elevator>, wrapper ?? document.body,
      )}
    </div>
  );
};
