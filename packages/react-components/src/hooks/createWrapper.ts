const createWrapper = (id: string) => {
  if (typeof window !== 'undefined') {
    let w = document.getElementById(id);

    if (!w) {
      w = document.createElement('div');
      w.setAttribute('id', id);
      w.style.position = 'relative';
      w.style.zIndex = '999';
      document.body.appendChild(w);
    }

    return w;
  }

  return undefined;
};

export default createWrapper;
