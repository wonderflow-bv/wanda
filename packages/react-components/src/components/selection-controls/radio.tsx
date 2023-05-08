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

import { useSize } from 'ahooks';
import clsx from 'clsx';
import { domAnimation, LazyMotion, m } from 'framer-motion';
import {
  ChangeEvent, forwardRef, InputHTMLAttributes, useMemo, useRef,
} from 'react';
import { useUIDSeed } from 'react-uid';

import { Stack } from '@/components';

import { Text } from '../text-new';
import * as styles from './selection-controls.module.css';

export type RadioProps = InputHTMLAttributes<HTMLInputElement> & {
  /**
   * Set disabled state. The component is not interactive and grayed out.
   */
  disabled?: boolean;
  /**
   * Define the accessible label of the input. While this is not
   * mandatory, an input should always have a label. If not using this property
   * you can bind a custom label to the input by using an id.
   */
  label?: string;
  /**
   * Set the size of the toggle.
   */
  dimension?: 'regular' | 'small';
  /**
   * Callback function to be called when is toggled.
   * A parameter `ChangeEvent<HTMLInputElement>` is passed with the event details
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const inputSize = {
  regular: 24,
  small: 16,
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  className,
  disabled,
  id,
  label,
  dimension = 'regular',
  onChange,
  hidden,
  ...otherProps
}, forwardedRef) => {
  const seedID = useUIDSeed();
  const fieldID = useMemo(() => id ?? seedID('radio'), [id, seedID]);

  const refWrapper = useRef(null);
  const wrapper = useSize(refWrapper);
  const isAlignCenter = useMemo(() => wrapper?.height === inputSize[dimension], [wrapper, dimension]);

  return (
    <Stack
      as="span"
      direction="row"
      columnGap={8}
      vAlign={isAlignCenter ? 'center' : 'start'}
      fill={false}
      ref={refWrapper}
      data-outer-element="Wrapper"
    >
      <LazyMotion features={domAnimation} strict>
        <m.span
          className={clsx(styles.InputWrapper, className)}
          whileTap={{ scale: 1.15 }}
          transition={{ duration: 0.3, ease: 'backOut' }}
          data-radio-control={hidden}
        >
          <input
            type="radio"
            disabled={disabled}
            aria-disabled={disabled}
            data-control-dimension={dimension}
            data-inner-element="Radio"
            onChange={onChange}
            className={styles.RadioInput}
            ref={forwardedRef}
            hidden={hidden}
            id={fieldID}
            {...otherProps}
          />
        </m.span>
      </LazyMotion>
      {label && (
        <Text
          as="label"
          aria-disabled={disabled}
          data-inner-element="Label"
          className={styles.Label}
          variant={dimension === 'small' ? 'body-2' : 'body-1'}
          htmlFor={fieldID}
          title={otherProps?.title}
        >
          {label}
        </Text>
      )}
    </Stack>
  );
});

Radio.displayName = 'Radio';
