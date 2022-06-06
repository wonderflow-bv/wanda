import { NextPage } from 'next';

import { getLayoutProps } from '@/utils/get-layout-props';

const IconographyPage: NextPage = () => (<div>Iconography</div>);

export default IconographyPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
});
