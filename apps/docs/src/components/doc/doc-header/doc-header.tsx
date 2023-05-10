import { Stack, Text } from '@wonderflow/react-components';

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
  <Stack rowGap={32} {...otherProps}>
    <Stack rowGap={8}>
      {preTitle && (
        <Text className={styles.Pretitle} variant="subtitle-1">
          <GradientText color={color}>{preTitle}</GradientText>
        </Text>
      )}
      {title && <Text as="h1" variant="display-3">{title}</Text>}
      {subtitle && <Text variant="heading-6" color="neutral" style={{ fontWeight: '400' }}>{subtitle}</Text>}
    </Stack>
    <span className={styles.Separator} />
  </Stack>
);
