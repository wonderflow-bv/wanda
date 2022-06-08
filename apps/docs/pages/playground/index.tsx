import { Spinner } from '@wonderflow/react-components';
import { NextPage } from 'next';

import { getLayoutProps } from '@/utils/get-layout-props';

import styles from './playground.module.css';

const PlaygroundPage: NextPage = () => (
  <>
    <Spinner className={styles.Spinner} />
    <iframe
      className={styles.Iframe}
      title="Playground"
      src="https://stackblitz.com/edit/wanda?embed=1&file=src/app.tsx&hideNavigation=1&hideFileExplorer=0"
    />
  </>
);

export default PlaygroundPage;

export const getStaticProps = () => getLayoutProps({
  layout: 'blank',
  layoutProps: {
    headerPosition: 'sticky',
    showFooter: false,
  },
});
