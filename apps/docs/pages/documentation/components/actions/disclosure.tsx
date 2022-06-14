import { NextPage } from 'next';

import ComponentsNav from '@/data/components-nav';
import { getLayoutProps } from '@/utils/get-layout-props';

const DisclosurePage: NextPage = () => (
  <div>
    Disclosure
  </div>
);

export default DisclosurePage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
  layoutProps: {
    title: 'Disclosure',
    color: 'indigo',
    subtitle: 'Interactive element to control the visiblity of content.',
    navigation: ComponentsNav,
  },
});
