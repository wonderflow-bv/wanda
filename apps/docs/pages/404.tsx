import { NextPage } from 'next';

import { getLayoutProps } from '@/utils/get-layout-props';

const Custom404: NextPage = () => (
  <p>
    Error
  </p>
);

export const getStaticProps = () => getLayoutProps({
  layout: 'blank',
  layoutProps: {
    headerPosition: 'sticky',
    showFooter: false,
  },
});

export default Custom404;
