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

import clsx from 'clsx';
import { forwardRef, ReactNode } from 'react';

import {
  Button, Polymorphic, Stack, Symbol, SymbolProps, Text,
} from '@/components';

import * as styles from './snackbar.module.css';

export type SnackbarProps = {
  /**
   * The message to display. Describes the action that the snackbar takes
   * or the feedback that the user has received.
   */
  children: ReactNode;
  /**
   * Set the icon to be displaye alongside the title.
   * This icon have to enforce the message in a not misleading way.
   */
  icon?: SymbolProps['source'];
  /**
   * Set the title of the snackbar. This must concisely describe the message.
   */
  title?: string;
  /**
   * Set the color and the sentiment of the snackbar.
   * This affects the the color of all the elements inside and should be defined
   * according to the message.
   */
  kind?: 'info' | 'warning' | 'neutral' | 'positive' | 'danger';
  /**
   * Define if the snackbar can be dismissed by user interaction.
   * If `true` a button will be displayed.
   */
  dismissable?: boolean;
  /**
   * Set the label of the dismiss button.
   */
  dismissLabel?: string;
  /**
   * Callback function to be called when the dismiss button is clicked.
   */
  onDismiss?: () => void;
}

type PolymorphicSnackbar = Polymorphic.ForwardRefComponent<'output', SnackbarProps>;

export const Snackbar = forwardRef(({
  children,
  className,
  title,
  icon,
  kind = 'neutral',
  as: Wrapper = 'output',
  dismissable,
  dismissLabel = 'Dismiss',
  onDismiss,
  ...otherProps
}, forwardedRef) => {
  const defaultIcons: Record<string, SymbolProps['source']> = {
    info: 'circle-info',
    warning: 'circle-exclamation',
    neutral: 'compass',
    positive: 'circle-check',
    danger: 'circle-x',
  };

  return (
    <Wrapper
      ref={forwardedRef}
      className={clsx(styles.Snackbar, className)}
      data-snackbar-kind={kind}
      role="status"
      {...otherProps}
    >
      <Stack vAlign="start" hAlign="start" direction="row" columnGap={16}>
        <Symbol
          data-snackbar-has-title={!!title}
          className={styles.Icon}
          weight="duotone"
          source={icon ?? defaultIcons[kind]}
          dimension={18}
        />

        <Stack rowGap={16} vPadding={4}>
          <Stack rowGap={8}>
            {title && <Text variant="subtitle-1" preventResponsive>{title}</Text>}
            <Text variant="body-2">{children}</Text>
          </Stack>
          {dismissable && (
            <Stack hAlign="end">
              <Button onClick={onDismiss} className={styles.Action} dimension="small">{dismissLabel}</Button>
            </Stack>
          )}
        </Stack>

      </Stack>
    </Wrapper>
  );
}) as PolymorphicSnackbar;
