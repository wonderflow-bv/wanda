import {
  Button,
  Container, Stack, Tab, Text, useResponsiveContext,
} from '@wonderflow/react-components';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

import { GradientText } from '@/components/shared/gradient-text';
import { Section } from '@/components/shared/section';
import { TextReveal } from '@/components/shared/text-reveal';

import styles from './designers.module.css';
import { Foundation } from './foundation';
import { Motion } from './motion';
import { Symbols } from './symbols';

export const Designers: FCClass = ({
  className,
}) => {
  const { matches } = useResponsiveContext();
  const [activeTab, setActiveTab] = useState('foundation');

  return (
    <Section
      className={clsx(styles.Designers, className)}
      minHeight={!matches.medium ? '60vh' : '82vh'}
      vPadding={192}
      fill={false}
      vAlign="center"
    >
      <Container dimension="large">
        <Stack direction={matches.medium ? 'row' : 'column'} columnGap={48}>
          <Stack rowGap={56} className={styles.Content}>

            <Stack rowGap={4}>
              <Text>
                <b>
                  <GradientText color="indigo">For designers</GradientText>
                </b>
              </Text>
              <Text as="h2" variant="display-4">
                <TextReveal>Everything you need. When you need it.</TextReveal>
              </Text>
            </Stack>

            <Tab dimension="big" className={styles.Tab} defaultValue={activeTab} onValueChange={setActiveTab}>
              <Tab.Panel label="Foundation" icon={matches.large ? 'layer-group' : undefined} value="foundation">
                <Stack rowGap={32} vPadding={56} hAlign="start">
                  <Text variant="heading-6" color="neutral">
                    Colors, typography, symbols, themes, and much more,
                    everything a designer needs, Wanda provides it.
                  </Text>
                  <Link href="/get-started/documentation/design/foundation/colors" passHref>
                    <Button as="a" kind="secondary" dimension="big">Read more</Button>
                  </Link>
                </Stack>
              </Tab.Panel>

              <Tab.Panel label="Symbols" icon={matches.large ? 'grip-vertical' : undefined} value="symbols">
                <Stack rowGap={32} vPadding={56} hAlign="start">
                  <Text variant="heading-6">
                    Wanda offers over 114 ready-to-use SVG icons and three solid,
                    outline, and duotone styles for over 342 icons.
                  </Text>
                  <Link href="/get-started/symbols" passHref>
                    <Button as="a" kind="secondary" dimension="big">Read more</Button>
                  </Link>
                </Stack>
              </Tab.Panel>

              <Tab.Panel label="Motion" icon={matches.large ? 'signal-stream' : undefined} value="motion">
                <Stack rowGap={32} vPadding={56} hAlign="start">
                  <Text variant="heading-6">
                    Motion is part of the life. Starting from cells.
                    They bring life to your interfaces and provide a great feeling of control.
                  </Text>
                  <Link href="/get-started/documentation/design/motion/principles" passHref>
                    <Button as="a" kind="secondary" dimension="big">Read more</Button>
                  </Link>
                </Stack>
              </Tab.Panel>
            </Tab>
          </Stack>
          <Stack className={styles.Media} hAlign="center" vAlign="center" fill={false} aria-hidden="true">
            <AnimatePresence exitBeforeEnter>
              {activeTab === 'foundation' && <Foundation />}
              {activeTab === 'symbols' && <Symbols />}
              {activeTab === 'motion' && <Motion />}
            </AnimatePresence>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
};
