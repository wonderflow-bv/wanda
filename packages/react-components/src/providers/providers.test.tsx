import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { OverlayProvider, useOverlayContext } from './overlay';
import { ResponsiveProvider, useResponsiveContext } from './responsive';

describe('<Providers>', () => {
  test('OverlayProvider should render properly', () => {
    const { container } = render(
      <OverlayProvider>
        Content
      </OverlayProvider>,
    );
    expect(container).not.toBeNull();
  });

  test('OverlayProvider should render properly with props', () => {
    const fn = jest.fn(() => ({}));
    const { container } = render(
      <OverlayProvider titleId="overlay" onClose={fn}>
        Content
      </OverlayProvider>,
    );
    expect(container).not.toBeNull();
  });

  test('ResponsiveProvider should render properly with props', () => {
    const { container } = render(
      <ResponsiveProvider>
        Content
      </ResponsiveProvider>,
    );
    expect(container).not.toBeNull();
  });

  test('useResponsiveContext', () => {
    const { result } = renderHook(() => useResponsiveContext());
    expect(result).toBeDefined();
  });

  test('useOverlayContext', () => {
    const { result } = renderHook(() => useOverlayContext());
    expect(result).toBeDefined();
  });
});
