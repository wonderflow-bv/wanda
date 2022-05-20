import { Stack, StackProps } from '@wonderflow/react-components';
import { CSSProperties } from 'react';

type SectionProps = StackProps & {
  minHeight?: string;
  position?: 'relative' | 'absolute';
}

export const Section: FCChildrenClass<SectionProps> = ({
  children,
  minHeight,
  position = 'relative',
  style,
  ...otherProps
}) => {
  const dynamicStyle: CSSProperties = {
    position,
    minHeight,
  };

  return (
    <Stack as="section" style={{ ...dynamicStyle, ...style }} {...otherProps}>
      {children}
    </Stack>
  );
};
