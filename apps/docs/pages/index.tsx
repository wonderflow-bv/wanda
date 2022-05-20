import type { NextPage } from 'next';

import { Designers } from '@/components/home/designers';
import { Hero } from '@/components/home/hero';
import { Mentions } from '@/components/home/mentions';
import { Meta } from '@/components/shared/meta';
import { getPageStaticProps } from '@/core/get-page-props';

const Home: NextPage = () => (
  <>
    <Meta />
    <Hero />
    <Mentions />
    <Designers />
  </>
);

export default Home;

export const getStaticProps = getPageStaticProps({
  layout: 'blank',
  layoutProps: {
    fixedHeader: true,
  },
});
