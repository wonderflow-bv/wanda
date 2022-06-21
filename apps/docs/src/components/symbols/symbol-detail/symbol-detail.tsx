import {
  IconButton,
  Skeleton, Stack, Symbol, SymbolProps, Text, Title,
} from '@wonderflow/react-components';
import { SymbolNames } from '@wonderflow/symbols';
import prettify from 'html-prettify';
import {
  FC, useCallback, useEffect, useState,
} from 'react';

import { Code } from '@/components/shared/code';
import { getRepoContent } from '@/utils/github-client';

import styles from './symbol-detail.module.css';

type SymbolDetailProps = {
  name: SymbolNames;
  weight?: SymbolProps['weight'];
}

export const SymbolDetail: FC<SymbolDetailProps> = ({
  name,
  weight = 'duotone',
}) => {
  const [iconDetail, setIconDetail] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    (name: SymbolNames) => () => {
      navigator.clipboard.writeText(name).then(() => {
        setCopied(true);
      }, () => {
        setCopied(false);
      });
      setTimeout(() => setCopied(false), 1000);
    },
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await getRepoContent(`packages/symbols/svgs/${weight}/${name}-${weight}.svg`);

      setIconDetail(prettify(window.atob(data.content)));
    };

    fetchData().catch((err) => {
      throw new Error(err);
    });

    return () => {
      setIconDetail('');
    };
  },
  [name, weight]);

  return (
    <>
      <Stack
        direction="row"
        hPadding={24}
        vPadding={32}
        fill={false}
        hAlign="start"
        vAlign="center"
        columnGap={32}
      >
        <span className={styles.IconPreview}>
          <Symbol source={name} dimension={24} weight={weight} />
        </span>

        <Stack rowGap={24}>
          <Stack>
            <Text dimmed={6} size={16}>Name</Text>
            <Stack direction="row" columnGap={8} inline vAlign="center">
              <Title level="5">{name}</Title>
              <IconButton icon="todo" dimension="small" onClick={handleCopy(name)} />
              {copied && <Symbol source="check" fill="var(--highlight-green-foreground)" dimension={12} />}
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {iconDetail
        ? <Code className={styles.Code} source={iconDetail} language="html" /> : (
          <Skeleton
            height={100}
            width={600}
          />
        )}
    </>
  );
};
