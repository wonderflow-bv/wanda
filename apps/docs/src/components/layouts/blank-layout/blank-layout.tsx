
import { domMax, LazyMotion } from 'framer-motion';

import { BaseLayout } from '@/components/layouts/base-layout';
import { Footer } from '@/components/shared/footer';
import { Header, HeaderProps } from '@/components/shared/header';

export interface IPropsBlankLayout {
  headerPosition?: HeaderProps['position'];
  showFooter?: boolean;
}

export const BlankLayout: FCChildren<IPropsBlankLayout> = ({
  children,
  showFooter = true,
  headerPosition,
}) => (
  <BaseLayout>
    <Header position={headerPosition} />
    <LazyMotion features={domMax}>
      <main>{children}</main>
      {showFooter && <Footer />}
    </LazyMotion>
  </BaseLayout>
);

