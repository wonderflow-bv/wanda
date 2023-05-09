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
import {
  Children, cloneElement, forwardRef, isValidElement, ReactElement, ReactNode,
} from 'react';
import { useUIDSeed } from 'react-uid';

import { Stack, Text } from '@/components';

import * as styles from './input-group.module.css';

export type InputGroupProps = {
  /**
   * Pas the input element to decorate
   */
  input: ReactNode;
  /**
   * Add a decoration element after the input.
   */
  prefix?: ReactNode;
  /**
   * Add a decoration element before the input.
   */
  end?: ReactNode;
  /**
   * Add an accessible label to the componsed input group
   */
  suffix?: ReactNode;
  /**
   * Pass the dimension down to the imput element.
   */
  dimension?: 'small' | 'big' | 'regular';
  /**
   * Assign a label to the center field.
   */
  label?: string;
}

export const InputGroup = forwardRef<HTMLFieldSetElement, PropsWithClass<InputGroupProps>>(({
  className,
  input,
  suffix,
  prefix,
  label,
  dimension = 'regular',
  ...otherProps
}, forwardedRef) => {
  const seedID = useUIDSeed();

  return (
    <Stack
      rowGap={4}
      hAlign="stretch"
      vAlign="start"
      fill={false}
    >
      {label && <Text as="label" variant={dimension === 'big' ? 'body-1' : 'body-2'} htmlFor={seedID('field')}>{label}</Text>}
      <Stack
        as="fieldset"
        direction="row"
        vAlign="start"
        hAlign="start"
        fill={false}
        inline
        ref={forwardedRef}
        className={clsx(styles.InputGroup, className)}
        data-input-group-has-end={Boolean(suffix)}
        data-input-group-has-start={!!prefix}
        {...otherProps}
      >
        <div className={styles.Start}>
          {Children.map(prefix, child => isValidElement(child) && cloneElement(
            child as ReactElement,
            {
              dimension,
            },
          ))}
        </div>
        <div className={styles.InputField}>
          {Children.map(input, child => isValidElement(child) && cloneElement(
            child as ReactElement,
            {
              id: seedID('field'),
              dimension,
            },
          ))}
        </div>
        <div className={styles.End}>
          {Children.map(suffix, child => isValidElement(child) && cloneElement(
            child as ReactElement,
            {
              dimension,
            },
          ))}
        </div>
      </Stack>
    </Stack>
  );
});

InputGroup.displayName = 'InputGroup';
