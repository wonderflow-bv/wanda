import { IconNames } from '@wonderflow/icons';
import structure from '@wonderflow/icons/structure';
import { Icon, Stack } from '@wonderflow/react-components';
import { FC } from 'react';

import styles from './icons.module.css';

const ICONS = structure.slice(0, 49) as IconNames[];

export const Icons: FC = () => (
  <Stack
    className={styles.Icons}
    hPadding={32}
    direction="row"
    fill={false}
    wrap
    rowGap={56}
    columnGap={64}
  >
    {ICONS.map(icon => (
      <Icon source={icon} dimension={24} weight="duotone" />
    ))}
  </Stack>
);
