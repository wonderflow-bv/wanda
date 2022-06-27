import {
  Card, Dropdown, Elevator, IconButton, Stack, Text,
} from '@wonderflow/react-components';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useState } from 'react';

import { Code } from '@/components/shared/code';
import { Markdown } from '@/components/shared/markdown';

import { Prop } from './props-table';
import styles from './props-table.module.css';

export const PropsTableRow = ({
  name,
  description,
  type,
  typeValue,
  typeLink,
  default: defaultValue,
  required,
}: Prop) => {
  const [copied, setCopied] = useState<boolean>(false);
  const router = useRouter();

  const handleCopyLink = useCallback(
    (propName: string) => () => {
      navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_DOMAIN}${router.asPath}#prop-${propName.toLowerCase()}`).then(() => {
        setCopied(true);
      }, () => {
        setCopied(false);
      });
      setTimeout(() => setCopied(false), 1000);
    }, [router.asPath],
  );
  return (
    <Stack
      vAlign="center"
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
        {description && (
          <Dropdown
            placement="top-start"
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
              <Card dimmed={0} bordered className={styles.Dropdown}>
                <Markdown options={{ wrapper: Fragment }}>{description}</Markdown>
              </Card>
            </Elevator>
          </Dropdown>
        )}
        <Text as="code" size={14}>{name}</Text>
        {required && <Text as="span" sentiment="warning" size={14}>*</Text>}
      </div>
      )}

      {/* Prop TYPE and TYPEVALUE */}
      {type && (
      <div role="cell" className={styles.Cell}>
        {Array.isArray(type)
          ? type.map(type => (
            <Text key={type} as="code" size={14}>{type}</Text>
          ))
          : <Text as="code" size={14}>{type}</Text>}
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
                <Code
                  className={styles.Code}
                  language="typescript"
                  hideCopy
                  showLanguage={false}
                  actions={typeLink && (
                    <IconButton
                      as="a"
                      href={typeLink}
                      dimension="small"
                      kind="secondary"
                      icon="link"
                    />
                  )}
                >
                  {typeValue}
                </Code>
              </Card>
            </Elevator>
          </Dropdown>
        )}
      </div>
      )}

      {/* Prop DEFAULT VALUE */}
      <div role="cell" data-content-align="right" className={styles.Cell}>
        {defaultValue && <Text as="code" size={14}>{defaultValue}</Text>}
      </div>
    </Stack>
  );
};

