import { Stack } from '@wonderflow/react-components';
import { m, useReducedMotion } from 'framer-motion';

import { ClientOnly } from '@/components/shared/client-only';

import * as styles from './motion.module.css';

export const Motion = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Stack className={styles.Motion}>
      <Stack
        as={m.div}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 600,
            damping: 30,
            delay: 0.2,
          },
        }}
      >
        <m.span
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: 2, opacity: 0, filter: 'blur(30px)' }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className={styles.Pulse}
        />

        <div className={styles.Shape}>
          <ClientOnly>
            <video
              className={styles.Video}
              src="/hero-video-dark.mp4"
              autoPlay={!shouldReduceMotion}
              loop
              muted
              playsInline
              height="220"
              width="390"
            />
          </ClientOnly>
        </div>
      </Stack>
    </Stack>
  );
};

