import { NextPage } from 'next';

import { getPageStaticProps } from '@/core/get-page-props';

const ButtonPage: NextPage = () => (<div>Button</div>);

export default ButtonPage;

export const getStaticProps = getPageStaticProps({
  layout: 'doc',
});
