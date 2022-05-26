import {
  Avatar,
  Button, Checkbox, Chip, CircularProgress, Icon,
  LinearProgress, Masonry, Pagination, Select, Slider,
  Spinner, Stack,
  StarMeter, Toggle, ToggleButton,
} from '@wonderflow/react-components';
import { m } from 'framer-motion';

import styles from './components.module.css';

const WRAPPER_ANIMATION = {
  hidden: {
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05,
      staggerDirection: 1,
      type: 'spring',
      duration: 1.2,
    },
  },
};

const ITEM_ANIMATION = {
  hidden: {
    scale: 1.2,
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 700,
      damping: 20,
    },
  },
};

export const Components = () => (
  <m.div
    variants={WRAPPER_ANIMATION}
    initial="hidden"
    exit="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >

    <Masonry
      gutter={8}
      className={styles.Components}
      columns={{
        default: 3,
        small: 3,
      }}
    >
      <Stack as={m.div} variants={ITEM_ANIMATION} className={styles.Card} vPadding={24} hPadding={24} hAlign="center" vAlign="center">
        <Toggle />
      </Stack>
      <Stack as={m.div} variants={ITEM_ANIMATION} className={styles.Card} vPadding={24} hPadding={24} hAlign="center" vAlign="center">
        <Button dimension="big">Button</Button>
      </Stack>
      <Stack as={m.div} variants={ITEM_ANIMATION} className={styles.Card} vPadding={24} hPadding={24} vAlign="center">
        <Select label="Label" dimension="big">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
        </Select>
      </Stack>
      <Stack as={m.div} variants={ITEM_ANIMATION} direction="row" wrap rowGap={8} columnGap={8}>
        <Stack as={m.div} variants={ITEM_ANIMATION} className={styles.Card} vPadding={24} hPadding={24} hAlign="center" vAlign="center" fill={false}>
          <Checkbox defaultChecked />
        </Stack>
        <Stack as={m.div} variants={ITEM_ANIMATION} className={styles.Card} vPadding={24} hPadding={24} hAlign="center" vAlign="center">
          <ToggleButton dimension="big" restingIcon="play" pressedIcon="pause" pressed />
        </Stack>
      </Stack>
      <Stack as={m.div} variants={ITEM_ANIMATION} className={styles.Card} vPadding={24} hPadding={24} hAlign="center" vAlign="center">
        <Slider defaultValue={80} dimension="small" iconMin="moon" iconMax="sun-bright" />
      </Stack>
      <Stack as={m.div} variants={ITEM_ANIMATION} direction="row" wrap rowGap={8} columnGap={8}>
        <Stack as={m.div} variants={ITEM_ANIMATION} className={styles.Card} vPadding={24} hPadding={24} hAlign="center" vAlign="center">
          <Avatar
            dimension="big"
            src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
          />
        </Stack>
        <Stack as={m.div} variants={ITEM_ANIMATION} className={styles.Card} vPadding={24} hPadding={24} hAlign="center" vAlign="center">
          <Spinner />
        </Stack>
      </Stack>
      <Stack as={m.div} variants={ITEM_ANIMATION} className={styles.Card} vPadding={24} hPadding={24} hAlign="center" vAlign="center">
        <div style={{ width: '100%' }}>
          <LinearProgress value={35} dimension="big" />
        </div>
      </Stack>
      <Stack as={m.div} variants={ITEM_ANIMATION} direction="row" wrap className={styles.Card} vPadding={24} hPadding={24} hAlign="center" vAlign="center">
        <Icon source="message" dimension={24} weight="duotone" />
        <Icon source="bell" dimension={24} weight="duotone" />
        <Icon source="book-bookmark" dimension={24} weight="duotone" />
        <Icon source="gear" dimension={24} weight="duotone" />
      </Stack>
      <Stack as={m.div} variants={ITEM_ANIMATION} className={styles.Card} vPadding={24} hPadding={24} hAlign="center" vAlign="center">
        <StarMeter value={3} dimension="big" />
      </Stack>
      <Stack as={m.div} variants={ITEM_ANIMATION} className={styles.Card} rowGap={8} vPadding={24} hPadding={24} hAlign="center" vAlign="center">
        <Chip color="green" dimension="small">#wanda</Chip>
        <Chip color="purple" dimension="small">#design</Chip>
        <Chip color="cyan" dimension="small">#system</Chip>
      </Stack>
      <Stack as={m.div} variants={ITEM_ANIMATION} className={styles.Card} vPadding={24} hPadding={24} hAlign="center" vAlign="center">
        <CircularProgress value={30} showProgress />
      </Stack>
      <Stack as={m.div} variants={ITEM_ANIMATION} className={styles.Card} vPadding={24} hPadding={24} hAlign="center" vAlign="center">
        <Pagination itemsCount={100} itemsPerPage={30} />
      </Stack>
    </Masonry>
  </m.div>
);
