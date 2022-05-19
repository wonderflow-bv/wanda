import clsx from 'clsx';

import { BaseLayout } from '@/components/layouts/base-layout';
import { Header } from '@/components/shared/header';

import styles from './blank-layout.module.css';

export interface IPropsBlankLayout {
  absoluteHeader?: boolean;
}

export const BlankLayout: FCChildren<IPropsBlankLayout> = ({
  children,
  absoluteHeader,
}) => (
  <BaseLayout>
    <Header className={clsx(absoluteHeader && styles.Header)} />
    <main>{children}</main>
  </BaseLayout>
);

