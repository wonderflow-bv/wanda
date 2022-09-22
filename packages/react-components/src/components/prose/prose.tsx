/*
 * Copyright 2022 Wonderflow
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

import { Polymorphic } from '@/components';

import * as styles from './prose.module.css';

export type ProseProps = Record<string, unknown>

// eslint-disable-next-line
type PolymorphicProse = Polymorphic.ForwardRefComponent<'div', {}>;

export const Prose = forwardRef(({
  children,
  className,
  as: Wrapper = 'div',
  ...otherProps
}, forwardedRef) => (
  <Wrapper
    ref={forwardedRef}
    className={clsx(styles.Prose, className)}
    {...otherProps}
  >
    {children}
  </Wrapper>
)) as PolymorphicProse;
