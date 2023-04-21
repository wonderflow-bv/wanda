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

import tkns from '@wonderflow/tokens/platforms/web/tokens.json';
import { useSize } from 'ahooks';
import {
  MutableRefObject, useEffect, useState,
} from 'react';

import { cssRelativeUnitsToPixel } from '../utils/conversions';
import { useSSR } from './useSSR';

export type BreakpointsNames = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type Breakpoints<T> = Record<BreakpointsNames, T>

export type BreakpointsSettings = Breakpoints<number>

export type BreakpointsValues = Breakpoints<boolean>

const DefaultBreakpointsSettings: BreakpointsSettings = {
  xs: cssRelativeUnitsToPixel(tkns.breakpoint['extra-small']),
  sm: cssRelativeUnitsToPixel(tkns.breakpoint.small),
  md: cssRelativeUnitsToPixel(tkns.breakpoint.medium),
  lg: cssRelativeUnitsToPixel(tkns.breakpoint.large),
  xl: cssRelativeUnitsToPixel(tkns.breakpoint['extra-large']),
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
  const [matches, setMatches] = useState<BreakpointsNames>('xs');
  const [windowSize, setWindowSize] = useState<number>(0);

  const size = useSize(target);

  const targetBreakpoints: BreakpointsValues | undefined = (size?.width) ? {
    xs: size.width <= settings.xs,
    sm: size.width > settings.xs && size.width <= settings.sm,
    md: size.width > settings.sm && size.width <= settings.md,
    lg: size.width > settings.md && size.width <= settings.lg,
    xl: size.width > settings.lg,
  } : undefined;

  const targetMatches = targetBreakpoints
  && Object.keys(targetBreakpoints)
    .filter(k => (targetBreakpoints[k as keyof typeof targetBreakpoints]))[0];

  const handleResize = () => {
    if (isBrowser) {
      const w = window.innerWidth;

      const v: BreakpointsValues = {
        xs: w <= settings.xs,
        sm: w > settings.xs && w <= settings.sm,
        md: w > settings.sm && w <= settings.md,
        lg: w > settings.md && w <= settings.lg,
        xl: w > settings.lg,
      };

      const b = Object.keys(v).filter(k => (v[k as keyof typeof v]))[0];

      setMatches(b as BreakpointsNames);
      setBreakpoints(v);
      setWindowSize(window.innerWidth);
    }
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

  return {
    breakpoints: targetBreakpoints ?? breakpoints,
    matches: (targetMatches ?? matches) as BreakpointsNames,
    size: size?.width ?? windowSize,
  };
};

