import { NextPage } from 'next';

import { getLayoutProps } from '@/core/get-page-props';

const PlaygroundPage: NextPage = () => (<div>playground</div>);

export default PlaygroundPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'blank',
});
