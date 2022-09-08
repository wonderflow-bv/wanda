import { Stack, Symbol } from '@wonderflow/react-components';
import { SymbolNames } from '@wonderflow/symbols';
import structure from '@wonderflow/symbols/structure';
import { m } from 'framer-motion';
import { FC } from 'react';

import * as styles from './symbols.module.css';

const SYMBOLS = structure as SymbolNames[];

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

export const Symbols: FC = () => (
  <Stack
    as={m.div}
    variants={GRID_ANIMATION}
    className={styles.Symbols}
    initial="hidden"
    exit="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    hPadding={16}
    direction="row"
    fill={false}
    wrap
  >
    {[...SYMBOLS, ...SYMBOLS].map(symbol => (
      <Stack
        key={`${symbol}-duo`}
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
        <Symbol source={symbol} dimension={18} weight="duotone" />
      </Stack>
    ))}
  </Stack>
);
