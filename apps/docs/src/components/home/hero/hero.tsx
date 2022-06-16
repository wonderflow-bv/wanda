import {
  Button,
  Container, Stack, Text, Title,
} from '@wonderflow/react-components';
import clsx from 'clsx';
import {
  m,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import Link from 'next/link';

import { GradientText } from '@/components/shared/gradient-text';
import { Section } from '@/components/shared/section';
import { useResponsive } from '@/context/responsive';

import styles from './hero.module.css';

export const Hero: FCClass = ({
  className,
  ...otherProps
}) => {
  const { matches } = useResponsive();
  const { scrollYProgress } = useViewportScroll();
  const yOutput = [0, 0.4];
  const background = useTransform(scrollYProgress, yOutput, [
    `radial-gradient(circle at 30% -20%, rgba(44, 191, 111, 0.23) 0%, rgba(44, 191, 111, 0) 30%),
    radial-gradient(circle at 100% 0%, rgba(255, 235, 168, 0.24) 0%, rgba(255, 235, 168, 0) 40%),
    radial-gradient(circle at 68% 3%, rgba(78, 75, 210, 0.17) 0%, rgba(78, 75, 210, 0) 40%),
    radial-gradient(circle at 84% 6%, rgba(238, 0, 0, 0.15) 0%, rgba(238, 0, 0, 0) 40%)`,

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
      {/* @ts-expect-error */}
      <m.span className={styles.Glow} style={{ background }} />
      <Container as={Stack} dimension="large" hAlign="center" vAlign="center" rowGap={80}>
        <Stack rowGap={40} hAlign="center">
          <Title maxWidth="20ch" textAlign="center" as="h1" level={matches.extraLarge ? '1' : '2'}>
            Full-featured
            {' '}
            <GradientText>design system</GradientText>
            {' '}
            for digital experiences
          </Title>
          <Text size={matches.extraLarge ? 28 : 22} textAlign="center" maxWidth="48ch">
            Wanda is a complete design system made to provide complete and enojoyable
            experience while using Wonderflow’s digital products.
          </Text>
        </Stack>
        <Stack direction="row" columnGap={24} rowGap={16} inline wrap>
          <Link href="/documentation/usage/get-started/introduction" passHref>
            <Button as="a" icon="book-bookmark" dimension="big">Documentation</Button>
          </Link>
          <Link href="/documentation/components/actions/button" passHref>
            <Button as="a" icon="grid" dimension="big" kind="secondary">Components</Button>
          </Link>
        </Stack>
      </Container>
    </Section>
  );
};
