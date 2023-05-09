import { Stack, Text } from '@wonderflow/react-components';
import React from 'react';

import styles from './hint-card.module.css';

export type HintCardProps = PropsWithClass & {
  isBad?: boolean;
  image: string;
}

export const HintCard: FCChildren<HintCardProps> = ({
  children,
  isBad = false,
  image,
}) => {
  const title = !isBad ? 'Do' : 'Don\'t';

  return (
    <Stack
      as="figure"
      fill={false}
      className={styles.HintCard}
      vAlign="start"
      data-isbad={isBad}
      rowGap={8}
    >
      <div className={styles.ImageContainer}>
        <img alt="" src={image} loading="lazy" decoding="async" />
      </div>
      <div className={styles.Separator} />
      <Text variant="heading-6" className={styles.Title}>{title}</Text>
      {children && <figcaption>{children}</figcaption>}
    </Stack>
  );
};
