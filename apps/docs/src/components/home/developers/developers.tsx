import {
  Button,
  Container, Stack, Tab, Text, Title, useResponsiveContext,
} from '@wonderflow/react-components';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

import { GradientText } from '@/components/shared/gradient-text';
import { Section } from '@/components/shared/section';
import { TextReveal } from '@/components/shared/text-reveal';

import { Components } from './components';
import { DesignTokens } from './design-tokens';
import styles from './developers.module.css';
import { Themes } from './themes';

export const Developers: FCClass = ({
  className,
}) => {
  const { matches } = useResponsiveContext();
  const [activeTab, setActiveTab] = useState('components');

  return (
    <Section
      className={clsx(styles.Developers, className)}
      minHeight={!matches.medium ? '60vh' : '82vh'}
      vPadding={192}
      fill={false}
      vAlign="center"
    >
      <Container dimension="large">
        <Stack direction={matches.medium ? 'row-reverse' : 'column'} columnGap={72}>
          <Stack rowGap={56} fill={false} className={styles.Content}>

            <Stack rowGap={4}>
              <Text weight="bold"><GradientText color="yellow">For developers</GradientText></Text>
              <Title as="h2" level="2" maxWidth="16ch">
                <TextReveal>Full toolchain to build digital experiences.</TextReveal>
              </Title>
            </Stack>

            <Tab className={styles.Tab} defaultValue={activeTab} onValueChange={setActiveTab}>
              <Tab.Panel label="Components" symbol={matches.large ? 'grid' : undefined} value="components">
                <Stack rowGap={32} vPadding={56} hAlign="start">
                  <Text size={22} dimmed={6}>
                    A full set of highly customizable React components and styles ready to use inside applications.
                  </Text>
                  <Link href="/documentation/components/actions/button" passHref>
                    <Button as="a" kind="secondary" dimension="big">Read more</Button>
                  </Link>
                </Stack>
              </Tab.Panel>

              <Tab.Panel label="Design Tokens" symbol={matches.large ? 'more-vert' : undefined} value="design-tokens">
                <Stack rowGap={32} vPadding={56} hAlign="start">
                  <Text size={22} dimmed={6}>
                    Color, spaces, font... every basic and common property is available as design token.
                    The foundamentals of consistency across platforms.
                  </Text>
                  <Link href="/documentation/usage/develop/design-tokens" passHref>
                    <Button as="a" kind="secondary" dimension="big">Read more</Button>
                  </Link>
                </Stack>
              </Tab.Panel>

              <Tab.Panel label="Themes" symbol={matches.large ? 'style' : undefined} value="themes">
                <Stack rowGap={32} vPadding={56} hAlign="start">
                  <Text size={22} dimmed={6}>
                    Easily handle light/dark themes via JS or CSS, by using the provided
                    collections of custom properties and JSON values.
                  </Text>
                  <Link href="/documentation/usage/develop/themes" passHref>
                    <Button as="a" kind="secondary" dimension="big">Read more</Button>
                  </Link>
                </Stack>
              </Tab.Panel>
            </Tab>
          </Stack>
          <Stack direction="row" className={styles.Media} hAlign="center" vAlign="center" aria-hidden="true">
            <AnimatePresence exitBeforeEnter>
              {activeTab === 'components' && <Components />}
              {activeTab === 'design-tokens' && <DesignTokens />}
              {activeTab === 'themes' && <Themes />}
            </AnimatePresence>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
};
