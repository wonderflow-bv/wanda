import { Container } from '@wonderflow/react-components';
import React from 'react';
import Marquee from 'react-fast-marquee';

import { useResponsiveContext } from '@/context/responsive';

import styles from './carousel.module.css';

type CarouselProps = Record<string, unknown>

export const Carousel: FCChildrenClass<CarouselProps> = ({
  children,
  ...otherProps
}) => {
  const { matches } = useResponsiveContext();

  return (
    <Container className={styles.Carousel} data-carousel-fade={matches.extraLarge} dimension={matches.extraLarge ? 'large' : 'full'} padding={!matches.extraLarge ? false : undefined}>
      <Marquee gradient={false} className={styles.Slider} {...otherProps}>
        {children}
      </Marquee>
    </Container>
  );
};
