import { NextPage } from 'next';

import { getLayoutProps } from '@/core/get-page-props';

const MotionPrinciplesPage: NextPage = () => (<div>motion principles</div>);

export default MotionPrinciplesPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
});
