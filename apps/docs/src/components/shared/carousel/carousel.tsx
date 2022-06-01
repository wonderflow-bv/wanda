import { Container } from '@wonderflow/react-components';
import React from 'react';
import Marquee from 'react-fast-marquee';

import { useResponsive } from '@/context/responsive';

import styles from './carousel.module.css';

type CarouselProps = {
  speed?: number;
}

export const Carousel: FCChildrenClass<CarouselProps> = ({
  children,
  speed,
  ...otherProps
}) => {
  const { matches } = useResponsive();

  return (
    <Container
      className={styles.Carousel}
      data-carousel-fade={matches.extraLarge}
      dimension={matches.extraLarge ? 'large' : 'full'}
      padding={!matches.extraLarge ? false : undefined}
    >
      <Marquee speed={speed} gradient={false} className={styles.Slider} {...otherProps}>
        {children}
      </Marquee>
    </Container>
  );
};
