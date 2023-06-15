import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
  Text,
} from '../../..';
import { ProductCard } from './product-card';

const story: ComponentMeta<typeof ProductCard> = {
  title: 'Domain Components/ProductCard',
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

const Template: ComponentStory<typeof ProductCard> = args => <ProductCard {...args} />;

export const Default = Template.bind({});
Default.args = {};

