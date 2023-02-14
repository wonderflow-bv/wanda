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

import { useEffect, useState } from 'react';

import { useSSR } from './useSSR';

export type BreakpointsSettings = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export type BreakpointsValues = {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
}

const DEFAULT_BREAKPOINTS_SETTINGS: BreakpointsSettings = {
  xs: 480,
  sm: 768,
  md: 960,
  lg: 1280,
  xl: 1600,
};

const DEFAULT_BREAKPOINTS_VALUES: BreakpointsValues = {
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
};

export const useBreakpoints = (settings: BreakpointsSettings = DEFAULT_BREAKPOINTS_SETTINGS) => {
  const { isBrowser } = useSSR();
  const [breakpoints, setBreakpoints] = useState<BreakpointsValues>(DEFAULT_BREAKPOINTS_VALUES);

  const handleResize = () => {
    const w = isBrowser && window.innerWidth;
    setBreakpoints({
      xs: w <= settings.xs,
      sm: w > settings.xs && w <= settings.sm,
      md: w > settings.sm && w <= settings.md,
      lg: w > settings.md && w <= settings.lg,
      xl: w > settings.lg,
    });
  };

  useEffect(() => {
    if (isBrowser) {
      handleResize();
      window.addEventListener('resize', handleResize);
    } else {
      setBreakpoints(DEFAULT_BREAKPOINTS_VALUES);
    }

    return () => {
      if (isBrowser) window.removeEventListener('resize', handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { breakpoints };
};
