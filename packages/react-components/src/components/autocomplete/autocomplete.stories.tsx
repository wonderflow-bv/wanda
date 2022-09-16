/* eslint-disable no-console */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Chip, List } from '../..';
import { Autocomplete } from './autocomplete';

const story: ComponentMeta<typeof Autocomplete> = {
  title: 'Components/Inputs/Autocomplete',
  component: Autocomplete,
  args: {
    invalid: false,
  },
};

export default story;

const Template: ComponentStory<typeof Autocomplete> = args => (
  <>
    <Autocomplete
      onChange={value => console.log(value)}
      style={{ maxWidth: '300px' }}
      icon="magnifying-glass"
      {...args}
    >
      <Autocomplete.Option value="apple">
        Apple
      </Autocomplete.Option>
      <Autocomplete.Option
        value="banana"
        decoration={<Chip dimension="small" color="green">110 Cal</Chip>}
      >
        Banana
      </Autocomplete.Option>
      <Autocomplete.Option value="cherry">
        Cherry
      </Autocomplete.Option>
    </Autocomplete>
    <List>
      <List.Li>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Necessitatibus non laboriosam facere?
        {' '}
      </List.Li>
      <List.Li>
        Eum, assumenda ad sunt dolorum aspernatur quia sit! Mollitia eligendi
        accusantium alias non enim quaerat quidem fugiat architecto.
      </List.Li>
    </List>
  </>
);
export const Default = Template.bind({});

const BusyTemplate: ComponentStory<typeof Autocomplete> = args => (
  <Autocomplete
    onChange={value => console.log(value)}
    style={{ maxWidth: '300px' }}
    icon="magnifying-glass"
    busy
    {...args}
  />
);

export const Busy = BusyTemplate.bind({});

export const WithValue = Template.bind({});
WithValue.args = {
  value: '1',
};
