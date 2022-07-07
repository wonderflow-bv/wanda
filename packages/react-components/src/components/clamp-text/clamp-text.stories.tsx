import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Container } from '../..';
import { ClampText } from './clamp-text';

const story: ComponentMeta<typeof ClampText> = {
  title: 'Components/Typography/Clamp Text',
  component: ClampText,
  args: {
    expandOnHover: false,
  },
  argTypes: {
    rows: {
      control: { type: 'number' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof ClampText> = args => (
  <Container dimension="medium">
    <ClampText {...args}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam in quas magnam vitae vel ducimus,
      minus quia. Deserunt distinctio suscipit veritatis ab deleniti dolores, eligendi totam? Quae cum
      neque expedita. Odit incidunt voluptate inventore eos sunt possimus fugiat earum cupiditate?
      Ea possimus beatae quaerat totam exercitationem at nostrum asperiores libero, enim delectus
      doloribus in culpa. Dicta laudantium aliquid nostrum voluptate.
      Illo inventore quam, minima excepturi enim voluptatibus, corporis maxime similique deserunt
      dolorem veniam laboriosam? Ratione sint deserunt, non rem eligendi, numquam laboriosam vel
      tempore eum delectus nobis nisi aperiam tenetur.
      Sed beatae sapiente reiciendis, eaque, aperiam dignissimos sunt ea doloremque repellat
      sequi voluptate nulla accusantium, ut similique commodi omnis adipisci! Provident veritatis
      pariatur sint reiciendis excepturi sequi sunt, aspernatur tempore.
      Dolores, tenetur eos tempore eaque facere ut ea rerum quia quasi quisquam numquam eius
      mollitia sunt voluptatem aliquam officia laudantium nemo enim quam nesciunt at deserunt.
      Harum, minus porro? Dolores.
    </ClampText>
  </Container>
);

export const Default = Template.bind({});
Default.args = {
  rows: 3,
};
