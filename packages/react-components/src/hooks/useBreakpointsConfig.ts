import { useEffect, useState } from 'react';

import { BreakpointsNames, BreakpointsSettings, useBreakpoints } from './useBreakpoints';

export type BreakpointsConfig<T> = Record<Partial<BreakpointsNames>, T> & { fallback: T }

export type Values = number | string

export const useBreakpointsConfig = (config: BreakpointsConfig<Values>, settings?: BreakpointsSettings) => {
  const { fallback } = config;
  const [value, setValue] = useState<Values>(fallback);
  const { matches } = useBreakpoints(settings);

  useEffect(() => {
    setValue(config[matches as keyof typeof config] ?? fallback);
  }, [config, fallback, matches]);

  return ({ value });
};
