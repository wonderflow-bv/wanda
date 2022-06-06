import { NextPage } from 'next';

import { getLayoutProps } from '@/utils/get-layout-props';

const ThemesPage: NextPage = () => (<div>Themes</div>);

export default ThemesPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
});
