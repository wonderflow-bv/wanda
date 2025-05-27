import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
  Button,
  Menu,
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

const MenuItems = (
  <Menu>
    <Menu.Item
      autoFocus
      icon="news"
      value="1"
    >
      Stats
    </Menu.Item>
    <Menu.Item
      icon="theater"
      value="1"
    >
      Compare
    </Menu.Item>
    <Menu.Item
      icon="grid"
      value="1"
      placement="right-start"
      description="add product to group"
    >
      Add to group
    </Menu.Item>
  </Menu>

);

const SourceImages = [
  'https://products.gumlet.io/image-1675779605803.jpeg',
  'https://storage.googleapis.com/wonderflow-product-images/KITCHENAID%205KSM15%20SERIES.png',
  'https://storage.googleapis.com/wonderflow-product-images/CLASSIC%204.5%20QT.png',
  // 'https://storage.googleapis.com/wonderflow-product-images/delonghi_coffee_MC%20NESPRESSO%20INISSIA.png',
];

const story: ComponentMeta<typeof ProductCard> = {
  title: 'Domain Components/Product Card',
  component: ProductCard,
  args: {
    direction: 'vertical',
    bordered: false,
    highlightOnHover: false,
    title: 'Product Card Title',
    titleRows: 3,
    subtitle: 'subtitle',
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
    menuActions: undefined,
    onClick: undefined,
    children: undefined,
    source: SourceImages.slice(0, 1),
    footer: (<Text variant="body-2">Apr 2023</Text>),
  },
  argTypes: {
    direction: {
      options: ['vertical', 'horizontal'],
      control: { type: 'select' },
    },
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

const Template: ComponentStory<typeof ProductCard> = (args) => {
  const { direction } = args;
  return (<div style={{ maxWidth: direction === 'vertical' ? '250px' : '650px' }}><ProductCard {...args} /></div>
  );
};

export const Default = Template.bind({});
Default.args = {};

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

export const withMenuActions = Template.bind({});
withMenuActions.args = {
  menuActions: MenuItems,
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
