import { Grid, Stack, Text } from '@wonderflow/react-components';
import { SymbolNames } from '@wonderflow/symbols';
import { NextPage } from 'next';
import { useEffect } from 'react';
import slugify from 'slugify';
import {
  ResourcesDocument, ResourcesQuery,
} from 'src/generated/graphql';

import { Tile } from '@/components/shared/tile';
import { useToc } from '@/hooks/table-of-content';
import cmsClient from '@/utils/apollo-client';
import { getLayoutProps } from '@/utils/get-layout-props';

const ResourcesPage: NextPage<ResourcesQuery> = ({ resourceGroups }) => {
  const { updateHeadings } = useToc();

  useEffect(() => {
    updateHeadings(
      resourceGroups.map(({ groupName }) => ({
        id: slugify(groupName, { lower: true }),
        title: groupName,
      })),
    );

    return () => {
      updateHeadings([]);
    };
  }, [resourceGroups, updateHeadings]);

  return (
    <Stack rowGap={80} vPadding={56}>
      {resourceGroups?.map(group => (
        <Stack as="section" rowGap={24} key={group.id}>
          <Text as="h2" variant="heading-5">{group.groupName}</Text>
          <Grid
            columns={2}
            colMinWidth="20rem"
            columnGap={4}
            rowGap={4}
          >
            {group.resources?.map(res => (
              <Grid.Item key={res.title}>
                <Tile
                  title={res.title}
                  description={res.description}
                  symbol={group.groupSymbol as SymbolNames}
                  symbolColor={group.groupColor}
                  url={res.url}
                />
              </Grid.Item>
            ))}
          </Grid>
        </Stack>
      ))}
    </Stack>
  );
};

export default ResourcesPage;

export const getStaticProps = async () => {
  const { data } = await cmsClient.query<ResourcesQuery>({
    query: ResourcesDocument,
  });

  return getLayoutProps({
    ...data,
    layout: 'doc',
    layoutProps: {
      title: 'Resources',
      color: 'salmon',
      subtitle: 'Useful assets to design at Wonderflow',
      showToc: false,
    },
  },
  {
    revalidate: 60,
  });
};
