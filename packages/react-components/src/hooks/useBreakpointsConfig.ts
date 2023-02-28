import { MutableRefObject, useEffect, useState } from 'react';

import { BreakpointsNames, BreakpointsSettings, useBreakpoints } from './useBreakpoints';

export type BreakpointsConfig<T> = Partial<Record<BreakpointsNames, T>> & { fallback: T }

export type BreakpointsConfigValue = Record<string, any>

export const useBreakpointsConfig = (
  config: BreakpointsConfig<BreakpointsConfigValue>,
  target?: MutableRefObject<HTMLElement | null>,
  settings?: BreakpointsSettings,
) => {
  const { fallback } = config;
  const [value, setValue] = useState<BreakpointsConfigValue>(fallback);
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
