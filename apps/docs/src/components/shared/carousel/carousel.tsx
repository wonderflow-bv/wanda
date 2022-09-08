import { Container } from '@wonderflow/react-components';
import React from 'react';
import Marquee from 'react-fast-marquee';

import * as styles from './carousel.module.css';

type CarouselProps = {
  speed?: number;
  fade?: boolean;
}

export const Carousel: FCChildrenClass<CarouselProps> = ({
  children,
  speed,
  fade,
  ...otherProps
}) => (
  <Container
    className={styles.Carousel}
    data-carousel-fade={fade}
    padding={false}
  >
    <Marquee speed={speed} gradient={false} className={styles.Slider} {...otherProps}>
      {children}
    </Marquee>
  </Container>
);
