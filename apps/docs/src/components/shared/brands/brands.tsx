import {
  Container, Stack, Title,
} from '@wonderflow/react-components';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { ClientOnly } from '@/components/shared/client-only';
import { GradientText } from '@/components/shared/gradient-text';
import { Section } from '@/components/shared/section';
import { brands } from '@/data/brands';

import styles from './brands.module.css';

type ImageLoaderType = {
  src: string;
  width?: number;
  height?: number;
  quality?: number;
}

export const Brands = ({
  ...otherProps
}) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const { theme } = useTheme();

  const mediaMatches = (matches: boolean) => {
    setIsDark(matches);
  };

  useEffect(() => {
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => mediaMatches(matches));

    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', ({ matches }) => mediaMatches(matches));
    };
  }, [theme]);

  const gumletLoader = ({
    src,
    width = 150,
    quality = 75,
  }: ImageLoaderType) => {
    const themeBri = theme === 'dark' ? '100' : '-100';
    const brightness = (theme === 'system' && isDark) ? '100' : '-100';

    return `https://wonderimages.gumlet.io/logos/brands/mono/${src}?w=${width}&q=${quality}&bri=${theme === 'system' ? brightness : themeBri}&format=webp`;
  };

  return (
    <Section
      fill={false}
      vAlign="center"
      minHeight="15rem"
      className={styles.Brands}
      {...otherProps}
    >
      <Container as={Stack} hAlign="center" vAlign="center" dimension="large">
        <Title level="6">Some Wonderflow’s customers enjoying Wanda</Title>
        <Stack className={styles.Logos} direction="row" fill={false} hAlign="center" wrap>
          <Stack
            as="a"
            direction="row"
            vAlign="center"
            hAlign="center"
            columnGap={8}
            fill={false}
            className={styles.Link}
            href="https://www.wonderflow.ai/resources#success-stories"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GradientText color="rainbow">
              <b>Read success stories</b>
            </GradientText>
          </Stack>
          <ClientOnly>
            {brands.map(b => (
              <Image
                key={b}
                loader={gumletLoader}
                src={`${b}-mono.svg`}
                alt={b}
                width={151}
                height={60}
              />
            ))}
          </ClientOnly>
        </Stack>
      </Container>
    </Section>
  );
};
