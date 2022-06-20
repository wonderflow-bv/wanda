import { Skeleton, Stack } from '@wonderflow/react-components';
import { SymbolNames } from '@wonderflow/symbols';
import prettify from 'html-prettify';
import { FC, useEffect, useState } from 'react';

import { Code } from '@/components/shared/code';
import { getRepoContent } from '@/utils/github-client';

import styles from './symbol-detail.module.css';

type SymbolDetailProps = {
  name: SymbolNames;
}

type IconDetailType = {
  name?: string;
  content?: string;
}

export const SymbolDetail: FC<SymbolDetailProps> = ({
  name,
}) => {
  const [iconDetail, setIconDetail] = useState<IconDetailType>({});

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await getRepoContent(`packages/symbols/svgs/solid/${name}-solid.svg`);

      setIconDetail({
        name: data.name,
        content: prettify(window.atob(data.content)),
      });
    };

    fetchData().catch((err) => {
      throw new Error(err);
    });

    return () => {
      setIconDetail({});
    };
  },
  [name]);

  return (
    <Stack>
      {iconDetail?.content
        ? <Code className={styles.Code} source={iconDetail.content} language="html" /> : (
          <Skeleton
            height={318}
            width="100%"
          />
        )}
      ciao
    </Stack>
  );
};
