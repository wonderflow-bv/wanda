import { NextPage } from 'next';

import { getLayoutProps } from '@/core/get-page-props';

const IntroductionPage: NextPage = () => (<div>ciao</div>);

export default IntroductionPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
  layoutProps: {
    title: 'Introduction',
    color: 'mint',
    subtitle: 'Wanda is Wonderflow’s open-source design system built for products and digital experiences.',
  },
});
