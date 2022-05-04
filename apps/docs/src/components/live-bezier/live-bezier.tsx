import { IconButton, ToggleButton } from '@wonderflow/react-components'
import BezierEditor from 'bezier-easing-editor'
import React, {
  useCallback,
  useState,
  Fragment,
  CSSProperties
} from 'react'
import { useCopyToClipboard } from 'react-use'

import { LiveBezier as LiveBezierClass, Preview, Thumb, Editor, Linear, Label, Controls } from './live-bezier.module.css'

export type LiveBezierProps = PropsWithClass & {
  bezier: number[];
  duration?: number;
  readOnly?: boolean;
  showText?: boolean;
  compare?: boolean;
}

export const LiveBezier = ({
  duration = 1000,
  readOnly = true,
  showText = true,
  compare = true,
  bezier
}: LiveBezierProps) => {
  const [isRunning, setIsRunning] = useState(false)
  const [isSlowed, setIsSlowed] = useState(false)
  const [timing, setTiming] = useState(duration)
  const [, copyToClipboard] = useCopyToClipboard()

  const slowAnimation = useCallback(() => {
    setTiming(duration! * 4)
    setIsSlowed(true)
  }, [duration])

  const fastAnimation = useCallback(() => {
    setTiming(duration)
    setIsSlowed(false)
  }, [duration])

  const copyBezier = useCallback(
    () => () => {
      copyToClipboard(`cubic-bezier(${bezier})`)
    },
    [bezier, copyToClipboard]
  )

  const dynamicStyle = {
    '--duration': `${timing}ms`,
    '--easing': `cubic-bezier(${bezier})`
  } as CSSProperties

  return (
    <div
      className={LiveBezierClass}
      style={dynamicStyle}
      data-running={isRunning}
      data-compare={compare}
    >
      <BezierEditor
        defaultValue={bezier}
        readOnly={readOnly}
        className={Editor}
        background="transparent"
        curveWidth={3}
        curveColor={compare ? 'var(--cta-default)' : 'var(--dimmed-6)'}
        gridColor="var(--dimmed-1)"
        textStyle={{ color: 'var(--dimmed-5)' }}
      />
      <div className={Preview}>
        <span className={Thumb} />
        {compare
          ? (
            <Fragment>
              <span className={`${Thumb} ${Linear}`} />
              {showText && <span className={Label}><small>Easing</small></span>}
              {showText && <span className={Label}><small>No Easing</small></span>}
            </Fragment>
            )
          : null}
      </div>
      <div className={Controls}>
        <ToggleButton
          kind="secondary"
          restingIcon="play"
          pressedIcon="pause"
          title="Play/Pause animation"
          pressed={isRunning}
          onClick={() => isRunning ? setIsRunning(false) : setIsRunning(true)}
        />
        <ToggleButton
          kind="secondary"
          restingIcon="clock-rotate-left"
          pressedIcon="arrow-rotate-right"
          pressed={isSlowed}
          title="Slow animation"
          onClick={isSlowed ? fastAnimation : slowAnimation}
        />
        <IconButton
          kind="secondary"
          icon="layer-group"
          title="Copy values"
          onClick={copyBezier()}
        />
      </div>
    </div>
  )
}
