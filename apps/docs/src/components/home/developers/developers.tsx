import {
  Button,
  Container, Stack, Tab, Text, Title,
} from '@wonderflow/react-components';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

import { GradientText } from '@/components/shared/gradient-text';
import { Section } from '@/components/shared/section';
import { useResponsiveContext } from '@/context/responsive';

import styles from './developers.module.css';
import { Foundation } from './foundation';
import { Icons } from './icons';
import { Motion } from './motion';

export const Developers: FCClass = ({
  className,
}) => {
  const { matches } = useResponsiveContext();
  const [activeTab, setActiveTab] = useState('components');

  return (
    <Section className={clsx(styles.Developers, className)} minHeight={!matches.medium ? '60vh' : '72vh'} vPadding={192}>
      <Container dimension="large">
        <Stack direction={matches.medium ? 'row-reverse' : 'column'} columnGap={48}>
          <Stack rowGap={56} className={styles.Content}>

            <Stack rowGap={4}>
              <Text weight="bold"><GradientText color="orange">For developers</GradientText></Text>
              <Title as="h2" level="2" maxWidth="16ch">Full toolchain to build digital experiences.</Title>
            </Stack>

            <Tab className={styles.Tab} defaultValue={activeTab} onValueChange={setActiveTab}>
              <Tab.Panel label="Components" icon={matches.large ? 'grid' : undefined} value="components">
                <Stack rowGap={32} vPadding={56} hAlign="start">
                  <Text size={22} dimmed={6}>
                    Colors, typography, iconography, themes, and much more,
                    everything a designer needs, Wanda provides it.
                  </Text>
                  <Link href="/documentation/design/foundation/colors" passHref>
                    <Button as="a" kind="secondary" dimension="big">Read More</Button>
                  </Link>
                </Stack>
              </Tab.Panel>

              <Tab.Panel label="Design Tokens" icon={matches.large ? 'more-vert' : undefined} value="design-tokens">
                <Stack rowGap={32} vPadding={56} hAlign="start">
                  <Text size={22} dimmed={6}>
                    Wanda offers over 114 ready-to-use SVG icons and three solid,
                    outline, and duotone styles for over 342 icons.
                  </Text>
                  <Link href="/documentation/design/iconography" passHref>
                    <Button as="a" kind="secondary" dimension="big">Read More</Button>
                  </Link>
                </Stack>
              </Tab.Panel>

              <Tab.Panel label="Themes" icon={matches.large ? 'style' : undefined} value="themes">
                <Stack rowGap={32} vPadding={56} hAlign="start">
                  <Text size={22} dimmed={6}>
                    Motion is part of the life. Starting from cells.
                    They bring life to your interfaces and provide a great feeling of control.
                  </Text>
                  <Link href="/design/foundation/colors" passHref>
                    <Button as="a" kind="secondary" dimension="big">Read More</Button>
                  </Link>
                </Stack>
              </Tab.Panel>
            </Tab>
          </Stack>
          <Stack className={styles.Media} hAlign="center" vAlign="center" fill={false} aria-hidden="true">
            <AnimatePresence exitBeforeEnter>
              {activeTab === 'components' && <Foundation />}
              {activeTab === 'design-tokens' && <Icons />}
              {activeTab === 'themes' && <Motion />}
            </AnimatePresence>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
};
