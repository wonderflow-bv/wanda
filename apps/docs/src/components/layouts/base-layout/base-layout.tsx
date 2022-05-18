import { domMax, LazyMotion } from 'framer-motion';
import { HTMLAttributes, PropsWithChildren } from 'react';

interface IPropsBaseLayout extends PropsWithChildren<HTMLAttributes<HTMLElement>> {}

export const BaseLayout: FCChildren<IPropsBaseLayout> = ({ children }) => (
  <LazyMotion features={domMax}>
    {children}
  </LazyMotion>
);
