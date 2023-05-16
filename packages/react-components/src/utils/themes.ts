export const getPrefersColorScheme = () => {
  if (typeof window !== 'undefined') {
    const m = window.matchMedia('(prefers-color-scheme: dark)');
    return m.matches ? 'dark' : 'light';
  }

  return 'light';
};

export const getCurrentTheme = () => (
  (typeof window !== 'undefined'
  && window.document?.querySelector('htlm')?.getAttribute('data-theme') === 'dark')
    ? 'dark'
    : 'light');

