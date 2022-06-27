import { Tab } from '@wonderflow/react-components';
import { ReactNode } from 'react';

import { DocLayout } from '@/components/layouts/doc-layout';

import { IPropsMDXLayout } from '../mdx-layout';

export interface IPropsComponentLayout extends IPropsMDXLayout {
  spec?: ReactNode;
  guidelines?: ReactNode;
  overview?: ReactNode;
  implementation?: ReactNode;
}

export const ComponentLayout: FCChildren<IPropsComponentLayout> = ({
  children,
  guidelines,
  spec,
  implementation,
  overview,
  ...props
}) => (
  <DocLayout {...props}>
    {children}
    {(overview ?? guidelines ?? spec ?? implementation) && (
      <Tab defaultValue="Overview">
        {overview && (
        <Tab.Panel label="Spec" value="spec">
          {overview}
        </Tab.Panel>
        )}

        {spec && (
        <Tab.Panel label="Spec" value="spec">
          {guidelines}
        </Tab.Panel>
        )}

        {guidelines && (
        <Tab.Panel label="Guidelines" value="guidelines">
          {guidelines}
        </Tab.Panel>
        )}

        {implementation && (
        <Tab.Panel label="Implementation" value="implementation">
          {implementation}
        </Tab.Panel>
        )}
      </Tab>
    )}
  </DocLayout>
);
