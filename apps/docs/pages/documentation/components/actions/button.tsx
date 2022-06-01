import { NextPage } from 'next';

import { getLayoutProps } from '@/core/get-page-props';

const ButtonPage: NextPage = () => (
  <div>
    Button
  </div>
);

export default ButtonPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
  layoutProps: {
    title: 'Button',
    color: 'indigo',
    subtitle: 'A button is a box area or text that communicates and triggers user actions when clicked.',
  },
});
