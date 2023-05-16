import { getCurrentTheme, getPrefersColorScheme } from './themes';

describe('getCurrentTheme()', () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  it('should return light', () => {
    const t = getCurrentTheme();
    expect(t).toBe('light');
  });
});

describe('getPrefersColorScheme()', () => {
  it('should return a value', () => {
    const s = getPrefersColorScheme();
    expect(s).toBe('light');
  });
});
