import { NextPage } from 'next';

import { getLayoutProps } from '@/core/get-page-props';

const ThemesPage: NextPage = () => (<div>Themes</div>);

export default ThemesPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
});
