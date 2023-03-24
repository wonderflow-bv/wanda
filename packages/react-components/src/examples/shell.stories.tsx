import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SymbolNames } from 'packages/symbols/dist';
import { useEffect, useRef, useState } from 'react';
import { useUIDSeed } from 'react-uid';

import {
  Button,
  Card,
  Container,
  Disclosure,
  Grid, IconButton, Menu, Snackbar, Stack, Text,
  Title,
  useBreakpoints,
  useBreakpointsConfig,
  useSSR,
} from '@/components';

const story: ComponentMeta<typeof Container> = {
  title: 'Examples/Wireframe',
  component: Container,
};

export default story;

const linkIcons: Array<Partial<SymbolNames>> = ['accessibility', 'astronomy', 'crown', 'megaphone', 'thumbs-up'];

const Template: ComponentStory<typeof Container> = () => {
  const [isLeftOpen, setIsLeftOpen] = useState<boolean>(false);
  const [isRightOpen, setIsRightOpen] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const seed = useUIDSeed();
  const { isBrowser } = useSSR();
  const { matches, size } = useBreakpoints();

  const {
    value: containerValue,
    matches: containerMatches,
    size: containerSize,
  } = useBreakpointsConfig<{ gutter: 16 | 24; col: 2 | 3 | 4 | 6; dimension: 'fixed' }>(
    {
      sm: { gutter: 16, col: 3, dimension: 'fixed' },
      md: { gutter: 24, col: 3, dimension: 'fixed' },
      lg: { gutter: 24, col: 4, dimension: 'fixed' },
      xl: { gutter: 24, col: 6, dimension: 'fixed' },
      fallback: { gutter: 16, col: 2, dimension: 'fixed' },
    },
    ref,
  );

  useEffect(
    () => {
      if (isBrowser) {
        document.body.style.padding = '0px';

        return () => {
          document.body.style.padding = '1rem';
        };
      }

      return undefined;
    }, [isBrowser],
  );

  return (
    <Container dimension="full" padding={false} style={{ backgroundColor: '#f9fafb' }}>
      <Stack direction="row">
        <Stack
          id="LeftMenu"
          rowGap={16}
          style={{
            maxWidth: isLeftOpen ? '279px' : '63px',
            minWidth: isLeftOpen ? '279px' : '63px',
            backgroundColor: 'var(--global-background)',
            borderRight: '1px solid var(--dimmed-1)',
          }}
        >
          <div style={{
            maxHeight: isLeftOpen ? '250px' : '64px',
            height: isLeftOpen ? '250px' : '64px',
            backgroundColor: isLeftOpen ? 'var(--global-background)' : 'var(--dimmed-1)',
            borderBottom: '1px solid var(--dimmed-1)',
            padding: '0.5rem',
            wordBreak: 'break-all',
          }}
          />

          {isLeftOpen
            ? (
              <div>
                {Array(5).fill('Link Menu').map((e, i) => (<Menu.Item key={seed('linkMenu')} disabled value={`${i}`} icon={linkIcons[i]}>{e}</Menu.Item>))}
              </div>
            )
            : (
              <Stack inline hAlign="center" rowGap={8}>
                {Array(5).fill('').map((e, i) => (<IconButton key={`${e} ${seed('icons')}`} disabled icon={linkIcons[i]} kind="flat" />))}
              </Stack>
            )}

        </Stack>

        <Stack>
          <Stack
            id="MainMenu"
            direction="row"
            vAlign="center"
            hAlign="space-between"
            columnGap={16}
            style={{
              maxHeight: '64px',
              height: '64px',
              backgroundColor: 'var(--global-background)',
              borderBottom: '1px solid var(--dimmed-1)',
              padding: '0 2rem',
            }}
          >
            <Stack inline>
              <Button kind="secondary" dimension="regular" fullWidth={false} onClick={() => setIsLeftOpen(!isLeftOpen)}>Menu</Button>
            </Stack>
            <Stack inline>
              <Button kind="secondary" dimension="regular" fullWidth={false} onClick={() => setIsRightOpen(!isRightOpen)}>Filters</Button>
            </Stack>
          </Stack>

          <Container
            ref={ref}
            dimension={containerValue.dimension}
            className="ContainerEx"
            style={{ overflow: 'auto', height: 'calc(100vh - 64px)' }}
          >
            <Stack rowGap={32} vPadding={32}>
              <Snackbar>
                <Title level="2">Product Card Container</Title>
                <Text as="span">{`Window Width: ${size}px - Breakpoints Match: ${matches.toUpperCase()}`}</Text>
                <br />
                <Text as="span">{`Container Width: ${containerSize}px - Grid Columns: ${containerValue.col} -  Grid Gutter: ${containerValue.gutter}px`}</Text>
                <br />
                <Text as="span">{`useBreakpointsConfig.value: ${JSON.stringify(containerValue)} - useBreakpointsConfig.matches: ${containerMatches.toUpperCase()}`}</Text>
              </Snackbar>

              <Grid
                columns={containerValue.col}
                rowGap={containerValue.gutter}
                columnGap={containerValue.gutter}
                filling={false}
              >
                {Array(12).fill('Card').map((e, i) => (
                  <Grid.Item key={seed('card')}>
                    <Card bordered style={{ height: '500px' }}>
                      <Stack hAlign="center">
                        <Text size={14}>{`${e} ${i + 1}`}</Text>
                      </Stack>
                    </Card>
                  </Grid.Item>
                ))}
              </Grid>
            </Stack>

          </Container>

        </Stack>

        <Stack
          id="RightMenu"
          style={{
            maxWidth: isRightOpen ? '299px' : '0px',
            minWidth: isRightOpen ? '299px' : '0px',
            backgroundColor: 'var(--global-background)',
            borderLeft: '1px solid var(--dimmed-1)',
            overflow: 'hidden',
          }}
        >
          <div style={{
            maxHeight: '64px',
            height: '64px',
            backgroundColor: 'var(--global-background)',
            borderBottom: '1px solid var(--dimmed-1)',
            padding: '0.5rem',
            wordBreak: 'break-all',
          }}
          />

          <div style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'scroll' }}>
            {Array(10).fill('Filter').map((e, i) => (
              <Disclosure key={seed('filter')} summary={`${e} ${String.fromCharCode(i + 65)}`}>
                <Menu.Item value="1" subtext="Hint Text">Menu Item 1</Menu.Item>
                <Menu.Item value="2" subtext="Hint Text">Menu Item 2</Menu.Item>
                <Menu.Item value="3" subtext="Hint Text">Menu Item 3</Menu.Item>
                <Menu.Item value="4" subtext="Hint Text">Menu Item 4</Menu.Item>
              </Disclosure>
            ))}
          </div>

        </Stack>
      </Stack>
    </Container>
  );
};

export const Shell = Template.bind({});

