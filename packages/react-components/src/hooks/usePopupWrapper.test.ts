
import { renderHook } from '@testing-library/react-hooks';

import { usePopUpWrapper } from './usePopupWrapper';

describe('usePopupWrapper()', () => {
  test('it should create a div with a default id where to render the popup', () => {
    const { result } = renderHook(() => usePopUpWrapper());

    expect(result.current.wrapper?.getAttribute('id')).toBe('popup-root');
  });

  test('it should create a div with a custom id where to render the popup', () => {
    const testId = 'test-id';
    const { result } = renderHook(() => usePopUpWrapper(testId));

    expect(result.current.wrapper?.getAttribute('id')).toBe(testId);
  });
});
