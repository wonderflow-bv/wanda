import { Stack, Symbol, SymbolProps } from '@wonderflow/react-components';
import { InputHTMLAttributes, ReactElement } from 'react';

import styles from './search-symbol.module.css';

type RadioButtonProps = InputHTMLAttributes<HTMLInputElement> & {
  children: ReactElement<HTMLOrSVGElement>;
  weight: SymbolProps['weight'];
  checked?: boolean;
  onChange: () => void;
}

export const RadioButton = ({
  children,
  weight,
  checked,
  onChange,
  ...otherProps
}: RadioButtonProps) => (
  <Stack
    as="label"
    fill={false}
    htmlFor={`${weight ?? 'No'}Style`}
    className={styles.RadioButton}
    data-checked={checked}
    vAlign="center"
    hAlign="center"
    direction="row"
    columnGap={16}
    vPadding={16}
    hPadding={16}
  >
    <input
      type="radio"
      onChange={onChange}
      id={`${weight ?? 'No'}Style`}
      value="solid"
      defaultChecked={checked}
      className={styles.Input}
      {...otherProps}
    />
    <Symbol
      source={children ?? 'disc'}
    />
  </Stack>
);
