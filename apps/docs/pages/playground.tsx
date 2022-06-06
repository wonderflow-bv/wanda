import { NextPage } from 'next';

import { getLayoutProps } from '@/utils/get-layout-props';

const PlaygroundPage: NextPage = () => (<div>playground</div>);

export default PlaygroundPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'blank',
});
