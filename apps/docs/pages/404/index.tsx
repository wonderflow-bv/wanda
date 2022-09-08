import { Button, InfoState, Stack } from '@wonderflow/react-components';
import { NextPage } from 'next';
import Link from 'next/link';

import { getLayoutProps } from '@/utils/get-layout-props';

import * as styles from './404.module.css';

const Custom404: NextPage = () => (
  <Stack hAlign="center" vAlign="center" fill={false} className={styles.Page}>
    <InfoState
      title="Page not found"
      image="https://wonderimages.gumlet.io/placeholders/triangle.png?format=webp&q=100"
      actions={(
        <Link href="/" passHref>
          <Button kind="secondary" as="a">Back to homepage</Button>
        </Link>
      )}
    >
      The page you&apos;re searching for doesn&apos;t exist.
    </InfoState>
  </Stack>
);

export const getStaticProps = () => getLayoutProps({
  layout: 'blank',
  layoutProps: {
    showFooter: false,
    showHeader: false,
  },
});

export default Custom404;
