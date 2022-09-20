import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import {
  Button, Select, Stack, Textfield,
} from '../..';
import { InputGroup } from './input-group';

const story: ComponentMeta<typeof InputGroup> = {
  title: 'Inputs/Input group',
  component: InputGroup,
  args: {
    input: <Textfield type="text" defaultValue="sample" />,
  },
};

export default story;

const Default: ComponentStory<typeof InputGroup> = args => (
  <Stack inline fill={false} hAlign="start" rowGap={32}>
    <InputGroup
      suffix={<Button>Confirm</Button>}
      {...args}
    />
    <InputGroup
      suffix={<Textfield disabled size={9} placeholder="@mail.com" />}
      {...args}
    />
    <InputGroup
      dimension="big"
      label="Sample label"
      prefix={<Textfield readOnly size={6} defaultValue="https://" />}
      suffix={(
        <Select defaultValue={1}>
          <option value="1">.com</option>
          <option value="2">.it</option>
          <option value="3">.org</option>
          <option value="4">.dev</option>
          <option value="5">.io</option>
        </Select>
      )}
      {...args}
    />
  </Stack>
);

export const Single = Default.bind({});
