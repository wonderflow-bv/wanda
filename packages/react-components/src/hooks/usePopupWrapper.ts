import { useCallback, useEffect, useState } from 'react';

export const usePopUpWrapper = (id: string) => {
  const [wrapper, setWrapper] = useState<HTMLElement>(document.body);

  const createWrapper = useCallback(() => {
    let w = document.getElementById(id);
    if (!w) {
      w = document.createElement('div');
      w.setAttribute('id', id);
      document.body.appendChild(w);
    }

    setWrapper(w);
  }, [id]);

  const removeWrapper = () => {
    const w = document.getElementById(id);
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
