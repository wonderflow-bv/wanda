import { NextPage } from 'next';

import { getPageStaticProps } from '@/core/get-page-props';

const LearnPage: NextPage = () => (<div>learn</div>);

export default LearnPage;

export const getStaticProps = getPageStaticProps({
  layout: 'doc',
});
