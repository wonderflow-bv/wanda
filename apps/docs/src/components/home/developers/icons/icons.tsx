import { IconNames } from '@wonderflow/icons';
import structure from '@wonderflow/icons/structure';
import { Icon, Stack } from '@wonderflow/react-components';
import { m } from 'framer-motion';
import { FC } from 'react';

import styles from './icons.module.css';

const ICONS = structure as IconNames[];

const GRID_ANIMATION = {
  hidden: {
    y: -10,
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 700,
      damping: 20,
      delayChildren: 0.03,
      staggerChildren: 0.002,
      staggerDirection: 1,
    },
  },
};

const ITEM_ANIMATION = {
  hidden: {
    y: 5,
    scale: 0,
    transition: {
      duration: 0,
    },
  },
  visible: {
    y: 0,
    scale: 1,
    transition: {
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
    className={styles.Icons}
    initial="hidden"
    exit="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    hPadding={16}
    direction="row"
    fill={false}
    wrap
  >
    {ICONS.map(icon => (
      <Stack
        key={`${icon}-duo`}
        as={m.div}
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 20,
        }}
        variants={ITEM_ANIMATION}
        hAlign="center"
        vAlign="center"
        hPadding={8}
        vPadding={8}
      >
        <Icon source={icon} dimension={18} weight="duotone" />
      </Stack>
    ))}
    {ICONS.map(icon => (
      <Stack
        key={`${icon}-solid`}
        as={m.div}
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 20,
        }}
        variants={ITEM_ANIMATION}
        hAlign="center"
        vAlign="center"
        hPadding={8}
        vPadding={8}
      >
        <Icon source={icon} dimension={18} weight="outline" />
      </Stack>
    ))}
  </Stack>
);
