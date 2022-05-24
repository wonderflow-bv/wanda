import { NextPage } from 'next';

import { getPageStaticProps } from '@/core/get-page-props';

const ColorsPage: NextPage = () => (<div>Color</div>);

export default ColorsPage;

export const getStaticProps = getPageStaticProps({
  layout: 'doc',
});
