import { AspectRatio } from '@wonderflow/react-components'
import React, { useState, createRef, useCallback } from 'react'

import styles from './video-player.module.css'

type VideoPlayerProps = PropsWithClass & {
  src: string;
  type?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  aspectRatio?: string;
  preload?: 'auto' | 'metadata' | 'none';
}

export const VideoPlayer = ({
  src,
  type = 'video/mp4',
  controls = false,
  autoPlay = false,
  loop = true,
  aspectRatio = '16/9',
  preload = 'metadata',
  ...otherProps
}: VideoPlayerProps) => {
  const videoRef = createRef<HTMLVideoElement>()
  const [paused, setPaused] = useState(() => (!autoPlay))

  const playPause = useCallback(
    () => {
      if (paused) {
        videoRef.current?.play()
        setPaused(false)
      } else {
        videoRef.current?.pause()
        setPaused(true)
      }
    },
    [paused, videoRef]
  )

  return (
    <AspectRatio ratio={aspectRatio}>
      <button type="button" onClick={playPause} className={styles.VideoPlayer} role="presentation" {...otherProps}>
        {paused && !controls
          ? (
            <div className={styles.Overlay}>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 459 459">
                <path d="M229.5 0C102.751 0 0 102.751 0 229.5S102.751 459 229.5 459 459 356.249 459 229.5 356.249 0 229.5 0zm80.792 239.651l-111.764 76.084a12.281 12.281 0 01-19.19-10.151V153.416a12.281 12.281 0 0119.19-10.151l111.764 76.084a12. 28 12.28 0 010 20.302z" />
              </svg>
            </div>
            )
          : null}
        <video preload={preload} controls={controls} autoPlay={autoPlay} loop={loop} ref={videoRef}>
          <source src={src} type={type} />
          Sorry, your browser doesn&apos;t support embedded videos.
        </video>
      </button>
    </AspectRatio>
  )
}
