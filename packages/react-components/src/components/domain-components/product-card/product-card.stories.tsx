import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
  Text,
} from '../../..';
import { ProductCard } from './product-card';

const story: ComponentMeta<typeof ProductCard> = {
  title: 'Domain Components/ProductCard',
  component: ProductCard,
  args: {
    bordered: false,
    highlightOnHover: false,
    children: (<Text>Product Card Content</Text>),
    footer: (<Text>Product Card Footer</Text>),
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

