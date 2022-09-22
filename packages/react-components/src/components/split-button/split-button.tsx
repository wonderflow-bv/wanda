/*
 * Copyright 2022 Wonderflow <authored by Mattia Astorino>
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

import clsx from 'clsx';
import { forwardRef } from 'react';
import { Except } from 'type-fest';

import {
  Button, Polymorphic, Popover, PopoverProps, Stack,
} from '@/components';

import * as styles from './split-button.module.css';

export type SplitButtonProps = Pick<PopoverProps, 'placement' | 'offset'> & {
  /**
   * Set the label of the action associated to the dropdown.
   */
  label: string;
}

type PolymorphicSplitButton = Polymorphic.ForwardRefComponent<
Polymorphic.IntrinsicElement<typeof Button>,
Except<Polymorphic.OwnProps<typeof Button>, 'iconPosition' | 'iconColor' | 'pressed'> & SplitButtonProps
>;

export const SplitButton = forwardRef(({
  className,
  label,
  icon = 'chevron-down',
  kind,
  dimension,
  fullWidth,
  disabled,
  busy,
  children,
  placement,
  offset,
  onClick,
  ...otherProps
}, forwardedRef) => {
  const commonProps = {
    kind,
    dimension,
    disabled,
  };

  return (
    <Stack
      className={clsx(styles.SplitButton, className)}
      direction="row"
      inline={!fullWidth}
    >
      <Button
        busy={busy}
        fullWidth={fullWidth}
        onClick={onClick}
        ref={forwardedRef}
        {...commonProps}
        {...otherProps}
      >
        {label}
      </Button>
      <Popover
        placement={placement}
        offset={offset}
        disabled={disabled}
        trigger={<Button icon={icon} {...commonProps} />}
      >
        {children}
      </Popover>
    </Stack>
  );
}) as PolymorphicSplitButton;
