import { Stack, Symbol, SymbolProps } from '@wonderflow/react-components';
import { ReactElement } from 'react';

import styles from './search-symbol.module.css';

type RadioButtonProps = {
  children: ReactElement<HTMLOrSVGElement>;
  weight: SymbolProps['weight'];
  checked?: boolean;
  onClick: () => void;
}

export const RadioButton = ({
  children,
  weight,
  checked,
  onClick,
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
      onChange={onClick}
      id={`${weight ?? 'No'}Style`}
      name="iconstyle"
      value="solid"
      defaultChecked={checked}
      className={styles.Input}
    />
    <Symbol
      source={children ?? 'disc'}
    />
  </Stack>
);
