import clsx from 'clsx';
import { forwardRef } from 'react';

import { Button, ButtonProps, Polymorphic } from '@/components';

import * as styles from './icon-button.module.css';

export type IconButtonProps<T = Record<string, unknown>> = Pick<
ButtonProps,
'kind' | 'dimension' | 'icon' | 'disabled' | 'onClick' | 'busy'
> & T

type PolymorphicIconButton = Polymorphic.ForwardRefComponent<
Polymorphic.IntrinsicElement<typeof Button>,
IconButtonProps<Polymorphic.OwnProps<typeof Button>>
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
