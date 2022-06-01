import { NextPage } from 'next';

import { getLayoutProps } from '@/core/get-page-props';

const ResourcesPage: NextPage = () => (<div>Resources</div>);

export default ResourcesPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
  layoutProps: {
    title: 'Resources',
    color: 'salmon',
    subtitle: 'Useful assets to design at Wonderflow',
  },
});
