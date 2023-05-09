import {
  Card, Stack, Symbol, Text,
} from '@wonderflow/react-components';
import { SymbolNames } from '@wonderflow/symbols';
import type { TokensTypes } from '@wonderflow/tokens/platforms/web';
import clsx from 'clsx';
import React from 'react';

import styles from './tile.module.css';

type TileProps = {
  symbol?: SymbolNames;
  symbolColor?: TokensTypes['colors'];
  title: string;
  description?: string;
  url?: string;
}

export const Tile: FCClass<TileProps> = ({
  className,
  symbol,
  symbolColor = 'gray',
  title,
  description,
  url,
  ...otherProps
}) => (
  <Card
    className={clsx(styles.Tile, className)}
    padding={32}
    bordered
    as="a"
    highlightOnHover
    href={url}
    vibrant
    dimmed={0}
    target={url?.startsWith('http') ? '_blank' : undefined}
    download={!url?.startsWith('http')}
    left={symbol && (
      <span
        className={styles.IconBullet}
        style={{ backgroundColor: `var(--highlight-${symbolColor}-background)` }}
      >
        <Symbol
          source={symbol}
          weight="duotone"
          fill={`var(--highlight-${symbolColor}-foreground)`}
          dimension={16}
        />
      </span>
    )}
    {...otherProps}
  >
    <Stack rowGap={32}>
      <Text className={styles.Title} as="h3" preventResponsive variant="heading-5">{title}</Text>
      {description && <Text preventResponsive>{description}</Text>}
    </Stack>
  </Card>
);
