import { Stack, Text, Title } from '@wonderflow/react-components'
import { QuickLinks } from '@/components/quicklinks'
import { Hero as HeroClass, Video, Content } from './hero.module.css'

export const Hero = () => {
  return (
    <Stack className={HeroClass} verticalAlign="end" fill={false}>
      <video
        className={Video}
        autoPlay
        loop
        muted
        playsInline
        height="220"
        width="390"
        poster="/hero-poster.png"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <Stack rowGap={160} className={Content}>
        <Stack rowGap={32} horizontalAlign="start" inline>
          <Title level="display">Wanda</Title>
          <Text size={28} maxWidth="50ch">
            Wanda is Wonderflow’s open-source design system built for digital products and experiences.
          </Text>
        </Stack>
        <QuickLinks />
      </Stack>
    </Stack>
  )
}
