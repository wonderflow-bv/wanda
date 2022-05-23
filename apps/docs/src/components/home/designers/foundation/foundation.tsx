import { Grid, Stack, Text } from '@wonderflow/react-components';
import tkns from '@wonderflow/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { m, motion } from 'framer-motion';
import { FC } from 'react';

import styles from './foundation.module.css';

const COLORS = ['indigo', 'mint', 'yellow', 'magenta'];

const CARD_ANIMATION = {
  hidden: {
    y: 20,
    opacity: 0,
    transition: {
      duration: 0.1,
      staggerChildren: 0.02,
      delayChildren: 0.2,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delayChildren: 0.1,
      staggerChildren: 0.05,
      staggerDirection: 1,
    },
  },
};
const ITEM_ANIMATION = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const ColorItem: FC<{label: string; color: string; index: number}> = ({ label, color, index }) => (
  <Stack
    as={motion.div}
    variants={ITEM_ANIMATION}
    key={color}
    direction="row"
    hAlign="start"
    vAlign="center"
    columnGap={8}
    fill={false}
    inline
  >
    <span style={{
      borderRadius: '100%',
      flexShrink: 0,
      background: `hsl(${color})`,
      width: 24,
      height: 24,
    }}
    />
    <Text weight="bold" size={16}>{`${label}-${index + 1}0`}</Text>
  </Stack>
);

export const Foundation: FCClass = ({
  className,
  ...otherProps
}) => (
  <Stack
    as={m.div}
    rowGap={32}
    variants={CARD_ANIMATION}
    initial="hidden"
    exit="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className={clsx(styles.Card, className)}
    {...otherProps}
  >
    <Grid columns={2} rows={2} colMinWidth="50%" rowGap={32}>
      {COLORS.map(color => (
        <Grid.Item key={color}>
          <Stack rowGap={16} columnGap={48}>
            {[...Array(5)].map((_, i) => (
              <ColorItem
                label={color}
                color={tkns.color[color][`${i + 1}0`]}
                index={i}
                key={tkns.color[color][`${i + 1}0`]}
              />
            ))}
          </Stack>
        </Grid.Item>
      ))}
    </Grid>
  </Stack>
);
