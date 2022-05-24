import { Stack } from '@wonderflow/react-components';
import { m, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

import styles from './motion.module.css';

export const Motion = () => {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Stack className={styles.Motion} hAlign="center" rowGap={40}>
      <m.span
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ scale: 2, opacity: 0, filter: 'blur(30px)' }}
        transition={{
          duration: 1, repeat: Infinity, repeatDelay: 3,
        }}
        className={styles.Pulse}
      />

      <div className={styles.Shape}>
        {(mounted) && (
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
        )}
      </div>
    </Stack>
  );
};

