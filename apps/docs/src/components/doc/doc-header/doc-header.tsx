import { Stack, Text, Title } from '@wonderflow/react-components';

import styles from './doc-header.module.css';

export type DocHeaderProps = {
  preTitle?: string;
  title: string;
  subtitle?: string;
}

export const DocHeader: FCClass<DocHeaderProps> = ({
  preTitle,
  title,
  subtitle,
  ...otherProps
}) => (
  <Stack rowGap={48} {...otherProps}>
    <Stack rowGap={8}>
      {preTitle && <Text className={styles.Pretitle} weight="bold" size={18}>{preTitle}</Text>}
      {title && <Title as="h1" level="2">{title}</Title>}
      {subtitle && <Text size={28}>{subtitle}</Text>}
    </Stack>
    <span className={styles.Separator} />
  </Stack>
);
