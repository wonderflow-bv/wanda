import { NextPage } from 'next';

import { getLayoutProps } from '@/utils/get-layout-props';

const DesignTokensPage: NextPage = () => (<div>Design tokens</div>);

export default DesignTokensPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
  layoutProps: {
    title: 'Design tokens',
    subtitle: 'all the values needed to construct and maintain a design system — spacing, color, typography, object styles, animation, etc. — represented as data.',
    color: 'mint',
  },
});
