
import { renderHook } from '@testing-library/react-hooks';

import { useBreakpoints } from './useBreakpoints';

describe('useBreakpoints()', () => {
  test('it should return defined values as default', () => {
    const { result } = renderHook(() => useBreakpoints());
    const { breakpoints, matches, size } = result.current;
    const w = window?.innerWidth;

    expect(breakpoints).toBeDefined();
    expect(matches).toBeDefined();
    expect(size).toBe(w);
  });

  test('it should return defined values with custom settings', () => {
    const custom = {
      xs: 576,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1400,
    };
    const { result } = renderHook(() => useBreakpoints(undefined, custom));
    const { breakpoints, matches, size } = result.current;
    const w = window?.innerWidth;

    expect(breakpoints).toBeDefined();
    expect(matches).toBeDefined();
    expect(size).toBe(w);
  });

  test('it should return default values', () => {
    const { result } = renderHook(() => useBreakpoints());
    const { breakpoints, matches, size } = result.current;
    const w = window?.innerWidth;

    expect(breakpoints).toBeDefined();
    expect(matches).toBeDefined();
    expect(size).toBe(w);
  });
});
