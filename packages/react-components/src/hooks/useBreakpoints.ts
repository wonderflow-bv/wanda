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

import {
  MutableRefObject, useEffect, useState,
} from 'react';

import { useSSR } from './useSSR';

export type BreakpointsNames = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type Breakpoints<T> = Record<BreakpointsNames, T>

export type BreakpointsSettings = Breakpoints<number>

export type BreakpointsValues = Breakpoints<boolean>

const DefaultBreakpointsSettings: BreakpointsSettings = {
  xs: 480,
  sm: 768,
  md: 960,
  lg: 1280,
  xl: 1600,
};

const DefaultBreakpointsValues: BreakpointsValues = {
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
};

export const useBreakpoints = (
  target?: MutableRefObject<HTMLElement | null>,
  settings: BreakpointsSettings = DefaultBreakpointsSettings,
) => {
  const { isBrowser } = useSSR();

  const [breakpoints, setBreakpoints] = useState<BreakpointsValues>(DefaultBreakpointsValues);
  const [matches, setMatches] = useState<string>('xs');
  const [targetSize, setTargetSize] = useState<number>(0);

  const handleResize = () => {
    const w = isBrowser ? target?.current?.offsetWidth ?? window.innerWidth : 0;

    const v: BreakpointsValues = {
      xs: w <= settings.xs,
      sm: w > settings.xs && w <= settings.sm,
      md: w > settings.sm && w <= settings.md,
      lg: w > settings.md && w <= settings.lg,
      xl: w > settings.lg,
    };

    const b = Object.keys(v).filter((k: string) => (v[k as keyof typeof v]))[0];

    setMatches(b);
    setBreakpoints(v);
    setTargetSize(w);
  };

  useEffect(() => {
    if (isBrowser) {
      handleResize();
      window.addEventListener('resize', handleResize);
    } else {
      setBreakpoints(DefaultBreakpointsValues);
    }

    return () => {
      if (isBrowser) window.removeEventListener('resize', handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { breakpoints, matches, targetSize };
};
