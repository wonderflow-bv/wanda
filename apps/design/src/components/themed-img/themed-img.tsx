import React, { ImgHTMLAttributes, useEffect, useMemo, useState } from 'react'
import { useTheme } from 'next-themes'
import { ThemedImg as ThemedImgClass } from './themed-img.module.css'

export type ThemedImgProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
}

export const ThemedImg = ({
  src,
  alt,
  width = '770',
  height = '370',
  ...props
}: ThemedImgProps) => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const srcParts = src.split('.')
  const lightSrc = useMemo(() => `${srcParts[0]}-light.${srcParts[1]}`, [srcParts])
  const darkSrc = useMemo(() => `${srcParts[0]}-dark.${srcParts[1]}`, [srcParts])
  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <picture className={ThemedImgClass}>
      {resolvedTheme === 'dark' && (
        <source
          srcSet={darkSrc}
          media="(prefers-color-scheme: dark)"
        />
      )}
      <img
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
        src={(resolvedTheme === 'light') ? lightSrc : darkSrc}
        alt={alt || ''}
        {...props}
      />
    </picture>
  )
}
