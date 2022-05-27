import {
  ClampText, Icon, Stack, Text,
} from '@wonderflow/react-components';

import styles from './browser.module.css';

type BrowserProps = {
  url?: string;
  resize?: boolean;
}

export const Browser: FCChildrenClass<BrowserProps> = ({
  children,
  url = 'design.wonderflow.ai',
  resize,
  ...otherProps
}) => (
  <Stack
    className={styles.Window}
    vAlign="start"
    fill={false}
    aria-hidden="true"
    {...otherProps}
  >
    <div className={styles.Toolbar}>
      <Stack direction="row" columnGap={24} inline fill={false}>
        <Stack
          direction="row"
          columnGap={8}
          fill={false}
          vAlign="center"
          className={styles.TrafficLight}
        >
          <span />
          <span />
          <span />
        </Stack>
        <Stack direction="row" columnGap={8}>
          <Icon source="chevron-left" fill="var(--dimmed-4)" dimension={12} />
          <Icon source="chevron-right" fill="var(--dimmed-4)" dimension={12} />
        </Stack>
      </Stack>

      <Stack
        direction="row"
        className={styles.Address}
        hAlign="center"
        vAlign="center"
        vPadding={4}
        hPadding={4}
        fill={false}
        columnGap={8}
      >
        <Icon source="lock" fill="var(--dimmed-2)" dimension={12} />
        <Text size={14} dimmed={5} lineHeight="none">
          <ClampText rows={1}>{url}</ClampText>
        </Text>
      </Stack>

      <Stack direction="row" hAlign="end" fill={false}>
        <Icon source="grid" fill="var(--dimmed-4)" dimension={12} weight="duotone" />
      </Stack>
    </div>
    <div className={styles.Viewport}>
      {children}
    </div>
  </Stack>
);
