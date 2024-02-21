import {
  Chip,
  Grid,
  IconButton,
  Separator, Stack, Text,
} from '@wonderflow/react-components';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useState } from 'react';
import Refractor from 'react-refractor';

import { Prop } from './props-blocks';
import styles from './props-blocks.module.css';

export const PropsBlock = ({
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
      vPadding={8}
      rowGap={24}
      className={styles.Block}
      id={`prop-${name}`}
      data-props-table-link-copied={isCopied}
    >
      {name && (
        <Stack direction="row" columnGap={4} fill={false}>
          <div>
            <Chip dimension="small" color={required ? 'red' : 'green'}>
              {name}
              {required ? '' : '?'}
            </Chip>
          </div>

          {typeLink && (
            <div className={styles.LinkButton}>
              <IconButton
                dimension="small"
                kind="flat"
                onClick={handleCopyLink(name)}
                icon="link"
              />
            </div>
          )}
        </Stack>
      )}

      <Grid columns={2} filling={false} rowGap={8} columnGap={4}>

        {description && (
          <>
            <Grid.Item>
              <Text variant="body-2"><b>Description</b></Text>
            </Grid.Item>

            <Grid.Item>
              <Text variant="body-2">
                {description}
              </Text>
            </Grid.Item>
          </>
        )}

        {type && (
          <>
            <Grid.Item>
              <Text variant="body-2"><b>Type</b></Text>
            </Grid.Item>

            <Grid.Item>
              <Text variant="body-2">
                {Array.isArray(type)
                  ? type.map((type, i) => (
                    <Fragment key={type}>
                      {i !== 0 && '|'}
                      <Text key={type} variant="body-2">
                        <Refractor language="typescript" value={type} className={styles.Code} />
                      </Text>
                    </Fragment>
                  ))
                  : (
                    <Text variant="body-2">
                      <Refractor language="typescript" value={type} className={styles.Code} />
                    </Text>
                  )}
              </Text>
            </Grid.Item>
          </>
        )}

        {defaultValue && (
          <>
            <Grid.Item>
              <Text variant="body-2"><b>Default</b></Text>
            </Grid.Item>

            <Grid.Item>
              <Text variant="body-2">
                <Refractor language="typescript" value={defaultValue} className={styles.Code} />
              </Text>
            </Grid.Item>
          </>
        )}

        {typeValue && (
          <>
            <Grid.Item>
              <Text variant="body-2"><b>Value</b></Text>
            </Grid.Item>

            <Grid.Item>
              <Text variant="body-2">
                <Refractor language="typescript" value={typeValue} className={styles.Code} />
              </Text>
            </Grid.Item>
          </>
        )}
      </Grid>

      <Separator style={{ marginTop: '0.5rem' }} />
    </Stack>
  );
};

