import { Grid, Stack, Title } from '@wonderflow/react-components';
import { SymbolNames } from '@wonderflow/symbols';
import { NextPage } from 'next';
import { useResourcesQuery } from 'src/generated/graphql';

import { Tile } from '@/components/shared/tile';
import { getLayoutProps } from '@/utils/get-layout-props';

const ResourcesPage: NextPage = () => {
  const { data, loading } = useResourcesQuery();

  return loading
    ? <>Loading...</>
    : (
      <Stack rowGap={80} vPadding={56}>
        {data?.resourceGroups.map(group => (
          <Stack as="section" rowGap={24} key={group.id}>
            <Title as="h2" level="5">{group.groupName}</Title>
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

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
  layoutProps: {
    title: 'Resources',
    color: 'salmon',
    subtitle: 'Useful assets to design at Wonderflow',
    showToc: false,
  },
});
