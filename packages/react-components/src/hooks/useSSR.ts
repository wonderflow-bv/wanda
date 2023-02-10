export const useSSR = () => {
  const isBrowser = typeof window !== 'undefined'
    && window.document
    && window.document.documentElement;

  return {
    isBrowser,
    isServer: !isBrowser,
  };
};
