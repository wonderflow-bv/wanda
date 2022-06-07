import { Title } from '@wonderflow/react-components';
import { NextPage } from 'next';

import { getLayoutProps } from '@/utils/get-layout-props';

const IntroductionPage: NextPage = () => (
  <div>
    <Title as="h2" level="2">H2 title</Title>
    ciao 2
    <Title as="h3" level="3">H3 title</Title>
    ciao 3
  </div>
);

export default IntroductionPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
  layoutProps: {
    title: 'Introduction',
    color: 'mint',
    subtitle: 'Wanda is Wonderflow’s open-source design system built for products and digital experiences.',
  },
});
