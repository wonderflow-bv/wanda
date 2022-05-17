import clsx from 'clsx';
import { forwardRef } from 'react';

import { Button, ButtonProps, Polymorphic } from '@/components';

import styles from './icon-button.module.css';

export type IconButtonProps = Pick<
ButtonProps,
'kind' | 'dimension' | 'icon' | 'disabled' | 'onClick' | 'busy'
>

type PolymorphicIconButton = Polymorphic.ForwardRefComponent<
Polymorphic.IntrinsicElement<typeof Button>,
Polymorphic.OwnProps<typeof Button> & IconButtonProps
>;

export const IconButton = forwardRef(({
  className,
  icon,
  dimension,
  kind,
  disabled,
  busy,
  ...otherProps
}, forwardedRef) => (
  <Button
    ref={forwardedRef}
    icon={icon}
    dimension={dimension}
    kind={kind}
    disabled={disabled}
    busy={busy}
    className={clsx(styles.IconButton, className)}
    {...otherProps}
  />
)) as PolymorphicIconButton;
