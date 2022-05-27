import { NextPage } from 'next';

import { getPageStaticProps } from '@/core/get-page-props';

const ThemesPage: NextPage = () => (<div>Themes</div>);

export default ThemesPage;

export const getStaticProps = getPageStaticProps({
  layout: 'doc',
});
