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

import styles from './designers.module.css';
import { Foundation } from './foundation';
import { Icons } from './icons';

export const Designers: FCClass = ({
  className,
}) => {
  const { matches } = useResponsiveContext();
  const [activeTab, setActiveTab] = useState('icons');

  return (
    <Section className={clsx(styles.Designers, className)} minHeight={!matches.medium ? '60vh' : '72vh'} vPadding={192}>
      <Container dimension="large">
        <Stack direction={matches.large ? 'row' : 'column'} columnGap={32} wrap>
          <Stack rowGap={56} className={styles.Content}>

            <Stack rowGap={4}>
              <Text weight="bold"><GradientText color="indigo">For designers</GradientText></Text>
              <Title as="h2" level="2" maxWidth="16ch">Everything you need. When you need it. </Title>
            </Stack>

            <Tab className={styles.Tab} defaultValue={activeTab} onValueChange={setActiveTab}>
              <Tab.Panel label="Foundation" icon={matches.large ? 'layer-group' : undefined} value="foundation">
                <Stack rowGap={32} vPadding={56} hAlign="start">
                  <Text size={22} dimmed={6}>
                    Colors, typography, iconography, themes, and much more,
                    everything a designer needs, Wanda provides it.
                  </Text>
                  <Link href="/design/foundation/colors" passHref>
                    <Button as="a" kind="secondary" dimension="big">Read More</Button>
                  </Link>
                </Stack>
              </Tab.Panel>

              <Tab.Panel label="Icons" icon={matches.large ? 'grip-vertical' : undefined} value="icons">
                <Stack rowGap={32} vPadding={56} hAlign="start">
                  <Text size={22} dimmed={6}>
                    Wanda offers over 114 ready-to-use SVG icons and three solid,
                    outline, and duotone styles for over 342 icons.
                  </Text>
                  <Link href="/design/foundation/colors" passHref>
                    <Button as="a" kind="secondary" dimension="big">Read More</Button>
                  </Link>
                </Stack>
              </Tab.Panel>

              <Tab.Panel label="Motions" icon={matches.large ? 'signal-stream' : undefined} value="motions">
                <Stack rowGap={32} vPadding={56} hAlign="start">
                  <Text size={22} dimmed={6}>
                    Colors, typography, iconography, themes, and much more,
                    everything a designer needs, Wanda provides it.
                  </Text>
                  <Link href="/design/foundation/colors" passHref>
                    <Button as="a" kind="secondary" dimension="big">Read More</Button>
                  </Link>
                </Stack>
              </Tab.Panel>
            </Tab>
          </Stack>
          <Stack className={styles.Media} hAlign="center" vAlign="start" fill={false}>
            <AnimatePresence exitBeforeEnter>
              {activeTab === 'foundation' && <Foundation />}
              {activeTab === 'icons' && <Icons />}
            </AnimatePresence>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
};
