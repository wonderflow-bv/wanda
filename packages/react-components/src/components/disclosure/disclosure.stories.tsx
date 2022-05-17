import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { Disclosure } from './disclosure'

import { Disclosure } from './disclosure';

const story: ComponentMeta<typeof Disclosure> = {
  title: 'Components/Actions/Disclosure',
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
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
    sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!
  </Disclosure>
);

export const Default = Template.bind({});

const NestedTemplate: ComponentStory<typeof Disclosure> = args => (
  <Disclosure {...args}>
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

const AccordionTemplate: ComponentStory<typeof Disclosure> = (args) => {
  const [expandedItem, setExpandedItem] = useState<number>(0)

  return (
    <>
      <Disclosure
        {...args}
        open={expandedItem === 0}
        onToggle={t => t && setExpandedItem(0)}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
        sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!
      </Disclosure>

      <Disclosure
        {...args}
        summary="second"
        open={expandedItem === 1}
        onToggle={t => t && setExpandedItem(1)}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
        sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!
      </Disclosure>

      <Disclosure
        {...args}
        summary="third"
        open={expandedItem === 2}
        onToggle={t => t && setExpandedItem(2)}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
        sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!
      </Disclosure>

      <Disclosure
        {...args}
        summary="fourth"
        open={expandedItem === 3}
        onToggle={t => t && setExpandedItem(3)}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Doloribus corporis nobis ipsum natus laudantium dolorem sapiente,
        sint adipisci at asperiores quia ex voluptatum veniam! Quos rerum natus eos excepturi atque!
      </Disclosure>
    </>
  )
}

export const Accordion = AccordionTemplate.bind({})
