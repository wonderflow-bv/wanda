import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SymbolNames } from '@wonderflow/symbols';
import clsx from 'clsx';
import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { useUIDSeed } from 'react-uid';

import {
  Button,
  Container,
  Disclosure,
  Grid, IconButton, Menu, ProductCard, Snackbar, Stack,
  Text,
  useBreakpoints,
  useBreakpointsConfig,
  useSSR,
} from '@/components';

import * as style from './shell.module.css';

const story: ComponentMeta<typeof Container> = {
  title: 'Examples/Wireframe',
  component: Container,
};

export default story;

type Config = {
  gutter: 16 | 24 | 32;
  col: 1 | 2 | 3 | 4 | 6;
  dimension: 'extra-large';
}

const Template: ComponentStory<typeof Container> = () => {
  const [isLeftOpen, setIsLeftOpen] = useState<boolean>(false);
  const [isRightOpen, setIsRightOpen] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const seed = useUIDSeed();
  const { isBrowser } = useSSR();
  const { matches, size } = useBreakpoints();

  const linkIcons: Array<Partial<SymbolNames>> = useMemo(() => ['accessibility', 'astronomy', 'crown', 'megaphone', 'thumbs-up'], []);

  const {
    value: containerValue,
    matches: containerMatches,
    size: containerSize,
  } = useBreakpointsConfig<Config>(
    {
      sm: { gutter: 16, col: 2, dimension: 'extra-large' },
      md: { gutter: 24, col: 3, dimension: 'extra-large' },
      lg: { gutter: 24, col: 4, dimension: 'extra-large' },
      xl: { gutter: 32, col: 6, dimension: 'extra-large' },
      fallback: { gutter: 16, col: 1, dimension: 'extra-large' },
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
    <Container dimension="full" padding={false} className={style.MainContainer}>
      <Stack direction="row">
        <Stack
          id="LeftMenu"
          rowGap={16}
          className={style.LeftMenu}
          data-is-open={isLeftOpen}
        >
          <div className={style.LeftMenuInner} data-is-open={isLeftOpen} />

          {isLeftOpen
            ? (
              <div>
                {linkIcons.map((e, i) => (<Menu.Item key={seed(`linkMenu${i}`)} disabled value={`${e}`} icon={linkIcons[i]}>{e}</Menu.Item>))}
              </div>
            )
            : (
              <Stack inline hAlign="center" rowGap={8}>
                {linkIcons.map((e, i) => (<IconButton key={`${e} ${seed(`icons${i}`)}`} disabled icon={linkIcons[i]} kind="flat" />))}
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
            className={style.MainMenu}
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
            className={clsx(style.Container, 'ContainerEx')}
          >
            <Stack rowGap={32} vPadding={32}>
              <Snackbar title="Product Card Container">
                <Text>{`Window Width: ${size}px - Breakpoints Match: ${matches.toUpperCase()}`}</Text>
                <Text>{`Container Width: ${containerSize}px - Grid Columns: ${containerValue.col} -  Grid Gutter: ${containerValue.gutter}px`}</Text>
                <Text>{`useBreakpointsConfig.value: ${JSON.stringify(containerValue)} - useBreakpointsConfig.matches: ${containerMatches.toUpperCase()}`}</Text>
              </Snackbar>

              <Grid
                colMinWidth="1rem"
                columns={containerValue.col}
                rowGap={containerValue.gutter}
                columnGap={containerValue.gutter}
                filling={false}
              >
                {Array(12).fill('Card').map((e, i) => (
                  <Grid.Item key={seed(`cards${i}`)}>
                    <ProductCard
                      source={['https://storage.googleapis.com/wonderflow-product-images/KITCHENAID%20CLASSIC%20SERIES.png']}
                      subtitle="brand name"
                      title={`Product-${e} ${i + 1}`}
                      sentiment={0.51}
                      rating={4.51}
                      feedbackCount={3251}
                      footer={`${new Date(Date.now()).toUTCString().slice(5, 16)}`}
                      menuActions={(
                        <Menu>
                          <Menu.Item
                            autoFocus
                            icon="news"
                            value="1"
                          >
                            Stats
                          </Menu.Item>
                        </Menu>
                      )}
                      highlightOnHover
                    />
                  </Grid.Item>
                ))}
              </Grid>
            </Stack>

          </Container>

        </Stack>

        <Stack
          id="RightMenu"
          className={style.RightMenu}
          data-is-open={isRightOpen}
        >
          <div className={style.RightMenuInner} />

          <div className={style.Filter}>
            {Array(10).fill('Filter').map((e, i) => (
              <Disclosure key={seed(`filters${i}`)} summary={`${e} ${String.fromCharCode(i + 65)}`}>
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

