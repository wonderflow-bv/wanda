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
    vibrant: false,
    highlightOnHover: true,
    dimmed: 1,
    children: (
      <>
        <Text variant="heading-4">Product Card title</Text>
        <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Text>
      </>
    ),
  },
  argTypes: {
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

