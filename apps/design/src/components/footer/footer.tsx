import React from 'react'
import { IconButton, Button, Separator, Stack, Text, Title } from '@wonderflow/react-components'

export const Footer = () => {
  return (
    <Stack as="footer" rowGap={96}>
      <Stack direction="row" columnGap={32} rowGap={88} wrap>

        <Stack rowGap={24} fill={false} horizontalAlign="start">
          <Title level="4">Open Source</Title>
          <Text maxWidth="35ch" size={16}>
            We strongly believe in the propelling power of community-project, that’s why we choose to open source Wanda on Github.
            Contribution and feedback are welcome!
          </Text>
          <Button
            as="a"
            rel="noopener noreferrer"
            href="https://github.com/wonderflow-bv/design"
            kind="secondary"
            dimension="big"
            icon="github"
          >
            Contribute on GitHub
          </Button>
        </Stack>

        <Stack rowGap={24} fill={false}>
          <Title level="4">Keep in touch</Title>
          <Stack rowGap={16} horizontalAlign="start" fill={false} direction="row">
            <IconButton
              as="a"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/company/wonderflow"
              kind="flat"
              dimension="big"
              icon="linkedin"
              aria-label="Follow us on Linkedin"
            />
            <IconButton
              as="a"
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/wonderflow"
              kind="flat"
              dimension="big"
              icon="twitter"
              aria-label="Follow us on Twitter"
            />
            <IconButton
              as="a"
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/wonderflow-bv"
              kind="flat"
              dimension="big"
              icon="github"
              aria-label="Follow us on Github"
            />
            <IconButton
              as="a"
              target="_blank"
              rel="noopener noreferrer"
              href="https://wonderflow.ai"
              kind="flat"
              dimension="big"
              icon="compass"
              aria-label="Visit Wonderflow Website"
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack rowGap={24}>
        <Separator />
        <Stack rowGap={8}>
          <Text size={16} dimmed={6}>Created and maintained by Wonderflow’s Design System team.</Text>
          <Text size={16} dimmed={6}>
            &copy; Wonderflow
            {' '}
            {new Date().getFullYear()}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  )
}
