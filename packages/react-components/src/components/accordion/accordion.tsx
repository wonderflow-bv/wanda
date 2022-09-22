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
import {
  forwardRef, PropsWithChildren,
} from 'react';

import { AccordionItemProps, Stack } from '@/components';

import * as styles from './accordion.module.css';
import { AccordionContextProvider } from './accordion-context';

export type AccordionProps = PropsWithChildren<PropsWithClass<{
  /**
   * Set the item to open by default when the accordion is rendered.
   */
  defaultOpen?: AccordionItemProps['value'];
  /**
   * Show visual separator between accordion items
   */
  showSeparators?: boolean;
}>>

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(({
  className,
  defaultOpen,
  showSeparators = true,
  children,
  style,
}, forwardedRef) => (
  <AccordionContextProvider defaultOpen={defaultOpen}>
    <Stack
      rowGap={8}
      ref={forwardedRef}
      data-accordion-separators={showSeparators}
      className={clsx(styles.Accordion, className)}
      style={style}
    >
      {children}
    </Stack>
  </AccordionContextProvider>
));
