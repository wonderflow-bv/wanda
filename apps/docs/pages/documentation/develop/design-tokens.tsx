import { NextPage } from 'next';

import { getLayoutProps } from '@/core/get-page-props';

const DesignTokensPage: NextPage = () => (<div>Design tokens</div>);

export default DesignTokensPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
});
