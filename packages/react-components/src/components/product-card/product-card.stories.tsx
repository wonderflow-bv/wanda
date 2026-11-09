import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
  Button,
  Stack,
  Text,
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

export const Default = Template.bind({});
Default.args = {};

export const withoutTopBar = Template.bind({});
withoutTopBar.args = {
  sourceLabel: undefined,
  sourceIcon: undefined,
  badge: undefined,
};

export const withSourceLabelOnly = Template.bind({});
withSourceLabelOnly.args = {
  sourceIcon: undefined,
  badge: undefined,
};

export const loading = Template.bind({});
loading.args = {
  isLoading: true,
};

export const withFewKpis = Template.bind({});
withFewKpis.args = {
  rating: 4.3,
  nps: undefined,
  feedbackCount: 123,
  votesRating: undefined,
  votesCount: undefined,
  sentiment: 0.54,
  tgw: undefined,
  priceMin: undefined,
  priceMax: undefined,
  groups: undefined,
  users: undefined,
  usersCap: undefined,
  skus: undefined,
  skusCap: undefined,
};

export const withOverlayActions = Template.bind({});
withOverlayActions.args = {
  overlayActions: OverlayButtons,
};

export const clickable = Template.bind({});
clickable.args = {
  onClick: () => console.log('pressed'),
};

export const withMultipleProducts = Template.bind({});
withMultipleProducts.args = {
  source: SourceImages,
};

export const withBrokenImage = Template.bind({});
withBrokenImage.args = {
  source: [...SourceImages, 'broken'],
};

export const withNoMedia = Template.bind({});
withNoMedia.args = {
  source: [],
  subtitle: '',
  title: 'Wonderflow Space Catalog Label',
  titleRows: 2,
  kpiItems: 2,
  rating: undefined,
  sentiment: undefined,
  feedbackCount: undefined,
  votesCount: undefined,
  votesRating: undefined,
  nps: undefined,
  groups: undefined,
  tgw: undefined,
  priceMin: undefined,
  priceMax: undefined,
  users: 1789,
  usersCap: 1000,
  skus: 234,
  skusCap: 1000,
  footer: undefined,
};

export const withColoredCover = Template.bind({});
withColoredCover.args = {
  badge: 'New',
  source: [],
  subtitle: '',
  title: 'My first board',
  titleRows: 2,
  kpiItems: 2,
  rating: undefined,
  sentiment: undefined,
  feedbackCount: undefined,
  votesCount: undefined,
  votesRating: undefined,
  nps: undefined,
  groups: undefined,
  tgw: undefined,
  priceMin: undefined,
  priceMax: undefined,
  users: 1789,
  usersCap: 1000,
  skus: 234,
  skusCap: 1000,
  footer: undefined,
  hasColoredCover: true,
};
