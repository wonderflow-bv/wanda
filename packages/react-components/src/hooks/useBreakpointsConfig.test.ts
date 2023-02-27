
import { renderHook } from '@testing-library/react-hooks';

import { useBreakpointsConfig } from './useBreakpointsConfig';

describe('useBreakpointsConfig()', () => {
  test('it should return fallback value', () => {
    const v = {
      fallback: '42',
    };
    const { result } = renderHook(() => useBreakpointsConfig(v));
    const {
      breakpoints, matches, size, value,
    } = result.current;

    const w = window?.innerWidth;

    expect(breakpoints).toBeDefined();
    expect(matches).toBeDefined();
    expect(size).toBe(w);
    expect(value).toBe('42');
  });
});
