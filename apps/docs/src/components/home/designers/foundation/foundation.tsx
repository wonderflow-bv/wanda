import { IconNames } from '@wonderflow/icons';
import {
  Grid, Icon, IconProps, Stack, Text,
} from '@wonderflow/react-components';
import tkns from '@wonderflow/tokens/platforms/web/tokens.json';
import { m, motion } from 'framer-motion';
import { FC } from 'react';

import styles from './foundation.module.css';

const COLORS = ['blue', 'violet', 'dipsy', 'red', 'indigo', 'mint', 'yellow', 'magenta'];
const ICONS: IconNames[] = ['house', 'lock', 'crown', 'message', 'moon'];

const COLOR_ANIMATION = {
  hidden: {
    x: 70,
    y: 20,
    opacity: 0,
    transition: {
      duration: 0.1,
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

const ICONS_ANIMATION = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
  visible: {
    rotate: -10,
    x: -30,
    opacity: 1,
    transition: {
      delay: 1,
      duration: 0.5,
      delayChildren: 0.05,
      staggerChildren: 0.05,
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
      duration: 0.2,
    },
  },
};

type ListItemProps = {
  label: string;
  color: string;
  icon?: IconNames;
  iconWeight?: IconProps['weight'];
}

const ListItem: FC<ListItemProps> = ({
  label,
  color,
  icon,
  iconWeight,
}) => (
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
    {icon
      ? <Icon source={icon} dimension={24} fill={`hsl(${color})`} weight={iconWeight} />
      : (
        <span style={{
          borderRadius: '100%',
          flexShrink: 0,
          background: `hsl(${color})`,
          width: 24,
          height: 24,
        }}
        />
      )}
    <Text weight="bold" size={16}>{label}</Text>
  </Stack>
);

export const Foundation: FCClass = ({
  className,
  ...otherProps
}) => (
  <>
    <Stack
      as={m.div}
      rowGap={32}
      variants={ICONS_ANIMATION}
      initial="hidden"
      exit="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={styles.Card}
      {...otherProps}
    >
      <Grid columns={2} rows={2} colMinWidth="50%" rowGap={32}>
        {COLORS.slice(0, 4).map(color => (
          <Grid.Item key={color}>
            <Stack rowGap={16} columnGap={48}>
              {ICONS.slice(0, 5).map((icon, i) => (
                <ListItem
                  label={icon}
                  color={tkns.color[color][`${i + 1}0`]}
                  icon={icon}
                  key={tkns.color[color][`${i + 1}0`]}
                />
              ))}
            </Stack>
          </Grid.Item>
        ))}
      </Grid>
    </Stack>

    <Stack
      as={m.div}
      rowGap={32}
      variants={COLOR_ANIMATION}
      initial="hidden"
      exit="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={styles.Card}
      {...otherProps}
    >
      <Grid columns={2} rows={2} colMinWidth="50%" rowGap={32}>
        {COLORS.slice(4, 8).map(color => (
          <Grid.Item key={color}>
            <Stack rowGap={16} columnGap={48}>
              {[...Array(5)].map((_, i) => (
                <ListItem
                  label={`${color}-${i + 1}0`}
                  color={tkns.color[color][`${i + 1}0`]}
                  key={tkns.color[color][`${i + 1}0`]}
                />
              ))}
            </Stack>
          </Grid.Item>
        ))}
      </Grid>
    </Stack>
  </>
);
