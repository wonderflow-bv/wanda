import { MutableRefObject, useEffect, useState } from 'react';

import { BreakpointsNames, BreakpointsSettings, useBreakpoints } from './useBreakpoints';

export type BreakpointsConfig<T> = Partial<Record<BreakpointsNames, T>> & { fallback: T }

// export type BreakpointsConfigValues = number | string | boolean | Record<string, any>

export const useBreakpointsConfig = (
  config: BreakpointsConfig<any>,
  target?: MutableRefObject<HTMLElement | null>,
  settings?: BreakpointsSettings,
) => {
  const { fallback } = config;
  const [value, setValue] = useState<any>(fallback);
  const { matches, breakpoints, targetSize } = useBreakpoints(target, settings);

  useEffect(() => {
    setValue(config[matches as keyof typeof config] ?? fallback);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  return ({
    value, matches, breakpoints, targetSize,
  });
};
