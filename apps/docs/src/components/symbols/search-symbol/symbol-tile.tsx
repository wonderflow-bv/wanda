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
// const [copied, setCopied] = useState<boolean>(false);

  // const handleCopy = useCallback(
  //   (icon: any) => () => {
  //     navigator.clipboard.writeText(icon).then(() => {
  //       setCopied(true);
  //     }, () => {
  //       setCopied(false);
  //     });
  //     setTimeout(() => setCopied(false), 1000);
  //   },
  //   [],
  // );

  <Stack
    as={BlankButton}
      // onClick={handleCopy(source)}
    onClick={onClick}
    className={styles.SymbolTile}
    data-icon-style={weight}
    hAlign="center"
      // data-icon-tile-copied={copied}
    vAlign="center"
    rowGap={24}
  >
    <Stack as="span" hAlign="center" vAlign="center" rowGap={16} fill={false}>
      <Symbol weight={weight} source={source} dimension={dimension} {...otherProps} />
    </Stack>
  </Stack>
);

