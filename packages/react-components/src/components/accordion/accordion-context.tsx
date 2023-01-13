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

import constate from 'constate';
import {
  useCallback, useState,
} from 'react';

import { AccordionItemProps } from './accordion-item';

type AccProps = AccordionItemProps

type AccordionContextProps = {
  defaultOpen?: AccordionItemProps['value'];
}

const useAccordion = ({
  defaultOpen,
}: AccordionContextProps) => {
  const [openItem, setOpenItem] = useState(defaultOpen);

  const setOpen = useCallback((value: AccProps['value']) => {
    setOpenItem(value);
  }, []);

  return {
    openItem,
    setOpen,
  };
};

export const [
  AccordionContextProvider,
  useAccordionContext,
] = constate(useAccordion);
