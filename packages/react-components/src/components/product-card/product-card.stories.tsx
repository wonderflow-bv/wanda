import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  ComponentProps, useEffect, useRef, useState,
} from 'react';

import {
  Button,
  Container,
  Grid,
  Stack,
  Text,
  useBreakpointsConfig,
} from '../..';
import { ProductCard } from './product-card';

const OverlayButtons = (
  <Stack rowGap={16}>
    <Button>Stats</Button>
    <Button kind="secondary">Compare</Button>
    <Button kind="secondary">Add to group</Button>
  </Stack>
);

const SourceImages = [
  'https://products.gumlet.io/image-1675779605803.jpeg',
  'https://storage.googleapis.com/wonderflow-product-images/KITCHENAID%205KSM15%20SERIES.png',
  'https://storage.googleapis.com/wonderflow-product-images/CLASSIC%204.5%20QT.png',
  // 'https://storage.googleapis.com/wonderflow-product-images/delonghi_coffee_MC%20NESPRESSO%20INISSIA.png',
];

const SourceLogo = <img src="/amazon-logo.png" alt="Amazon" />;

const NoKpis = {
  rating: undefined,
  nps: undefined,
  feedbackCount: undefined,
  votesRating: undefined,
  votesCount: undefined,
  sentiment: undefined,
  tgw: undefined,
  priceMin: undefined,
  priceMax: undefined,
  groups: undefined,
  users: undefined,
  usersCap: undefined,
  skus: undefined,
  skusCap: undefined,
};

