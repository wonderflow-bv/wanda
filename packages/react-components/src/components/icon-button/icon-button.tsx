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

import { Button, ButtonProps, Polymorphic } from '@/components';

import * as styles from './icon-button.module.css';

export type IconButtonProps<T = Record<string, unknown>> = Pick<
ButtonProps,
'kind' | 'dimension' | 'icon' | 'disabled' | 'onClick' | 'busy'> & {
  /**
   * Enable a squared shape for the button. Useful when the element is placed
   * near another standard button.
   */
  squared?: boolean;
} & T

type PolymorphicIconButton = Polymorphic.ForwardRefComponent<
Polymorphic.IntrinsicElement<typeof Button>,
IconButtonProps<Polymorphic.OwnProps<typeof Button>>
>;

export const IconButton = forwardRef(({
  className,
  icon,
  dimension,
  kind,
  disabled,
  busy,
  squared,
  ...otherProps
}, forwardedRef) => (
  <Button
    ref={forwardedRef}
    icon={icon}
    dimension={dimension}
    kind={kind}
    disabled={disabled}
    busy={busy}
    data-icon-button-squared={squared}
    className={clsx(styles.IconButton, className)}
    {...otherProps}
  />
)) as PolymorphicIconButton;
