import { renderHook } from '@testing-library/react-hooks';

import { LayoutProvider, useLayoutContext } from './layout';
import { StyleConfigProvider, useStyleConfigContext } from './style-config';
import { ThemeProvider, useThemeContext } from './theme';

describe('useThemeContext', () => {
  it('should return error if context is not defined', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider theme={null}>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useThemeContext(), { wrapper });

    expect(result.error).toBeDefined();
    expect(result.error!.message).toBe('useThemeContext hook must be used inside ThemeProvider to access context data.');
  });
});

describe('useLayoutContext', () => {
  it('should return error if context is not defined', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LayoutProvider>{children}</LayoutProvider>
    );

    const { result } = renderHook(() => useLayoutContext(), { wrapper });

    expect(result.error).toBeDefined();
    expect(result.error!.message).toBe('useLayoutContext hook must be used inside LayoutProvider to access context data.');
  });
});

describe('useStyleConfigContext', () => {
  it('should return error if context is not defined', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <StyleConfigProvider styleConfig={null}>{children}</StyleConfigProvider>
    );

    const { result } = renderHook(() => useStyleConfigContext(), { wrapper });

    expect(result.error).toBeDefined();
    expect(result.error!.message).toBe('useStyleConfigContext hook must be used inside StyleConfigProvider to access context data.');
  });
});
