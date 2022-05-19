import type { NextPage } from 'next';

import { Hero } from '@/components/home/hero';
import { Meta } from '@/components/shared/meta';
import { getPageStaticProps } from '@/core/get-page-props';

const Home: NextPage = () => (
  <>
    <Meta />
    <Hero />
  </>
);

export default Home;

export const getStaticProps = getPageStaticProps({
  layout: 'blank',
  layoutProps: {
    absoluteHeader: true,
  },
});
