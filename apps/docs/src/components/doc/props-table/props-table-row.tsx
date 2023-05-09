import {
  Card, Elevator, IconButton, Popover, Stack, Text,
} from '@wonderflow/react-components';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useState } from 'react';

import { Code } from '@/components/shared/code';
import { Markdown } from '@/components/shared/markdown';
import { useDocLayoutContext } from '@/src/hooks/doc-colors';

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
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const router = useRouter();
  const { layoutColor } = useDocLayoutContext();

  const handleCopyLink = useCallback(
    (propName: string) => () => {
      navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_DOMAIN}${router.asPath}#prop-${propName.toLowerCase()}`).then(() => {
        setIsCopied(true);
      }, () => {
        setIsCopied(false);
      });
      setTimeout(() => setIsCopied(false), 1000);
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
      data-props-table-link-copied={isCopied}
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
            <Popover
              placement="top-start"
              trigger={(
                <IconButton
                  kind="flat"
                  icon="circle-info"
                  iconColor={`var(--highlight-${layoutColor}-foreground)`}
                  aria-label="Show property description"
                />
              )}
            >
              <Elevator resting={2}>
                <Card dimmed={0} bordered className={styles.Dropdown}>
                  <Markdown options={{ wrapper: Fragment }}>{description}</Markdown>
                </Card>
              </Elevator>
            </Popover>
          )}
          <Text as="code" variant="body-2">{name}</Text>
          {required && <Text as="span" color="warning" variant="body-2">*</Text>}
        </div>
      )}

      {/* Prop TYPE and TYPEVALUE */}
      {type && (
        <div role="cell" className={styles.Cell}>
          {Array.isArray(type)
            ? type.map((type, i) => (
              <Fragment key={type}>
                {i !== 0 && '|'}
                <Text key={type} as="code" variant="body-2">{type}</Text>
              </Fragment>
            ))
            : <Text as="code" variant="body-2">{type}</Text>}
          {typeValue && (
            <Popover
              placement="top"
              trigger={(
                <IconButton
                  kind="flat"
                  icon="circle-info"
                  iconColor={`var(--highlight-${layoutColor}-foreground)`}
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
            </Popover>
          )}
        </div>
      )}

      {/* Prop DEFAULT VALUE */}
      <div role="cell" data-content-align="right" className={styles.Cell}>
        {defaultValue && <Text as="code" variant="body-2">{defaultValue}</Text>}
      </div>
    </Stack>
  );
};

