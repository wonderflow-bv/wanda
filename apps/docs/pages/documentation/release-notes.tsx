import { NextPage } from 'next';

import { getLayoutProps } from '@/core/get-layout-props';

const ReleaseNotesPage: NextPage = () => (<div>Release notes</div>);

export default ReleaseNotesPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
  layoutProps: {
    title: 'Release notes',
    color: 'blue',
  },
});
