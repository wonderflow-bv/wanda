import { Grid, Stack, Text } from '@wonderflow/react-components';
import tkns from '@wonderflow/tokens/platforms/web/tokens.json';
import clsx from 'clsx';
import { m } from 'framer-motion';

import styles from './foundation.module.css';

const animation = {
  hidden: {
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
    },
  },
};

export const Foundation: FCClass = ({
  className,
  ...otherProps
}) => (
  <Stack
    as={m.div}
    rowGap={32}
    variants={animation}
    initial="hidden"
    exit="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className={clsx(styles.Card, className)}
    {...otherProps}
  >
    <Grid columns={2} rows={2} colMinWidth="50%" rowGap={32}>
      <Grid.Item>
        <Stack rowGap={16} columnGap={48}>
          {[...Array(5)].map((_, i) => (
            <Stack direction="row" hAlign="start" vAlign="center" columnGap={8} fill={false} inline>
              <span style={{
                borderRadius: '100%', background: `hsl(${tkns.color.indigo[`${i + 1}0`]})`, width: 24, height: 24,
              }}
              />
              <Text weight="bold">
                indigo-
                {`${i + 1}0`}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Grid.Item>
      <Grid.Item>
        <Stack rowGap={16}>
          {[...Array(5)].map((_, i) => (
            <Stack direction="row" hAlign="start" vAlign="center" columnGap={8} fill={false} inline>
              <span style={{
                borderRadius: '100%', background: `hsl(${tkns.color.mint[`${i + 1}0`]})`, width: 24, height: 24,
              }}
              />
              <Text weight="bold">
                mint-
                {`${i + 1}0`}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Grid.Item>
      <Grid.Item>
        <Stack rowGap={16} columnGap={48}>
          {[...Array(5)].map((_, i) => (
            <Stack direction="row" hAlign="start" vAlign="center" columnGap={8} fill={false} inline>
              <span style={{
                borderRadius: '100%', background: `hsl(${tkns.color.yellow[`${i + 1}0`]})`, width: 24, height: 24,
              }}
              />
              <Text weight="bold">
                yellow-
                {`${i + 1}0`}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Grid.Item>
      <Grid.Item>
        <Stack rowGap={16}>
          {[...Array(5)].map((_, i) => (
            <Stack direction="row" hAlign="start" vAlign="center" columnGap={8} fill={false} inline>
              <span style={{
                borderRadius: '100%', background: `hsl(${tkns.color.magenta[`${i + 1}0`]})`, width: 24, height: 24,
              }}
              />
              <Text weight="bold">
                magenta-
                {`${i + 1}0`}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Grid.Item>
    </Grid>
  </Stack>
);
