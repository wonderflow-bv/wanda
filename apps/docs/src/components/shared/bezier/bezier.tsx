import {
  Stack, Symbol, Text, ToggleButton,
} from '@wonderflow/react-components';
import BezierEditor from 'bezier-easing-editor';
import clsx from 'clsx';
import { domMax, LazyMotion, m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useUIDSeed } from 'react-uid';

import styles from './bezier.module.css';

export type BezierProps = PropsWithClass & {
  bezier: number[];
  duration?: number;
  readOnly?: boolean;
  compare?: boolean;
}

const thumbAnimation = {
  start: {
    y: 0,
  },
  end: {
    y: -255,
  },
};

export const Bezier = ({
  duration = 1.5,
  readOnly = true,
  compare = false,
  bezier,
  className,
  ...otherProps
}: BezierProps) => {
  const uid = useUIDSeed();
  const [value, setValue] = useState<number[]>(bezier);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timing, setTiming] = useState<number>(duration);

  // const setDuration = useCallback(() => {
  //   setTiming(timing !== duration ? duration : duration * 2);
  // }, [duration, timing]);

  useEffect(() => {
    setTiming(duration);
  }, [duration]);

  return (
    <Stack
      direction="row"
      wrap
      columnGap={24}
      className={styles.Bezier}
      {...otherProps}
    >
      <Stack fill={false} vAlign="start" vPadding={24} rowGap={16}>
        <ToggleButton
          kind="secondary"
          restingIcon="play"
          pressedIcon="stop"
          title="Play/Pause animation"
          pressed={isRunning}
          onClick={() => (isRunning ? setIsRunning(false) : setIsRunning(true))}
        />
        {/* <ToggleButton
          kind="flat"
          restingIcon={<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.444 18h2.364V5H6.453L3 7.387v2.19l3.289-2.289h.155V18ZM11.73 18h2.455l2.042-3.423h.156L18.435 18H21l-3.27-4.982 3.233-4.865h-2.5l-1.979 3.415h-.156l-1.987-3.415h-2.639l3.27 4.964L11.73 18Z" /></svg>}
          pressedIcon={<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M2.132 19h9.427v-2.026H5.415v-.198l2.72-2.65c2.474-2.396 3.217-3.626 3.217-5.179V8.92c0-2.3-1.9-3.919-4.544-3.919C3.976 5 2 6.78 2 9.326l.01.028 2.257.01.01-.038c0-1.41.969-2.367 2.408-2.367 1.412 0 2.268.91 2.268 2.168v.029c0 1.05-.518 1.741-2.362 3.615l-4.46 4.582V19ZM13.479 19H16l2.098-3.597h.16L20.366 19H23l-3.359-5.235 3.321-5.111h-2.568l-2.032 3.587h-.16L16.16 8.654h-2.71l3.36 5.216L13.478 19Z" /></svg>}
          pressed={timing !== duration}
          title="Slow animation"
          onClick={setDuration}
        /> */}
      </Stack>
      <Stack
        direction="row"
        wrap
        hAlign="center"
        fill={false}
        columnGap={104}
        rowGap={32}
      >
        <Stack hAlign="center">
          <BezierEditor
            value={value}
            readOnly={readOnly}
            className={styles.Editor}
            background="transparent"
            curveWidth={3}
            curveColor="var(--cta-default)"
            gridColor="var(--dimmed-1)"
            textStyle={{ color: 'var(--dimmed-5)' }}
            onChange={setValue}
            handleColor="var(--highlight-gray-foreground)"
            handleStroke={2}
            handleRadius={4}
          />
          <Stack direction="row" columnGap={24} vAlign="center">
            <Stack direction="row" columnGap={4} vAlign="center">
              <Symbol dimension={16} fill="var(--highlight-mint-foreground)" source="wave-sine" />
              {value.map((ele, i) => <code key={uid(ele + i)}>{ele.toFixed(2)}</code>)}
            </Stack>
            <Stack direction="row" columnGap={8} vAlign="center">
              <Symbol dimension={16} fill="var(--highlight-mint-foreground)" source="clock-rotate-left" />
              <Text as="span" size={14}>
                {timing === duration ? duration : duration * 2 }
                s
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          className={styles.Preview}
          direction="row"
          hAlign="center"
          fill={false}
          hPadding={48}
          columnGap={56}
          wrap
        >
          <LazyMotion features={domMax}>
            <Stack className={styles.PreviewItem} rowGap={8} vAlign="end" hAlign="center" fill={false}>
              <m.span
                variants={thumbAnimation}
                className={clsx(styles.Thumb, className)}
                initial="start"
                animate={isRunning ? 'end' : 'start'}
                transition={{
                  duration: isRunning ? timing : 0,
                  repeat: isRunning ? Infinity : 0,
                  repeatDelay: 1,
                  value,
                }}
              />
              <Text size={14}>Easing</Text>
            </Stack>

            {compare && (
            <Stack className={styles.PreviewItem} rowGap={8} vAlign="end" hAlign="center" fill={false}>
              <m.span
                variants={thumbAnimation}
                className={clsx(styles.Thumb, styles.ComparisonThumb)}
                initial="start"
                animate={isRunning ? 'end' : 'start'}
                transition={{
                  duration: isRunning ? timing : 0,
                  repeat: isRunning ? Infinity : 0,
                  repeatDelay: 1,
                  ease: 'linear',
                }}
                {...otherProps}
              />
              <Text size={14}>No easing</Text>
            </Stack>
            )}
          </LazyMotion>
        </Stack>
      </Stack>
    </Stack>
  );
};
