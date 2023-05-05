import { ComponentStory, Meta } from '@storybook/react';
import React from 'react';

import {
  Container, Polymorphic,
  Separator,
} from '../..';
import { Text } from '../text-new';
import { Prose } from './prose';

const story: Meta<Polymorphic.OwnProps<typeof Prose>> = {
  title: 'Typography/Prose',
  component: Prose,
  args: {
    as: 'section',
  },
};

export default story;

export const Default: ComponentStory<typeof Prose> = args => (
  <Container dimension="medium">
    <Prose {...args}>
      <Text variant="heading-1">Title</Text>
      <Text variant="heading-4">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
        tempore quas labore officiis praesentium.
      </Text>
      <Text as="h2" variant="heading-2">Sample H2 Title</Text>
      <img style={{ width: '100%' }} alt="" src="https://images.unsplash.com/photo-1593963171957-d87a6279226d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
        tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus
        consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!
      </Text>

      <Separator />

      <Text as="h2" variant="heading-2">Sample H2 Title</Text>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
        tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus
        consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!
      </Text>
      <img style={{ width: '100%' }} alt="" src="https://images.unsplash.com/photo-1593963171957-d87a6279226d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
        tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus
        consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!
      </Text>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
        tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus
        consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!
      </Text>
      <Text as="h3" variant="heading-3">Sample H3 Title</Text>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
        tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus
        consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!
      </Text>
      <Text as="h4" variant="heading-4">Sample H4 Title</Text>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
        tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus
        consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!
      </Text>
    </Prose>
  </Container>
);
