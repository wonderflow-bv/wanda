import { Skeleton, Stack } from '@wonderflow/react-components';
import { SymbolNames } from '@wonderflow/symbols';
import { FC, useEffect, useState } from 'react';

import { Code } from '@/components/shared/code';
import { getRepoContent } from '@/utils/github-client';

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
        content: window.atob(data.content),
      });
    };

    fetchData().catch(console.error);

    return () => {
      setIconDetail({});
    };
  },
  [name]);

  return (
    <Stack hPadding={24} vPadding={24}>
      {iconDetail?.content
        ? <Code source={iconDetail.content} language="html" /> : (
          <Skeleton
            height={318}
            width={552}
          />
        )}
      ciao
    </Stack>
  );
};
