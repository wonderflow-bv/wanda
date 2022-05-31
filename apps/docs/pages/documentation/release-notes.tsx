import { NextPage } from 'next';

import { getLayoutProps } from '@/core/get-page-props';

const ReleaseNotesPage: NextPage = () => (<div>Release notes</div>);

export default ReleaseNotesPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
});
