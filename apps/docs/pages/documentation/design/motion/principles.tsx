import { NextPage } from 'next';

import { getPageStaticProps } from '@/core/get-page-props';

const MotionPrinciplesPage: NextPage = () => (<div>motion principles</div>);

export default MotionPrinciplesPage;

export const getStaticProps = getPageStaticProps({
  layout: 'doc',
});
