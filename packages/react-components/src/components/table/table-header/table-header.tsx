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

import { HTMLAttributes } from 'react';

import { Polymorphic, Stack, Title } from '@/components';

import * as styles from './table-header.module.css';

export type TableHeaderProps = HTMLAttributes<HTMLElement> & {
  title?: string | Polymorphic.IntrinsicElement<typeof Title>;
}

export const TableHeader: FCChildren<TableHeaderProps> = ({
  children,
  title,
  id,
  ...otherProps
}) => (
  <Stack
    direction="row"
    columnGap={32}
    vAlign="center"
    hAlign="space-between"
    fill={false}
    className={styles.TableHeader}
    {...otherProps}
  >
    <div>
      {typeof title === 'string' ? <Title id={id} level="5">{title}</Title> : title}
    </div>

    <Stack direction="row" vAlign="center" columnGap={8} inline>
      {children}
    </Stack>
  </Stack>
);
