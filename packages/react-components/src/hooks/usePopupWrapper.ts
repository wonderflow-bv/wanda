import { useCallback, useEffect, useState } from 'react';

export const usePopUpWrapper = (id: string) => {
  const [wrapper, setWrapper] = useState<HTMLElement>(document?.body);
  const isBrowser = window?.document;

  const createWrapper = useCallback(() => {
    if (isBrowser) {
      let w = document.getElementById(id);
      if (!w) {
        w = document.createElement('div');
        w.setAttribute('id', id);
        w.style.position = 'relative';
        w.style.zIndex = '999';
        document.body.appendChild(w);
      }

      setWrapper(w);
    }
  }, [id, isBrowser]);

  const removeWrapper = () => {
    const w = isBrowser && document.getElementById(id);
    if (w) w.remove();
  };

  useEffect(
    () => {
      createWrapper();

      return () => removeWrapper();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return { wrapper };
};
