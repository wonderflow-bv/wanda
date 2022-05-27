import { Elevator } from '@wonderflow/react-components';
import tkns from '@wonderflow/tokens/platforms/web/tokens.json';
import {
  useEffect, useMemo, useRef,
} from 'react';
import { MarkerProps } from 'react-refractor';

import { Code } from '@/components/shared/code';

import styles from './design-tokens.module.css';

const skipGroup = 3;

export const DesignTokens = () => {
  const startLine = useRef(2);

  const arrayOfLines = useMemo(() => Object.keys(tkns.color).map(
    (color, index) => Object.keys(tkns.color[color]).map((colorKey, indexKey) => {
      const addLine = index > 0 && indexKey === 0 ? skipGroup : 1;
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
    <div>
      <Elevator resting={4}>
        <Code
          language="json"
          maxHeight="25rem"
          source={JSON.stringify(tkns.color, null, 3)}
          markers={arrayOfLines}
        />
      </Elevator>
    </div>
  );
};
