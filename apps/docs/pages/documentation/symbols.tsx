import { Stack } from '@wonderflow/react-components';
import { NextPage } from 'next';

import { SearchSymbol } from '@/components/symbols/search-symbol';
import { getLayoutProps } from '@/utils/get-layout-props';

const SymbolsPage: NextPage = () => (
  <Stack vPadding={40}>
    <SearchSymbol />
  </Stack>
);

export default SymbolsPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
  layoutProps: {
    title: 'Symbols',
    subtitle: 'Over 120 SVG symbols ready to use in any project',
    color: 'dipsy',
  },
});
