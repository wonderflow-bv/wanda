import clsx from 'clsx'
import Markdown from 'markdown-to-jsx'
import React from 'react'
import { Stack, Separator, Text, Title, Snackbar, Disclosure } from '@wonderflow/react-components'

import { Props as PropsClass, PropName, PropsValue } from './props.module.css'

type PropsProps = {
  open?: boolean;
  properties: Record<string, any>[];
} & PropsWithClass

export const Props: React.FC<PropsProps> = ({
  className,
  open = true,
  properties,
  ...props
}) => (
  <Stack
    className={clsx(PropsClass, className)}
    rowGap={24}
    {...props}
  >
    {properties.map(item => (
      <Disclosure
        key={Math.random()}
        open
        dimension="big"
        padding={false}
        expandable={false}
        summary={(
          <Stack as="span" direction="row" fill={false} verticalAlign="center" columnGap={8}>
            <Title as="span" level="6"><Markdown>{`\`${item.name}\``}</Markdown></Title>
            {item.required && <small><Markdown>`required`</Markdown></small>}
          </Stack>
        )}
      >
        <Stack rowGap={8}>
          <Separator />
          {item.type && (
            <Stack direction="row" fill={false} wrap columnGap={16} rowGap={8}>
              <Text as="b" size={16} className={PropName}>Type:</Text>
              <Text size={16} className={PropsValue}>
                {item.type.map((value: any, index: any) => <Markdown key={value}>{`${index !== 0 ? ', ' : ''}\`${value}\``}</Markdown>)}
              </Text>
            </Stack>
          )}

          {item.default && (
            <Stack direction="row" fill={false} wrap columnGap={16} rowGap={8}>
              <Text as="b" size={16} className={PropName}>Default:</Text>
              <Text size={16} className={PropsValue}><Markdown>{`\`${item.default || 'null'}\``}</Markdown></Text>
            </Stack>
          )}

          {item.description && (
            <Text size={16} className={PropsValue}><Markdown>{item.description}</Markdown></Text>
          )}

          {item.dangerous && (
            <Snackbar kind="warning">
              Using this prop is dangerous and may leads to some type validation
              issue.
            </Snackbar>
          )}
        </Stack>
      </Disclosure>
    ))}
  </Stack>
)
