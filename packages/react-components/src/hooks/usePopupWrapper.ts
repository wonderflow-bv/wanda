/*
 * Copyright 2023 Wonderflow Design Team
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

import { useCallback, useEffect, useState } from 'react';

import { useSSR } from './useSSR';

export const usePopUpWrapper = (id: string) => {
  const [wrapper, setWrapper] = useState<HTMLElement>();
  const { isBrowser } = useSSR();

  const createWrapper = useCallback(() => {
    if (isBrowser) {
      let w = document.getElementById(id);
      if (!w) {
        w = document.createElement('div');
        w.setAttribute('id', id);
        w.style.position = 'relative';
        w.style.zIndex = '999';
        document.body.appendChild(w);
      }

      setWrapper(w);
    }
  }, [id, isBrowser]);

  const removeWrapper = () => {
    const w = isBrowser && document.getElementById(id);
    if (w) w.remove();
  };

  useEffect(
    () => {
      createWrapper();

      return () => removeWrapper();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return { wrapper };
};
