import { NextPage } from 'next';

import { getPageStaticProps } from '@/core/get-page-props';

const IntroductionPage: NextPage = () => (<div>ciao</div>);

export default IntroductionPage;

export const getStaticProps = getPageStaticProps({
  layout: 'doc',
});
