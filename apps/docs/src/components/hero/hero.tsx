import { Stack, Text, Title } from '@wonderflow/react-components'
import { QuickLinks } from '@/components/quicklinks'
import { Hero as HeroClass, Video, Content } from './hero.module.css'
import { useTheme } from 'next-themes'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export const Hero = () => {
  const shouldReduceMotion = useReducedMotion()
  const [isDark, setIsDark] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
      setIsDark(matches)
    })
  }, [theme])

  return (
    <Stack className={HeroClass} vAlign="end" fill={false}>
      {(mounted) && (
        <video
          src={theme !== 'system' ? `/hero-video-${theme}.mp4` : `/hero-video-${isDark ? 'dark' : 'light'}.mp4`}
          className={Video}
          autoPlay={!shouldReduceMotion}
          loop
          muted
          playsInline
          height="220"
          width="390"
        />
      )}
      <Stack rowGap={160} className={Content}>
        <Stack rowGap={32} hAlign="start" inline>
          <Title level="display">
            Wanda
          </Title>
          <Text size={28} maxWidth="50ch">
            Wanda is Wonderflow’s open-source design system built for digital products and experiences.
          </Text>
        </Stack>
        <QuickLinks />
      </Stack>
    </Stack>
  )
}
