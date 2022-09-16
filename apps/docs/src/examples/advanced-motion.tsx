import { motion, useMotionValue, useTransform } from 'framer-motion';

import styles from './advanced-motion.module.css';

export const AdvancedMotion = () => {
  const x = useMotionValue(0);
  const xInput = [-200, 0, 200];
  const background = useTransform(x, xInput, [
    '#ff0105',
    'hsl(0 100% 80% / 0%)',
    '#00d856',
  ]);
  const color = useTransform(x, xInput, [
    '#e1090d',
    '#7f7f7f',
    '#00d856',
  ]);
  const tickPath = useTransform(x, [10, 100], [0, 1]);
  const crossPathA = useTransform(x, [-10, -55], [0, 1]);
  const crossPathB = useTransform(x, [-50, -100], [0, 1]);

  return (
    <motion.div className={styles.ExampleContainer}>
      {/* @ts-expect-error framer-motion bug on style */}
      <motion.span className={styles.Overlay} style={{ background }} />
      <motion.div
        className={styles.Box}
        style={{ x }}
        drag="x"
        dragElastic={0.5}
        whileTap={{ scale: 1.1 }}
        dragConstraints={{ left: 0, right: 0 }}
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 20,
        }}
      >
        <svg className={styles.ProgressIcon} viewBox="0 0 50 50">
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
            style={{ translateX: 5, translateY: 5 }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M14,26 L 22,33 L 35,16"
            strokeDasharray="0 1"
            style={{ pathLength: tickPath }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M17,17 L33,33"
            strokeDasharray="0 1"
            style={{ pathLength: crossPathA }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M33,17 L17,33"
            strokeDasharray="0 1"
            style={{ pathLength: crossPathB }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};