const story: ComponentMeta<typeof ProductCard> = {
  title: 'Domain Components/Product Card',
  component: ProductCard,
  args: {
    bordered: true,
    highlightOnHover: false,
    title: 'Product Card Title',
    titleRows: 3,
    subtitle: 'subtitle',
    sourceLabel: 'Amazon',
    sourceIcon: SourceLogo,
    badge: 'New',
    rating: 4.3,
    nps: 23,
    feedbackCount: 123,
    votesRating: 2.3,
    votesCount: 3456,
    sentiment: 0.54,
    tgw: 0.75,
    priceMin: 33,
    priceMax: 45,
    currency: 'EUR',
    currencyDecimals: 0,
    groups: 4,
    users: 789,
    usersCap: 1000,
    skus: 2,
    skusCap: 1000,
    kpiItems: 3,
    kpisRowGap: 8,
    expandable: false,
    expandLabel: 'Show more',
    collapseLabel: 'Show less',
    isLoading: false,
    ratio: '1',
    overlayActions: undefined,
    onClick: undefined,
    children: undefined,
    source: SourceImages.slice(0, 1),
    footer: (<Text variant="body-3">Apr 2023</Text>),
  },
  argTypes: {
    currency: {
      options: ['EUR', 'USD', 'GBP', 'JPY', 'CNY'],
      control: { type: 'select' },
    },
    kpisRowGap: {
      options: [2, '2', 4, '4', 8, '8', 16, '16', 24, '24', 32, '32', 40, '40', 48, '48', 56, '56', 64, '64', 72, '72', 80, '80', 88, '88', 96, '96', 104, '104', 112, '112', 120, '120', 128, '128', 136, '136', 144, '144', 152, '152', 160, '160', 168, '168', 176, '176', 184, '184', 192, '192', 200, '200'],
      control: { type: 'select' },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
};

export default story;

const Template: ComponentStory<typeof ProductCard> = args => (
  <div style={{ width: '272px' }}><ProductCard {...args} /></div>
);

// Base

export const Default = Template.bind({});
Default.args = {
  kpiItems: 11,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

// Cover

export const WithMultipleImages = Template.bind({});
WithMultipleImages.args = {
  source: SourceImages,
};

export const WithBrokenImage = Template.bind({});
WithBrokenImage.args = {
  source: [...SourceImages, 'broken'],
};

export const WithColoredCover = Template.bind({});
WithColoredCover.args = {
  ...NoKpis,
  source: [],
  subtitle: '',
  title: 'My first board',
  titleRows: 2,
  kpiItems: 2,
  users: 1789,
  usersCap: 1000,
  skus: 234,
  skusCap: 1000,
  footer: undefined,
};

// Top bar

export const WithoutTopBar = Template.bind({});
WithoutTopBar.args = {
  sourceLabel: undefined,
  sourceIcon: undefined,
  badge: undefined,
};

export const WithSourceLabelOnly = Template.bind({});
WithSourceLabelOnly.args = {
  sourceIcon: undefined,
  badge: undefined,
};

// Content

export const WithFewKpis = Template.bind({});
WithFewKpis.args = {
  ...NoKpis,
  rating: 4.3,
  feedbackCount: 123,
  sentiment: 0.54,
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  sourceLabel: undefined,
  sourceIcon: undefined,
  badge: undefined,
  subtitle: '',
  title: 'Domestic Appliances and Tools',
  titleRows: 2,
  description: 'Appliances and tools for everyday cooking, cleaning, and home maintenance.',
  descriptionRows: 3,
  kpiItems: 0,
  footer: undefined,
};

// Interactions

export const Clickable = Template.bind({});
Clickable.args = {
  onClick: () => console.log('pressed'),
};

export const WithOverlayActions = Template.bind({});
WithOverlayActions.args = {
  overlayActions: OverlayButtons,
};

export const WithOverlayActionsOnColoredCover = Template.bind({});
WithOverlayActionsOnColoredCover.args = {
  ...WithColoredCover.args,
  overlayActions: OverlayButtons,
};

const InitialKpis: ComponentProps<typeof ProductCard> = { ...NoKpis, rating: 4.3, nps: 23 };
const ExtraKpis = { feedbackCount: 123, votesRating: 2.3, sentiment: 0.54 };

// The card only reveals the KPIs it is given: the consumer provides the extra ones when the toggle is pressed.
const ExpandableCard = (args: ComponentProps<typeof ProductCard>) => {
  const [kpis, setKpis] = useState(InitialKpis);

  const handleExpandedChange = (expanded: boolean) => {
    if (expanded) setKpis({ ...InitialKpis, ...ExtraKpis });
  };

  return <ProductCard {...args} {...kpis} onExpandedChange={handleExpandedChange} />;
};

// Same as above, but the extra KPIs arrive after a fake network request, and are dropped as soon as the card collapses.
const AsyncExpandableCard = (args: ComponentProps<typeof ProductCard>) => {
  const [kpis, setKpis] = useState(InitialKpis);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timeout.current), []);

  const handleExpandedChange = (expanded: boolean) => {
    clearTimeout(timeout.current);

    if (expanded) timeout.current = setTimeout(() => setKpis({ ...InitialKpis, ...ExtraKpis }), 800);
    else setKpis(InitialKpis);
  };

  return <ProductCard {...args} {...kpis} onExpandedChange={handleExpandedChange} />;
};

export const ExpandableKpisAsync: ComponentStory<typeof ProductCard> = args => (
  <div style={{ width: '272px' }}><AsyncExpandableCard {...args} /></div>
);

ExpandableKpisAsync.args = {
  kpiItems: 2,
  expandable: true,
};

export const ExpandableKpis: ComponentStory<typeof ProductCard> = args => (
  <div style={{ width: '272px' }}><ExpandableCard {...args} /></div>
);

ExpandableKpis.args = {
  kpiItems: 2,
  expandable: true,
  overlayActions: OverlayButtons,
};

const GridOverlayButtons = (
  <Stack rowGap={8}>
    <Button>Stats</Button>
    <Button kind="secondary">Compare</Button>
    <Button kind="secondary">Add to group</Button>
    <Button kind="secondary">Share</Button>
    <Button kind="flat">Remove</Button>
  </Stack>
);

// Same grid as the Wonderboard catalog (cards view): columns and gutters follow the container width.
export const ExpandableKpisInGrid: ComponentStory<typeof ProductCard> = (args) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { value } = useBreakpointsConfig(
    {
      xs: { columns: 1, gutter: 16 },
      sm: { columns: 2, gutter: 16 },
      md: { columns: 3, gutter: 24 },
      lg: { columns: 4, gutter: 24 },
      xl: { columns: 6, gutter: 32 },
      fallback: { columns: 1, gutter: 16 },
    } as const,
    containerRef,
  );

  return (
    <Container>
      <Stack vPadding={32} rowGap={32} fill={false} ref={containerRef}>
        <div style={{ paddingTop: '12px' }}>
          <Grid
            rowGap={value.gutter}
            columnGap={value.gutter}
            columns={value.columns}
            filling={false}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Grid.Item key={i}>
                <ExpandableCard {...args} />
              </Grid.Item>
            ))}
          </Grid>
        </div>
      </Stack>
    </Container>
  );
};

ExpandableKpisInGrid.args = {
  ...ExpandableKpis.args,
  overlayActions: GridOverlayButtons,
};
