import clsx from 'clsx';
import React, { ButtonHTMLAttributes } from 'react';

import styles from './blank-button.module.css';

type BlankButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void;
}

export const BlankButton: FCChildrenClass<BlankButtonProps> = ({
  children,
  className,
  onClick,
  ...props
}) => (
  <button onClick={onClick} type="button" className={clsx(styles.BlankButton, className)} {...props}>
    {children}
  </button>
);
