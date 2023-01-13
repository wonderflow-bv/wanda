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

import { Disclosure, DisclosureProps } from '@/components';

import * as styles from './accordion.module.css';
import { useAccordionContext } from './accordion-context';

export type AccordionItemProps = Pick<
DisclosureProps,
'summary'
|'dimension'
|'padding'
|'iconPosition'
|'contentMaxHeight'
> & {
  /**
   * Assign a value to the single accordion item. This is used to define
   * the default opened item on mount.
   */
  value: string;
}

export const AccordionItem: FCChildrenClass<AccordionItemProps> = ({
  summary,
  children,
  value,
  className,
  ...otherProps
}) => {
  const { openItem, setOpen } = useAccordionContext();

  return (
    <Disclosure
      onClick={() => setOpen(value)}
      open={value === openItem}
      className={clsx(styles.Item, className)}
      summary={summary}
      {...otherProps}
    >
      {children}
    </Disclosure>
  );
};
