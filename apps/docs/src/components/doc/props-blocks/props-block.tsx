import {
  Chip,
  Grid,
  IconButton,
  Separator, Stack, Text,
} from '@wonderflow/react-components';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useState } from 'react';
import Refractor from 'react-refractor';

import { Markdown } from '@/components/shared/markdown';

// import { useDocLayoutContext } from '@/src/hooks/doc-colors';
import { Prop } from './props-blocks';
import styled from './props-blocks.module.css';

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
  // const { layoutColor } = useDocLayoutContext();
  console.log(typeLink, isCopied);
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
    <Stack vPadding={8} rowGap={24} className={styled.Block}>
      {name && (
        <Stack direction="row" columnGap={4} fill={false}>
          <div>
            <Chip dimension="small" color={required ? 'red' : 'green'}>
              {name}
              {required ? '' : '?'}
            </Chip>
          </div>
          <div>
            <IconButton
              dimension="small"
              kind="flat"
              onClick={handleCopyLink(name)}
              icon="link"
            />
          </div>
        </Stack>
      )}

      <Grid columns={2} filling={false} rowGap={8} columnGap={4} className={styled.Grid}>

        {description && (
          <>
            <Grid.Item>
              <Text variant="body-3"><b>Description</b></Text>
            </Grid.Item>

            <Grid.Item>
              <Text variant="body-3"><Markdown options={{ wrapper: Fragment }}>{description}</Markdown></Text>
            </Grid.Item>
          </>
        )}

        {type && (
          <>
            <Grid.Item>
              <Text variant="body-3"><b>Type</b></Text>
            </Grid.Item>

            <Grid.Item>
              <Text variant="body-3">
                {Array.isArray(type)
                  ? type.map((type, i) => (
                    <Fragment key={type}>
                      {i !== 0 && '|'}
                      <Text key={type} as="code" variant="body-3">
                        <Refractor language="typescript" value={type} className={styled.Code} />
                      </Text>
                    </Fragment>
                  ))
                  : (
                    <Text as="code" variant="body-3">
                      <Refractor language="typescript" value={type} className={styled.Code} />
                    </Text>
                  )}
              </Text>
            </Grid.Item>
          </>
        )}

        {defaultValue && (
          <>
            <Grid.Item>
              <Text variant="body-3"><b>Default</b></Text>
            </Grid.Item>

            <Grid.Item>
              <Text variant="body-3">
                <Refractor language="typescript" value={defaultValue} className={styled.Code} />
              </Text>
            </Grid.Item>
          </>
        )}

        {typeValue && (
          <>
            <Grid.Item>
              <Text variant="body-3"><b>Value</b></Text>
            </Grid.Item>

            <Grid.Item>
              <Text variant="body-3">
                <Refractor language="typescript" value={typeValue} className={styled.Code} />
              </Text>
            </Grid.Item>
          </>
        )}
      </Grid>

      <Separator style={{ marginTop: '0.5rem' }} />
    </Stack>
  );
};

