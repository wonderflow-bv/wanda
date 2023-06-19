import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
  Button,
  Menu,
  Stack,
  Text,
} from '../../..';
import { ProductCard } from './product-card';

const OverlayButtons = (
  <Stack rowGap={16}>
    <Button>Stats</Button>
    <Button kind="secondary">Compare</Button>
    <Button kind="secondary">Add to group</Button>
  </Stack>
);

const MenuActions = (
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

const story: ComponentMeta<typeof ProductCard> = {
  title: 'Domain Components/Product Card',
  component: ProductCard,
  args: {
    direction: 'vertical',
    bordered: false,
    highlightOnHover: false,
    title: 'Product Card Title',
    subtitle: 'subtitle',
    description: '',
    source: 'https://storage.googleapis.com/wonderflow-product-images/KITCHENAID%205KSM15%20SERIES.png',
    rating: '4.3',
    feedbackCount: '123',
    votes: '',
    sentiment: '1.2',
    nps: '',
    groups: '',
    price: '',
    users: '',
    skus: '',
    isLoading: false,
    overlayActions: undefined,
    menuActions: undefined,
    onClick: undefined,
    children: undefined,
    footer: (<Text variant="body-2">Apr 2023</Text>),
  },
  argTypes: {
    direction: {
      options: ['vertical', 'horizontal'],
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

const Template: ComponentStory<typeof ProductCard> = args => <ProductCard {...args} style={{ maxWidth: args.direction === 'vertical' ? '350px' : '650px' }} />;

export const Default = Template.bind({});
Default.args = {};

export const withOverlayActions = Template.bind({});
withOverlayActions.args = {
  overlayActions: OverlayButtons,
};

export const withMenuActions = Template.bind({});
withMenuActions.args = {
  menuActions: MenuActions,
};

export const clickable = Template.bind({});
clickable.args = {
  onClick: () => console.log('pressed'),
};

