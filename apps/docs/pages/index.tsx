import type { NextPage } from 'next';

import { Meta } from '@/components/shared/meta';
import { getPageStaticProps } from '@/core/get-page-props';

const Home: NextPage = () => (
  <>
    <Meta />
    INDEX
  </>
);

export default Home;

export const getStaticProps = getPageStaticProps({
  layout: 'blank',
});
