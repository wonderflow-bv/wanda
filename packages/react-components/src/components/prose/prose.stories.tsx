import { ComponentStory, Meta } from '@storybook/react';

import {
  Container, Separator, Text, Title,
} from '../..';
import { Prose } from './prose';

const story: Meta<typeof Prose> = {
  title: 'Components/Typography/Prose',
  component: Prose,
  args: {
    as: 'section',
  },
};

export default story;

export const Default: ComponentStory<typeof Prose> = args => (
  <Container dimension="medium">
    <Prose {...args}>
      <Title as="h1" level="display">Title</Title>
      <Text size={28}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
        tempore quas labore officiis praesentium.
      </Text>
      <Title as="h2" level="2">Sample H2 Title</Title>
      <img style={{ width: '100%' }} alt="" src="https://images.unsplash.com/photo-1593963171957-d87a6279226d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
        tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus
        consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!
      </Text>

      <Separator />

      <Title as="h2" level="2">Sample H2 Title</Title>
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
      <Title as="h3" level="3">Sample H3 Title</Title>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
        tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus
        consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!
      </Text>
      <Title as="h4" level="4">Sample H4 Title</Title>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores,
        tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus
        consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!
      </Text>
    </Prose>
  </Container>
);
