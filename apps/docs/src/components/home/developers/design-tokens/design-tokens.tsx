import { Elevator } from '@wonderflow/react-components';
import tkns from '@wonderflow/tokens/platforms/web/tokens.json';
import { m } from 'framer-motion';
import {
  useEffect, useMemo, useRef,
} from 'react';
import { MarkerProps } from 'react-refractor';

import { Code } from '@/components/shared/code';

import styles from './design-tokens.module.css';

const SKIP_GROUP = 3;

const ANIMATION = {
  hidden: {
    x: -10,
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 700,
      damping: 20,
      delayChildren: 0.2,
      staggerChildren: 0.01,
      staggerDirection: 1,
    },
  },
};

export const DesignTokens = () => {
  const startLine = useRef(2);

  const arrayOfLines = useMemo(() => Object.keys(tkns.color).map(
    (color, index) => Object.keys(tkns.color[color]).map((colorKey, indexKey) => {
      const addLine = index > 0 && indexKey === 0 ? SKIP_GROUP : 1;
      startLine.current += addLine;
      return ({
        line: startLine.current,
        component: (props: MarkerProps) => (
          <span className={styles.Row}>
            {props.children}
            <span className={styles.ColorPreview} style={{ background: `hsl(${tkns.color[color][colorKey]})` }} />
          </span>
        ),
      });
    }),
  ).flat(), []);

  useEffect(() => () => {
    startLine.current = 2;
  }, [arrayOfLines]);

  return (
    <m.div
      variants={ANIMATION}
      initial="hidden"
      exit="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={styles.DesignTokens}
    >
      <m.div>
        <Elevator resting={4}>
          <Code
            className={styles.Code}
            hideCopy
            language="json"
            maxHeight="25rem"
            source={JSON.stringify(tkns.color, null, 3)}
            // markers={arrayOfLines}
          />
        </Elevator>
      </m.div>

      <m.div
        variants={ANIMATION}
        className={styles.Code}
      >
        <Elevator resting={4}>
          <Code
            hideCopy
            language="css"
            maxHeight="25rem"
            source={`.Usage {
            color: hsl(
              token(--color-blue-50) / 20%
            );
          }`}
          />
        </Elevator>
      </m.div>
    </m.div>
  );
};
