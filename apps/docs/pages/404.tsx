import React from 'react'
import { InfoState, Stack, Text, Button } from '@wonderflow/react-components'
import Link from 'next/link'

export const Custom404 = () => {
  return (
    <Stack style={{ minHeight: '100vh' }} fill={false} horizontalAlign="center" verticalAlign="center">
      <video
        style={{
          filter: 'saturate(2) hue-rotate(333deg)',
          minBlockSize: '100%',
          minInlineSize: '100%',
          display: 'block',
          objectFit: 'cover',
          objectPosition: 'center',
          position: 'absolute',
          inset: '0',
          opacity: 0.1
        }}
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
      <InfoState
        title="Cannot find the page"
        icon="frown"
        iconColor="red"
        actions={<Link href="/" passHref><Button as="a">Start from the home</Button></Link>}
      >
        <Text as="span" style={{ display: 'block' }} maxWidth="40ch" textAlign="center">
          We&apos;re not able to find the requested page or you entered an invalid link.
        </Text>
      </InfoState>
    </Stack>
  )
}

export default Custom404
