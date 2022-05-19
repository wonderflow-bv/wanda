import { Stack, StackProps } from '@wonderflow/react-components';
import { CSSProperties } from 'react';

type SectionProps = StackProps & {
  minHeight?: string;
}

export const Section: FCChildrenClass<SectionProps> = ({
  children,
  minHeight,
  style,
  ...otherProps
}) => {
  const dynamicStyle: CSSProperties = {
    minHeight,
  };

  return (
    <Stack as="section" style={{ ...dynamicStyle, ...style }} {...otherProps}>
      {children}
    </Stack>
  );
};
