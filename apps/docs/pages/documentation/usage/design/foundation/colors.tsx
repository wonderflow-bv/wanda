import { NextPage } from 'next';

import UsageNav from '@/data/usage-nav';
import { getLayoutProps } from '@/utils/get-layout-props';

const ColorsPage: NextPage = () => (<div>Color</div>);

export default ColorsPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
  layoutProps: {
    title: 'Colors',
    color: 'mint',
    navigation: UsageNav,
  },
});
