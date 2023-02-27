
import { renderHook } from '@testing-library/react-hooks';

import { useSSR } from './useSSR';

describe('useSSR()', () => {
  test('it should return true in Browser', () => {
    const { result } = renderHook(() => useSSR());

    const d = window?.document;

    expect(d).toBeTruthy();
    expect(result.current.isBrowser).toBe(true);
    expect(result.current.isServer).not.toBe(true);
  });
});
