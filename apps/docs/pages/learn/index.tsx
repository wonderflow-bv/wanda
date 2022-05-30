import { NextPage } from 'next';

import { getLayoutProps } from '@/core/get-page-props';

const LearnPage: NextPage = () => (<div>learn</div>);

export default LearnPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
});
