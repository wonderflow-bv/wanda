import { useEffect, useState } from 'react';

import { BreakpointsNames, BreakpointsSettings, useBreakpoints } from './useBreakpoints';

export type BreakpointsConfig<T> = Partial<Record<BreakpointsNames, T>> & { fallback: T }

export type BreakpointsConfigValues = number | string | Record<string, any>

export const useBreakpointsConfig = (
  config: BreakpointsConfig<BreakpointsConfigValues>,
  settings?: BreakpointsSettings,
) => {
  const { fallback } = config;
  const [value, setValue] = useState<BreakpointsConfigValues>(fallback);
  const { matches } = useBreakpoints(settings);

  useEffect(() => {
    setValue(config[matches as keyof typeof config] ?? fallback);
  }, [config, fallback, matches]);

  return ({ value });
};
