import { IconNames } from '@wonderflow/icons';
import {
  Card, Icon, Stack, Text, Title,
} from '@wonderflow/react-components';
import clsx from 'clsx';
import React from 'react';

import styles from './tile.module.css';

type TileProps = {
  symbol?: IconNames;
  symbolColor?: 'gray' | 'cyan' | 'green' | 'purple' | 'yellow' | 'red' | 'blue' | 'magenta' | 'violet' | 'indigo' | 'mint' | 'dipsy' | 'salmon';
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
        <Icon
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
      <Title className={styles.Title} as="h3" responsive={false} level="5">{title}</Title>
      {description && <Text dimmed={6} responsive={false} size={16}>{description}</Text>}
    </Stack>
  </Card>
);
