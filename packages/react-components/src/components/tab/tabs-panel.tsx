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

import * as TabsPrimitive from '@radix-ui/react-tabs';
import clsx from 'clsx';

import { SymbolProps } from '@/components';

import * as styles from './tab.module.css';

export type TabPanelProps = {
  label: string;
  icon?: SymbolProps['source'];
  value: TabsPrimitive.TabsContentProps['value'];
  disabled?: boolean;
};

export const TabPanel: FCChildrenClass<TabPanelProps> = ({
  className,
  children,
  label,
  ...otherProps
}) => (
  <TabsPrimitive.Content
    className={clsx(styles.Panel, className)}
    data-tabs-label={label}
    {...otherProps}
  >
    {children}
  </TabsPrimitive.Content>
);
