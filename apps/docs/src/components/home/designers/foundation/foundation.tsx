import { SymbolNames } from '@wonderflow/icons';
import {
  Grid, Stack, Symbol, SymbolProps, Text,
} from '@wonderflow/react-components';
import tkns from '@wonderflow/tokens/platforms/web/tokens.json';
import { m } from 'framer-motion';

import styles from './foundation.module.css';

const COLORS = ['blue', 'violet', 'dipsy', 'red', 'indigo', 'mint', 'yellow', 'magenta'];
const ICONS: SymbolNames[] = ['house', 'lock', 'crown', 'message', 'moon'];

const cssEasingToArray = (cssEasing: string) => {
  const [x1, y1, x2, y2] = cssEasing.replace(/[^0-9.,]+/g, '').split(',').map(i => parseFloat(i));
  return [x1, y1, x2, y2];
};

const COLOR_ANIMATION = {
  hidden: {
    x: 100,
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
  visible: {
    x: 70,
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.01,
      staggerDirection: 1,
      type: 'spring',
      duration: 1.2,
    },
  },
};

const ICONS_ANIMATION = {
  hidden: {
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
  visible: {
    rotate: -10,
    x: -30,
    opacity: 1,
    transition: {
      delay: 0.3,
      delayChildren: 0.05,
      staggerChildren: 0.05,
      staggerDirection: 1,
      type: 'spring',
      duration: 1,
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
      ease: cssEasingToArray(tkns.easing.entrance),
    },
  },
};

type ListItemProps = {
  label: string;
  color: string;
  icon?: SymbolNames;
  iconWeight?: SymbolProps['weight'];
}

const ListItem: React.FC<ListItemProps> = ({
  label,
  color,
  icon,
  iconWeight,
}) => (
  <Stack
    as={m.div}
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
      ? <Symbol source={icon} dimension={24} fill={`hsl(${color})`} weight={iconWeight} />
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
      hPadding={48}
      vPadding={40}
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
      hPadding={48}
      vPadding={40}
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
