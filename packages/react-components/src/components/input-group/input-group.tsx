import clsx from 'clsx';
import {
  Children, cloneElement, forwardRef, isValidElement, ReactNode,
} from 'react';
import { useUIDSeed } from 'react-uid';

import { Stack, Text } from '@/components';

import styles from './input-group.module.css';

export type InputGroupProps = {
  /**
   * Pas the input element to decorate
   */
  input: ReactNode;
  /**
   * Add a decoration element after the input.
   */
  prefix?: ReactNode;
  /**
   * Add a decoration element before the input.
   */
  end?: ReactNode;
  /**
   * Add an accessible label to the componsed input group
   */
  suffix?: ReactNode;
  /**
   * Pass the dimension down to the imput element.
   */
  dimension?: 'small' | 'big' | 'regular';
  /**
   * Assign a label to the center field.
   */
  label?: string;
}

export const InputGroup = forwardRef<HTMLFieldSetElement, PropsWithClass<InputGroupProps>>(({
  className,
  input,
  suffix,
  prefix,
  label,
  dimension = 'regular',
  ...otherProps
}, forwardedRef) => {
  const seedID = useUIDSeed();

  return (
    <Stack
      rowGap={4}
      hAlign="stretch"
      vAlign="start"
      fill={false}
    >
      {label && <Text as="label" size={dimension === 'small' ? 14 : 16} htmlFor={seedID('field')}>{label}</Text>}
      <Stack
        as="fieldset"
        direction="row"
        vAlign="start"
        hAlign="start"
        fill={false}
        inline
        ref={forwardedRef}
        className={clsx(styles.InputGroup, className)}
        data-input-group-has-end={Boolean(suffix)}
        data-input-group-has-start={!!prefix}
        {...otherProps}
      >
        <div className={styles.Start}>
          {Children.map(prefix, child => isValidElement(child) && cloneElement(
            child,
            {
              dimension,
            },
          ))}
        </div>
        <div className={styles.InputField}>
          {Children.map(input, child => isValidElement(child) && cloneElement(
            child,
            {
              id: seedID('field'),
              dimension,
            },
          ))}
        </div>
        <div className={styles.End}>
          {Children.map(suffix, child => isValidElement(child) && cloneElement(
            child,
            {
              dimension,
            },
          ))}
        </div>
      </Stack>
    </Stack>
  );
});

InputGroup.displayName = 'InputGroup';
