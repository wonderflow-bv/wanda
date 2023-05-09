import {
  Container, Stack, Text,
} from '@wonderflow/react-components';
import createGlobe from 'cobe';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';

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
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    const darkGlobe = theme === 'dark' ? 1 : 0;
    const systemDarkGlobe = (theme === 'system' && isDark) ? 1 : 0;
    const darkGlobeBg: [number, number, number] = theme === 'dark' ? [0.3, 0.3, 0.3] : [1, 1, 1];
    const systemGlobeBg: [number, number, number] = (theme === 'system' && isDark) ? [0.3, 0.3, 0.3] : [1, 1, 1];

    let rotation = 0;
    let globe: any = null;

    if (canvasRef.current) {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: 1000 * 2,
        height: 1000 * 2,
        phi: 0,
        theta: 0,
        dark: theme === 'system' ? systemDarkGlobe : darkGlobe,
        diffuse: 1.2,
        mapSamples: 26000,
        mapBrightness: 3,
        baseColor: theme === 'system' ? systemGlobeBg : darkGlobeBg,
        markerColor: [0.933, 0.0, 0.0],
        glowColor: [1, 1, 1],
        scale: 1,
        offset: [0, 0],
        markers: [
          { location: [41.008240, 28.978359], size: 0.04 },
          { location: [50.0679680, 8.508600], size: 0.04 },
          { location: [52.370216, 4.895168], size: 0.04 },
          { location: [45.666279, 12.242070], size: 0.04 },
          { location: [59.329323, 18.068581], size: 0.04 },
          { location: [46.5218269, 6.6327025], size: 0.04 },
          { location: [37.7790262, -122.419906], size: 0.04 },
        ],
        onRender: (state) => {
          // eslint-disable-next-line no-param-reassign
          state.phi = rotation;
          rotation -= 1 / 1000;
        },
      });
    }

    return () => {
      globe.destroy();
    };
  }, [isDark, theme]);

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
      vAlign="start"
      minHeight="25rem"
      className={styles.Brands}
      {...otherProps}
    >
      <canvas ref={canvasRef} className={styles.Globe} />
      <Container as={Stack} hAlign="center" vAlign="center" dimension="large">
        <Text variant="heading-6">Some Wonderflow’s customers enjoying Wanda</Text>
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
