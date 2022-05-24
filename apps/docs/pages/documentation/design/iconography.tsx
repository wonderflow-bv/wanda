import { NextPage } from 'next';

import { getPageStaticProps } from '@/core/get-page-props';

const IconographyPage: NextPage = () => (<div>Iconography</div>);

export default IconographyPage;

export const getStaticProps = getPageStaticProps({
  layout: 'doc',
});
