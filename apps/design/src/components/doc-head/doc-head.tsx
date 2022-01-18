import React from 'react'
import { Stack, Title, Text } from '@wonderflow/react-components'

export type DocHeadProps = {
  title: string;
  description?: string;
}

export const DocHead: React.FC<DocHeadProps> = ({
  children,
  title,
  description,
  ...props
}) => {
  return (
    <Stack horizontalAlign="start" rowGap={16} {...props}>
      <Title as="h1" level="1">{title}</Title>
      <Text size={28} dimmed={6}>{description}</Text>
      {children}
    </Stack>
  )
}
