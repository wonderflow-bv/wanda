import {
  Card, Elevator, IconButton, Popover, Stack, Text,
} from '@wonderflow/react-components';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useState } from 'react';

import { Code } from '@/components/shared/code';
import { useDocLayoutContext } from '@/src/hooks/doc-colors';

import { Prop } from './value-table';
import styles from './value-table.module.css';

export const ValueTableRow = ({
  name,
  description,
  type,
  typeValue,
  typeLink,
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
      id={`value-${name.toLowerCase()}`}
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
          <Text as="code" size={14}>{name}</Text>
        </div>
      )}

      {/* Value TYPE */}
      {type && (
        <div role="cell" className={styles.Cell}>
          {Array.isArray(type)
            ? type.map((type, i) => (
              <Fragment key={type}>
                {i !== 0 && '|'}
                <Text key={type} as="code" size={14}>{type}</Text>
              </Fragment>
            ))
            : <Text as="code" size={14}>{type}</Text>}
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

      {/* DESCRIPTION */}
      {description && (
        <div role="cell" className={styles.Cell}>
          <Text size={14}>{description}</Text>
        </div>
      )}
    </Stack>
  );
};

