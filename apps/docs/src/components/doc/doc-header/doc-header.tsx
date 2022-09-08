import { Stack, Text, Title } from '@wonderflow/react-components';

import { GradientText, GradientTextProps } from '@/components/shared/gradient-text';

import styles from './doc-header.module.css';

export type DocHeaderProps = {
  preTitle?: string;
  title: string;
  subtitle?: string;
  color: GradientTextProps['color'];
}

export const DocHeader: FCClass<DocHeaderProps> = ({
  preTitle,
  title,
  subtitle,
  color,
  ...otherProps
}) => (
  <Stack rowGap={48} {...otherProps}>
    <Stack rowGap={8}>
      {preTitle && (
      <Text className={styles.Pretitle} weight="bold" size={18}>
        <GradientText color={color}>{preTitle}</GradientText>
      </Text>
      )}
      {title && <Title as="h1" level="1">{title}</Title>}
      {subtitle && <Text size={28}>{subtitle}</Text>}
    </Stack>
    <span className={styles.Separator} />
  </Stack>
);
