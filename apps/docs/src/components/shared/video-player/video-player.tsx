import { AspectRatio } from '@wonderflow/react-components';
import React, { createRef, useCallback, useState } from 'react';

import styles from './video-player.module.css';

type VideoPlayerProps = PropsWithClass & {
  src: string;
  type?: string;
  autoPlay?: boolean;
  loop?: boolean;
  aspectRatio?: string;
  preload?: 'auto' | 'metadata' | 'none';
}

export const VideoPlayer = ({
  src,
  type = 'video/mp4',
  autoPlay = false,
  loop = true,
  aspectRatio = '16/9',
  preload = 'metadata',
  ...otherProps
}: VideoPlayerProps) => {
  const videoRef = createRef<HTMLVideoElement>();
  const [isPaused, setIsPaused] = useState(() => (!autoPlay));

  const playPause = useCallback(
    () => {
      if (isPaused) {
        void videoRef.current?.play();
        setIsPaused(false);
      } else {
        videoRef.current?.pause();
        setIsPaused(true);
      }
    },
    [isPaused, videoRef],
  );

  return (
    <AspectRatio ratio={aspectRatio}>
      <button type="button" onClick={playPause} className={styles.VideoPlayer} aria-label="Play video" {...otherProps}>
        {isPaused && (
          <div className={styles.Overlay}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 32 32">
              <g><path d="M16,0C7.178,0,0,7.178,0,16s7.178,16,16,16s16-7.178,16-16S24.822,0,16,0z M23.537,16.844l-11,7 C12.373,23.947,12.187,24,12,24c-0.165,0-0.331-0.041-0.481-0.123C11.199,23.701,11,23.365,11,23V9c0-0.365,0.199-0.701,0.519-0.877 c0.32-0.175,0.71-0.162,1.019,0.033l11,7C23.825,15.34,24,15.658,24,16S23.825,16.66,23.537,16.844z" /></g>
            </svg>
          </div>
        )}
        <video preload={preload} controls={false} autoPlay={autoPlay} loop={loop} ref={videoRef}>
          <source src={src} type={type} />
          Sorry, your browser doesn&apos;t support embedded videos.
        </video>
      </button>
    </AspectRatio>
  );
};
