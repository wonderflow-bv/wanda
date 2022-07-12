import { Stack, Symbol, SymbolProps } from '@wonderflow/react-components';
import { FC } from 'react';

import { BlankButton } from '@/components/shared/blank-button';

import styles from './search-symbol.module.css';

type SymbolTileProps = SymbolProps & {
  onClick: () => void;
}

export const SymbolTile: FC<SymbolTileProps> = ({
  source,
  weight,
  dimension,
  onClick,
  ...otherProps
}) => (
  <Stack
    as={BlankButton}
    onClick={onClick}
    className={styles.SymbolTile}
    data-icon-style={weight}
    hAlign="center"
    vAlign="center"
    rowGap={24}
  >
    <Stack as="span" hAlign="center" vAlign="center" rowGap={16} fill={false}>
      <Symbol weight={weight} source={source} dimension={dimension} {...otherProps} />
    </Stack>
  </Stack>
);

