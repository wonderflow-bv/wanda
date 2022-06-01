import { NextPage } from 'next';

import { getLayoutProps } from '@/core/get-page-props';

const IconographyPage: NextPage = () => (<div>Iconography</div>);

export default IconographyPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
});
