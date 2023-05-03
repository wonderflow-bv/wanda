/* eslint-disable max-len */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import {
  Card, Chip, Container, Stack, Symbol,
} from '../..';
import { Text, TextVariants } from './text';

const story: ComponentMeta<typeof Text> = {
  title: 'Typography/Text-New',
  component: Text,
  args: {
    variant: 'body-1',
    color: undefined,
    children: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores, tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!',
    textAlign: 'start',
    breakWord: false,
    truncate: false,
    preventResponsive: false,
    anchor: false,
  },
  argTypes: {
    variant: {
      options: [
        'display-1',
        'display-2',
        'display-3',
        'display-4',
        'heading-1',
        'heading-2',
        'heading-3',
        'heading-4',
        'heading-5',
        'heading-6',
        'subtitle-1',
        'subtitle-2',
        'body-1',
        'body-2',
        'body-3'],
      control: { type: 'select' },
    },
    color: {
      options: ['positive', 'informative', 'danger', 'warning'],
      control: { type: 'select' },
    },
    textAlign: {
      options: ['start', 'center', 'end', 'justify'],
      control: { type: 'inline-radio' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof Text> = args => <Container dimension="fixed"><Text {...args} /></Container>;

export const Default = Template.bind({});

const TemplateVariants: ComponentStory<typeof Text> = () => {
  const variants = ['display-1', 'display-2', 'display-3', 'display-4', 'heading-1', 'heading-2', 'heading-3',
    'heading-4', 'heading-5', 'heading-6', 'subtitle-1', 'subtitle-2', 'body-1', 'body-2', 'body-3'] as TextVariants[];

  return (
    <Container dimension="fixed">
      {variants.map(e => <Text key={e} variant={e}>{e}</Text>)}
    </Container>
  );
};

export const Variants = TemplateVariants.bind({});

const TemplateColors: ComponentStory<typeof Text> = () => {
  type TextColors = 'positive' | 'informative' | 'danger' | 'warning';
  const colors = ['positive', 'informative', 'danger', 'warning'] as TextColors[];

  return (
    <Container dimension="fixed">
      {colors.map(e => <Text key={e} variant="heading-1" color={e}>{e}</Text>)}
    </Container>
  );
};

export const Colors = TemplateColors.bind({});

const TemplateTitle: ComponentStory<typeof Text> = () => {
  const variants = ['display-1', 'display-2', 'display-3', 'display-4', 'heading-1', 'heading-2', 'heading-3',
    'heading-4', 'heading-5', 'heading-6'] as TextVariants[];

  return (
    <Container dimension="fixed">
      {variants.map(e => <Text key={e} variant={e} id={e} anchor>{e}</Text>)}
    </Container>
  );
};

export const Title = TemplateTitle.bind({});

const TemplateConstraint: ComponentStory<typeof Text> = args => (
  <Container dimension="fixed">
    <Card dimmed={0} bordered style={{ width: '300px', height: '200px' }}>
      <Text {...args} />
    </Card>
  </Container>
);

export const withConstraint = TemplateConstraint.bind({});
withConstraint.args = {
  breakWord: true,
  children: 'Loremipsumdolor,sitametconsecteturadipisicingelit.Impeditautnonfugitanimiab?\nNemo,illumrepudiandaeaharumexvoluptateveritatisearumassumendasuscipit!',
};

const TemplateDecorators: ComponentStory<typeof Text> = () => {
  const variants = ['body-1', 'body-2', 'body-3'] as TextVariants[];
  const sizes = ['small', 'regular', 'big'] as Array<'small' | 'regular' | 'big'>;

  return (
    <Container dimension="fixed">
      <Stack rowGap={40}>
        {
          variants.map(v => (
            <Stack rowGap={8} key={v}>
              <Text
                variant={v}
                decoratorSize={sizes[0]}
                decoratorStart={<Symbol source="circle-check" weight="solid" />}
                decoratorEnd={<Chip color="cyan">{sizes[0]}</Chip>}
              >
                {v}
              </Text>
              <Text
                variant={v}
                decoratorSize={sizes[1]}
                decoratorStart={<Symbol source="circle-check" weight="solid" />}
                decoratorEnd={<Chip color="green">{sizes[1]}</Chip>}
              >
                {v}
              </Text>
              <Text
                variant={v}
                decoratorSize={sizes[2]}
                decoratorStart={<Symbol source="circle-check" weight="outline" color="red" />}
                decoratorEnd={<Chip color="red">{sizes[2]}</Chip>}
              >
                {v}
              </Text>
            </Stack>
          ))
        }
      </Stack>
    </Container>
  );
};

export const withDecorators = TemplateDecorators.bind({});
