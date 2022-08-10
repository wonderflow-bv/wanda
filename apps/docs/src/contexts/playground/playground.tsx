import constate from 'constate';
import { useState } from 'react';

const usePlayground = () => {
  const [component, setComponent] = useState('app');

  return { component, setComponent };
};

export const [
  PlaygroundProvider,
  usePlaygroundContext,
] = constate(usePlayground);
