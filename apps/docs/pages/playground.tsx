import { NextPage } from 'next';

import { getPageStaticProps } from '@/core/get-page-props';

const PlaygroundPage: NextPage = () => (<div>playground</div>);

export default PlaygroundPage;

export const getStaticProps = getPageStaticProps({
  layout: 'blank',
});
