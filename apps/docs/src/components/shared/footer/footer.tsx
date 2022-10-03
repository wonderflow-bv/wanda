import {
  Container, IconButton, List, Separator, Stack, Text, Title,
} from '@wonderflow/react-components';
import Link from 'next/link';
import React, { FC } from 'react';

type FooterProps = {
  compact?: boolean;
}

export const Footer: FC<FooterProps> = ({
  compact = false,
}) => (
  <footer>
    {!compact && <Separator aria-hidden="true" />}
    <Container dimension="large" padding={compact ? false : undefined}>
      <Stack rowGap={40} vPadding={104}>
        {!compact && (
          <Stack direction="row" columnGap={32} rowGap={88} wrap>
            <Stack rowGap={24} fill={false} hAlign="start">
              <Title level="5">Open Source</Title>
              <Text maxWidth="35ch">
                We strongly believe in the propelling power of community-project,
                that’s why we choose to open source Wanda on Github.
                Contribution and feedback are welcome!
              </Text>
              <Stack direction="row">
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
                  href="https://github.com/wonderflow-bv/wanda"
                  icon="github"
                  target="_blank"
                  rel="noopner"
                  kind="flat"
                  dimension="big"
                  aria-label="Github link to the source code"
                />
                <IconButton
                  as="a"
                  href="https://twitter.com/wandaflow"
                  icon="twitter"
                  target="_blank"
                  rel="noopner"
                  kind="flat"
                  dimension="big"
                  aria-label="Follow us on Twitter"
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

            <Stack rowGap={24} fill={false}>
              <Title level="5">Designers</Title>
              <List hideMarker>
                <List.Li>
                  <Link href="/get-started/documentation/design/brand"><a>Brand</a></Link>
                </List.Li>
                <List.Li>
                  <Link href="/get-started/documentation/design/foundation/colors"><a>Foundation</a></Link>
                </List.Li>
                <List.Li>
                  <Link href="/get-started/symbols"><a>Symbols</a></Link>
                </List.Li>
                <List.Li>
                  <Link href="/get-started/documentation/design/motion/principles"><a>Motion</a></Link>
                </List.Li>
                <List.Li>
                  <Link href="/get-started/documentation/design/themes"><a>Themes</a></Link>
                </List.Li>
              </List>
            </Stack>
            <Stack rowGap={24} fill={false}>
              <Title level="5">Developers</Title>
              <List hideMarker>
                <List.Li>
                  <Link href="/get-started/documentation/develop/installation"><a>Installation</a></Link>
                </List.Li>
                <List.Li>
                  <Link href="/get-started/documentation/develop/design-tokens"><a>Design tokens</a></Link>
                </List.Li>
                <List.Li>
                  <Link href="/get-started/documentation/develop/styling/utilities"><a>Utilities</a></Link>
                </List.Li>
                <List.Li>
                  <Link href="/get-started/documentation/develop/using-themes"><a>Using themes</a></Link>
                </List.Li>
                <List.Li>
                  <Link href="/get-started/documentation/develop/ssr"><a>SSR</a></Link>
                </List.Li>
              </List>
            </Stack>
          </Stack>
        )}

        <Separator />

        <Stack rowGap={24}>
          <Stack rowGap={8}>
            <Text size={16} dimmed={6} lineHeight="none">
              Created and maintained by
              {' '}
              <a href="https://twitter.com/equinusocio">Mattia Astorino</a>
              {' '}
              for Wonderflow.
            </Text>
            <Text size={16} dimmed={6} lineHeight="none">
              &copy; Wonderflow
              {' '}
              {new Date().getFullYear()}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  </footer>
);
