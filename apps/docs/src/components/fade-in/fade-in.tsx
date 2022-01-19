import React, {
  CSSProperties, FC, useEffect, useRef, useState
} from 'react'
import { useInViewport } from 'ahooks'

import { FadeIn as FadeInClass } from './fade-in.module.css'

export type FadeInProps = PropsWithClass & {
  delay?: string;
  duration?: string;
  onlyDesktop?: boolean;
}

export const FadeIn: FC<FadeInProps> = ({
  children,
  delay,
  duration = '0.8s',
  onlyDesktop
}) => {
  const [visible, setVisible] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
  const [inViewport] = useInViewport(ref, {
    root: null,
    rootMargin: '0px',
    threshold: 0.8
  })

  const dynamicStyle: CSSProperties = {
    '--delay': delay,
    '--duration': duration
  }

  useEffect(() => {
    inViewport && setVisible(true)
  }, [inViewport])

  return (
    <div
      data-fade-in-is-running={visible}
      data-fade-in-only-desktop={Boolean(onlyDesktop)}
      className={FadeInClass}
      style={dynamicStyle}
      ref={ref}
    >
      {children}
    </div>
  )
}
