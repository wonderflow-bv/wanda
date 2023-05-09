import {
  Button,
  Container, Stack, Text, useResponsiveContext,
} from '@wonderflow/react-components';
import clsx from 'clsx';
import {
  m,
  useScroll,
  useTransform,
} from 'framer-motion';
import Link from 'next/link';

import { GradientText } from '@/components/shared/gradient-text';
import { Section } from '@/components/shared/section';

import styles from './hero.module.css';

export const Hero: FCClass = ({
  className,
  ...otherProps
}) => {
  const { matches } = useResponsiveContext();
  const { scrollYProgress } = useScroll();
  const yOutput = [0, 0.4];
  const background = useTransform(scrollYProgress, yOutput, [
    `radial-gradient(circle at 30% -20%, rgba(44, 191, 111, 0.13) 0%, rgba(44, 191, 111, 0) 30%),
    radial-gradient(circle at 100% 0%, rgba(255, 235, 168, 0.14) 0%, rgba(255, 235, 168, 0) 40%),
    radial-gradient(circle at 68% 3%, rgba(78, 75, 210, 0.07) 0%, rgba(78, 75, 210, 0) 40%),
    radial-gradient(circle at 84% 6%, rgba(238, 0, 0, 0.05) 0%, rgba(238, 0, 0, 0) 40%)`,

    `radial-gradient(circle at 70% 50%, rgba(44, 191, 111, 0) 0%, rgba(44, 191, 111, 0) 30%),
    radial-gradient(circle at 0% 60%, rgba(255, 235, 168, 0) 0%, rgba(255, 235, 168, 0) 40%),
    radial-gradient(circle at 32% 83%, rgba(78, 75, 210, 0.01) 0%, rgba(78, 75, 210, 0) 40%),
    radial-gradient(circle at 16% 76%, rgba(238, 0, 0, 0.0) 0%, rgba(238, 0, 0, 0) 40%)`,
  ]);

  return (
    <Section
      className={clsx(styles.Hero, className)}
      minHeight={!matches.medium ? '60vh' : '88vh'}
      hAlign="center"
      vAlign="center"
      vPadding={96}
      fill={false}
      {...otherProps}
    >
      {/* @ts-expect-error framer-motion bug */}
      <m.span className={styles.Glow} style={{ background }} />
      <Container as={Stack} dimension="large" hAlign="center" vAlign="center" rowGap={80}>
        <Stack rowGap={40} hAlign="center">
          <Text textAlign="center" as="h1" variant="display-3" style={{ maxWidth: '20ch' }}>
            Full-featured
            {' '}
            <GradientText>design system</GradientText>
            {' '}
            for digital experiences
          </Text>
          <Text variant="heading-6" color="neutral" textAlign="center" style={{ maxWidth: '48ch', fontWeight: '400' }}>
            Wanda is a complete design system made to provide complete and enjoyable
            experience while using Wonderflow’s digital products.
          </Text>
        </Stack>
        <Stack direction="row" columnGap={24} rowGap={16} inline wrap>
          <Link href="/get-started/documentation/get-started/introduction" passHref>
            <Button as="a" icon="book-bookmark" dimension="big">Get started</Button>
          </Link>
          <Link href="/get-started/components/actions/button" passHref>
            <Button as="a" icon="grid" dimension="big" kind="secondary">Components</Button>
          </Link>
        </Stack>
      </Container>
    </Section>
  );
};
