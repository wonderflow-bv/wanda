import { Skeleton, Stack } from '@wonderflow/react-components';
import { NextPage } from 'next';
import { Fragment } from 'react';
import { useReleaseNotesQuery } from 'src/generated/graphql';

import { NotesCard } from '@/components/release-notes/notes-card';
import { Meta } from '@/components/shared/meta';
import { getLayoutProps } from '@/utils/get-layout-props';

const ReleaseNotesPage: NextPage = () => {
  const { data, loading } = useReleaseNotesQuery();

  return (
    <>
      <Meta title="Release notes - Wanda Design System" description="List of improvements, fixes and new features" />
      {loading ? (
        <Stack rowGap={24} vPadding={16}>
          {[...Array(4).keys()].map(n => (
            <Fragment key={n}>
              <Skeleton width="30%" height={32} />
              <br />
              <Skeleton count={6} />
            </Fragment>
          ))}
        </Stack>
      ) : data?.releaseNotes.map((release, i) => (
        <NotesCard key={release.id} release={release} index={i} />
      ))}
    </>
  );
};

export default ReleaseNotesPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
  layoutProps: {
    title: 'Release notes',
    subtitle: 'Latest changes and improvements across all the design system elements.',
    color: 'blue',
    showToc: false,
  },
});
