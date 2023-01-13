/*
 * Copyright 2022 Wonderflow <authored by Wonderflow Design Team>
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
import { forwardRef, HTMLAttributes } from 'react';

import * as styles from './separator.module.css';

export type SeparatorProps = HTMLAttributes<HTMLHRElement>

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(({
  className,
  ...otherProps
}, forwardedRef) => (
  <hr
    ref={forwardedRef}
    className={clsx(styles.Separator, className)}
    {...otherProps}
  />
));

Separator.displayName = 'Separator';
