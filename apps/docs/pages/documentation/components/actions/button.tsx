import { Prose, Title } from '@wonderflow/react-components';
import { NextPage } from 'next';

import { getLayoutProps } from '@/core/get-page-props';

const ButtonPage: NextPage = () => (
  <div>

    <Prose>
      <Title as="h2">ciao</Title>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
    </Prose>
  </div>
);

export default ButtonPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'doc',
});
