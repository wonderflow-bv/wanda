import clsx from 'clsx'
import { Markdown } from '@/components/markdown'
import styles from './props-table.module.css'
import { useCallback, Fragment } from 'react'
import { Card, Chip, Dropdown, Icon, IconButton, Stack, Text, Elevator } from '@wonderflow/react-components'
import { CodeBlock } from '../code-block'

type Prop = {
  name: string
  description?: string
  type: string
  typeValue: string
  default?: string
  required?: boolean
}

export type PropsTableProps = PropsWithClass & {
  properties: Array<Prop>
}

export const PropsTable = ({
  className,
  properties,
  ...otherProps
}: PropsTableProps) => {
  const toMDCode = useCallback((value) => (
    <Markdown options={{ wrapper: Fragment }}>
      {`\`${value}\``}
    </Markdown>
  ), [])

  return (
    <Stack
      className={clsx(styles.TableProps, className)}
      fill={false}
      verticalAlign="start"
      role="table"
      {...otherProps}
    >
      <div role="rowgroup">
        <Stack
          verticalAlign="center"
          direction="row"
          columnGap={4}
          role="row"
        >
          <div role="columnheader" className={styles.Cell} />
          <div role="columnheader" className={styles.Cell}>
            <Text as="span" weight="bold" dimmed={6}>Property</Text>
          </div>
          <div role="columnheader" className={styles.Cell}>
            <Text as="span" weight="bold" dimmed={6}>Type</Text>
          </div>
          <div role="columnheader" className={styles.Cell} data-content-align="right">
            <Text as="span" weight="bold" dimmed={6}>Default</Text>
          </div>
        </Stack>
      </div>

      <Stack rowGap={8} role="rowgroup">
        {properties.map(item => item.name && (
        <Stack
          verticalAlign="center"
          direction="row"
          role="row"
          columnGap={4}
          className={styles.Row}
          fill={false}
          key={item.name}
          id={`prop-${item.name}`}
        >
          <div role="cell" className={styles.Cell}>
            <Text
              as="a"
              href={`#prop-${item.name}`}
              size={14}
              weight="bold"
              dimmed={5}
            >
              <Icon source="link" dimension={12} />
            </Text>
          </div>

          {/* Prop NAME and DESCRIPTION */}
          {item.name && (
            <div role="cell" className={styles.Cell}>
              {toMDCode(item.name)}
              {item.description && (
                <Dropdown
                  placement="top"
                  trigger={(
                    <IconButton
                      kind="flat"
                      icon="circle-info"
                      iconColor="var(--highlight-cyan-foreground)"
                      aria-label="Show property description"
                    />
                  )}
                >
                  <Elevator resting={2}>
                    <Card bordered className={styles.Dropdown}>
                      <Text as="div" size={16}>
                        <Markdown options={{ wrapper: Fragment }}>{item.description}</Markdown>
                      </Text>
                    </Card>
                  </Elevator>
                </Dropdown>
              )}
            </div>
          )}

          {/* Prop TYPE and TYPEVALUE */}
          {item.type && (
            <div role="cell" className={styles.Cell}>
              {toMDCode(item.type)}
              {item.typeValue && (
                <Dropdown
                  placement="top"
                  trigger={(
                    <IconButton
                      kind="flat"
                      icon="circle-info"
                      iconColor="var(--highlight-cyan-foreground)"
                      aria-label="Show extra type information"
                    />
                  )}
                >
                  <Elevator resting={2}>
                    <Card bordered padding={false} className={styles.Dropdown}>
                      <CodeBlock showLanguage={false} className={styles.CodeBlock} language="typescript" hideCopy>
                        {item.typeValue}
                      </CodeBlock>
                    </Card>
                  </Elevator>
                </Dropdown>
              )}
              {item.required && <Chip color="yellow" dimension="small">required</Chip>}
            </div>
          )}

          {/* Prop DEFAULT VALUE */}
          <div role="cell" data-content-align="right" className={styles.Cell}>
            {item.default ? toMDCode(item.default) : '–'}
          </div>
        </Stack>
        ))}
      </Stack>
    </Stack>
  )
}
