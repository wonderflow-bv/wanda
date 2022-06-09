import { NextPage } from 'next';

import { getLayoutProps } from '@/utils/get-layout-props';

const SymbolsPage: NextPage = () => (<div>Symbols</div>);

export default SymbolsPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
  layoutProps: {
    title: 'Symbols',
    color: 'mint',
  },
});
