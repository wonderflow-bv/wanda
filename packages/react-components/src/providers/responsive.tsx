/* eslint-disable @typescript-eslint/prefer-reduce-type-parameter */
import jsonTokens from '@wonderflow/tokens/platforms/web/tokens.json';
import constate from 'constate';
import { useEffect, useState } from 'react';

type Breakpoints = {
  extraSmall: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
};

type BreakpointsKeys = keyof Breakpoints;

const DEFAULT_BREAKPOINTS: Breakpoints = {
  extraSmall: jsonTokens.breakpoint['extra-small'],
  small: jsonTokens.breakpoint.small,
  medium: jsonTokens.breakpoint.medium,
  large: jsonTokens.breakpoint.large,
  extraLarge: jsonTokens.breakpoint['extra-large'],
};

const breakpointKeys = Object.keys(DEFAULT_BREAKPOINTS) as BreakpointsKeys[];

const DEFAULT_BREAKPOINTS_MATCHES: Record<BreakpointsKeys, boolean> = {
  extraSmall: false,
  small: false,
  medium: false,
  large: false,
  extraLarge: false,
};

const matchMediaFactory = (breakpointKey: BreakpointsKeys) => window.matchMedia(`(min-width: ${DEFAULT_BREAKPOINTS[breakpointKey]})`);

const useResponsive = () => {
  const [matches, setMatches] = useState<Record<BreakpointsKeys, boolean>>(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_BREAKPOINTS_MATCHES;
    }

    const results = breakpointKeys.reduce((acc, src) => {
      acc[src] = matchMediaFactory(src).matches;
      return acc;
    }, {} as Record<BreakpointsKeys, boolean>);

    return results;
  });

  useEffect(() => {
    const onChange = (
      key: BreakpointsKeys,
    ) => (event: MediaQueryListEvent) => setMatches(old => ({ ...old, [key]: event.matches }));

    const mediaQueryList = breakpointKeys.reduce((acc, src) => {
      acc[src] = matchMediaFactory(src);
      acc[src].addEventListener('change', onChange(src));
      return acc;
    }, {} as Record<BreakpointsKeys, MediaQueryList>);

    return () => {
      (Object.keys(mediaQueryList) as BreakpointsKeys[]).forEach(
        src => mediaQueryList[src].removeEventListener('change', onChange(src)),
      );
    };
  }, []);

  return { matches, breakpoints: DEFAULT_BREAKPOINTS };
};

export const [
  ResponsiveProvider,
  useResponsiveContext,
] = constate(useResponsive);
