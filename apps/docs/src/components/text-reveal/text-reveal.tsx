import { CSSProperties, FC, useRef } from 'react'
import styles from './text-reveal.module.css'

export type TextRevealProps = PropsWithClass & {
  xOffset?: string;
  play?: boolean;
}

export const TextReveal: FC<TextRevealProps> = ({
  children,
  className,
  xOffset = '-10%',
  play,
  style,
  ...otherProps
}) => {
  const ref = useRef<HTMLSpanElement>(null)

  const dynamicStyle: CSSProperties = {
    '--x': xOffset
  }

  return (
    <span
      ref={ref}
      className={styles.TextReveal}
      data-text-reveal-is-running={play}
      style={{ ...dynamicStyle, ...style }}
      {...otherProps}
    >
      {children}
    </span>
  )
}
