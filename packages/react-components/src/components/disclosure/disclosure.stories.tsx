import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Autocomplete } from '../autocomplete';
import { Chip } from '../chip';
import { IconButton } from '../icon-button';
import { Menu, MenuItem } from '../menu';
import { Popover } from '../popover';
import { Disclosure } from './disclosure';

const story: ComponentMeta<typeof Disclosure> = {
  title: 'Actions/Disclosure',
  component: Disclosure,
  args: {
    padding: true,
    expandable: true,
    dimension: 'regular',
    summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    open: false,
  },
  argTypes: {
    expandable: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    padding: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    dimension: {
      options: ['small', 'regular', 'big'],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof Disclosure> = args => (
  <Disclosure {...args}>
    <Autocomplete
      style={{ maxWidth: '300px', padding: '0.5rem 0' }}
      icon="magnifying-glass"
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

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
      sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!
      {' '}
      <Popover trigger={<IconButton icon="circle-info" dimension="small" kind="flat" />}>
        <Menu style={{ maxWidth: '300px' }}>
          <MenuItem value="1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
            sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!
          </MenuItem>
        </Menu>

      </Popover>
    </p>

  </Disclosure>
);

export const Default = Template.bind({});

const NestedTemplate: ComponentStory<typeof Disclosure> = args => (
  <Disclosure {...args}>
    <Autocomplete
      style={{ maxWidth: '300px', padding: '0.5rem 0' }}
      icon="magnifying-glass"
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

    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
    sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!

    <Disclosure summary="Nested">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
      sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!
    </Disclosure>
  </Disclosure>
);

export const Nested = NestedTemplate.bind({});
