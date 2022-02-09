import { Stack, IconButton, Dropdown, Elevator, Card, Text, Chip } from '@wonderflow/react-components'
import { useCallback, Fragment, useState } from 'react'
import { Markdown } from '@/components/markdown'
import { CodeBlock } from '../code-block'
import { Prop } from './props-table'
import styles from './props-table.module.css'
import { useRouter } from 'next/router'

export const PropsTableRow = ({
  name,
  description,
  type,
  typeValue,
  typeLink,
  default: defaultValue,
  required
}: Prop) => {
  const [copied, setCopied] = useState<boolean>(false)
  const router = useRouter()

  const toMDCode = useCallback((value) => (
    <Markdown options={{ wrapper: Fragment }}>
      {`\`${value}\``}
    </Markdown>
  ), [])

  const handleCopyLink = useCallback(
    (propName: string) => () => {
      navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_DOMAIN}${router.asPath}#prop-${propName.toLowerCase()}`).then(() => {
        setCopied(true)
      }, () => {
        setCopied(false)
      })
      setTimeout(() => setCopied(false), 1000)
    }, [router.asPath])
  return (
    <Stack
      verticalAlign="center"
      direction="row"
      role="row"
      columnGap={4}
      className={styles.Row}
      fill={false}
      key={name}
      id={`prop-${name.toLowerCase()}`}
      data-props-table-link-copied={copied}
    >
      <div role="cell" className={styles.Cell}>
        <IconButton
          dimension="small"
          kind="flat"
          onClick={handleCopyLink(name)}
          icon="link"
        />
      </div>

      {/* Prop NAME and DESCRIPTION */}
      {name && (
      <div role="cell" className={styles.Cell}>
        {toMDCode(name)}
        {description && (
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
                  <Markdown options={{ wrapper: Fragment }}>{description}</Markdown>
                </Text>
              </Card>
            </Elevator>
          </Dropdown>
        )}
      </div>
      )}

      {/* Prop TYPE and TYPEVALUE */}
      {type && (
      <div role="cell" className={styles.Cell}>
        {Array.isArray(type)
          ? type.map(type => (
            <Fragment key={type}>
              {toMDCode(type)}
            </Fragment>
          ))
          : toMDCode(type)}
        {typeValue && (
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
                <CodeBlock
                  showLanguage={false}
                  className={styles.CodeBlock}
                  language="typescript"
                  actions={typeLink && (
                    <IconButton
                      as="a"
                      href={typeLink}
                      dimension="small"
                      kind="secondary"
                      icon="link"
                    />
                  )}
                  hideCopy
                >
                  {typeValue}
                </CodeBlock>
              </Card>
            </Elevator>
          </Dropdown>
        )}
        {required && <Chip color="yellow" dimension="small">required</Chip>}
      </div>
      )}

      {/* Prop DEFAULT VALUE */}
      <div role="cell" data-content-align="right" className={styles.Cell}>
        {defaultValue ? toMDCode(defaultValue) : '–'}
      </div>
    </Stack>
  )
}
