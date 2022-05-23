import { IconNames } from '@wonderflow/icons';
import structure from '@wonderflow/icons/structure';
import { Icon, Stack } from '@wonderflow/react-components';
import { m } from 'framer-motion';
import { FC } from 'react';

import styles from './icons.module.css';

const ICONS = [...structure, ...structure] as IconNames[];

const GRID_ANIMATION = {
  hidden: {
    x: -30,
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delayChildren: 0.05,
      staggerChildren: 0.01,
      staggerDirection: 1,
    },
  },
};

const ITEM_ANIMATION = {
  hidden: {
    y: 5,
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.02,
      type: 'spring',
      stiffness: 700,
      damping: 20,
    },
  },
};

export const Icons: FC = () => (
  <Stack
    as={m.div}
    variants={GRID_ANIMATION}
    initial="hidden"
    exit="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className={styles.Icons}
    hPadding={32}
    direction="row"
    fill={false}
    wrap
    rowGap={4}
    columnGap={4}
  >
    {ICONS.map(icon => (
      <Stack
        key={icon}
        as={m.div}
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 20,
        }}
        variants={ITEM_ANIMATION}
        className={styles.Item}
        hAlign="center"
        vAlign="center"
        hPadding={8}
        vPadding={4}
      >
        <Icon source={icon} dimension={18} weight="duotone" />
      </Stack>
    ))}
  </Stack>
);
