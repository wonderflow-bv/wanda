import { HTMLAttributes, PropsWithChildren } from 'react';

interface IPropsBaseLayout extends PropsWithChildren<HTMLAttributes<HTMLElement>> {}

export const BaseLayout: FCChildren<IPropsBaseLayout> = ({ children }) => (
  <>{children}</>
);
