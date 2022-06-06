import { NextPage } from 'next';

import { getLayoutProps } from '@/core/get-layout-props';

const ColorsPage: NextPage = () => (<div>Color</div>);

export default ColorsPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
});
