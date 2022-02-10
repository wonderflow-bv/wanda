import clsx from 'clsx'
import { Children, cloneElement, forwardRef, ReactNode } from 'react'
import { Stack, Text } from '@/components'
import { useUIDSeed } from 'react-uid'
import styles from './input-group.module.css'

export type InputGroupProps = PropsWithClass & {
  /**
   * Pas the input element to decorate
   */
  input: ReactNode;
  /**
   * Add a decoration element after the input.
   */
  start?: ReactNode;
  /**
   * Add a decoration element before the input.
   */
  end?: ReactNode;
  /**
   * Add an accessible label to the componsed input group
   */
  label?: ReactNode;
  /**
   * Pass the dimension down to the imput element.
   */
  dimension?: 'small' | 'big' | 'regular';
}

export const InputGroup = forwardRef<HTMLFieldSetElement, InputGroupProps>(({
  className,
  input,
  end,
  start,
  label,
  dimension = 'regular',
  ...otherProps
}, forwardedRef) => {
  const seedID = useUIDSeed()

  return (
    <Stack
      rowGap={4}
      horizontalAlign="stretch"
      verticalAlign="start"
      fill={false}
    >
      {label && <Text as="label" size={dimension === 'small' ? 14 : 16} htmlFor={seedID('field')}>{label}</Text>}
      <Stack
        as="fieldset"
        direction="row"
        verticalAlign="start"
        horizontalAlign="start"
        fill={false}
        inline
        ref={forwardedRef}
        className={clsx(styles.InputGroup, className)}
        data-input-group-has-end={Boolean(end)}
        data-input-group-has-start={!!start}
        {...otherProps}
      >
        <div className={styles.Start}>
          {Children.map(start, (child: any) => cloneElement(
            child,
            {
              dimension
            }
          ))}
        </div>
        <div className={styles.InputField}>
          {Children.map(input, (child: any) => cloneElement(
            child,
            {
              id: seedID('field'),
              dimension
            }
          ))}
        </div>
        <div className={styles.End}>
          {Children.map(end, (child: any) => cloneElement(
            child,
            {
              dimension
            }
          ))}
        </div>
      </Stack>
    </Stack>
  )
})

InputGroup.displayName = 'InputGroup'
