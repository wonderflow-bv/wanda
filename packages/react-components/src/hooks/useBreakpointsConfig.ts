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

import { MutableRefObject, useEffect, useState } from 'react';

import { BreakpointsNames, BreakpointsSettings, useBreakpoints } from './useBreakpoints';

export type BreakpointsConfig<T> = Partial<Record<BreakpointsNames, T>> & { fallback: T }

export const useBreakpointsConfig = <T>(
  config: BreakpointsConfig<T>,
  target?: MutableRefObject<HTMLElement | null>,
  settings?: BreakpointsSettings,
) => {
  const { fallback } = config;
  const [value, setValue] = useState<T>(fallback);
  const {
    matches, breakpoints, size,
  } = useBreakpoints(target, settings);

  useEffect(() => {
    setValue(config[matches as keyof typeof config] ?? fallback);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  return ({
    value,
    matches,
    breakpoints,
    size,
  });
};
