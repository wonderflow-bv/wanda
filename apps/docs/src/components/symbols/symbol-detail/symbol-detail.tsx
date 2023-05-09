import {
  Button,
  IconButton,
  Skeleton, Stack, Symbol, SymbolProps, Text,
} from '@wonderflow/react-components';
import { SymbolNames } from '@wonderflow/symbols';
import { useRouter } from 'next/router';
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
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  const handleShare = useCallback(
    () => () => {
      void navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_DOMAIN}${router.pathname}#${name.toLowerCase()}`);
      setTimeout(() => setIsCopied(false), 1000);
    }, [router, name],
  );

  const handleCopy = useCallback(
    (name: SymbolNames) => () => {
      navigator.clipboard.writeText(name).then(() => {
        setIsCopied(true);
      }, () => {
        setIsCopied(false);
      });
      setTimeout(() => setIsCopied(false), 1000);
    },
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await getRepoContent(`packages/symbols/svgs/${weight}/${name}-${weight}.svg`);

      setIconDetail(window.atob(data.content));
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

        <Stack rowGap={24} fill={false} hAlign="start">

          <Stack>
            <Text>Name</Text>
            <Stack direction="row" columnGap={8} inline vAlign="center">
              <Text variant="heading-4">{name}</Text>
              <IconButton icon="todo" dimension="small" onClick={handleCopy(name)} />
              {isCopied && <Symbol source="check" fill="var(--highlight-green-foreground)" dimension={12} />}
            </Stack>
          </Stack>

          <Button
            onClick={handleShare()}
            kind="secondary"
            dimension="small"
            icon="share-from-square"
          >
            Copy URL
          </Button>
        </Stack>
      </Stack>

      {iconDetail
        ? <Code className={styles.Code} language="html">{iconDetail}</Code> : (
          <Skeleton
            height={86}
            width={600}
          />
        )}
    </>
  );
};
