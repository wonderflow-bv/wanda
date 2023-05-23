/* eslint-disable max-len */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import {
  Card, Chip, Container, Separator,
  Stack, Symbol,
} from '../..';
import { Text, TextVariants } from './text';

const story: ComponentMeta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  args: {
    variant: 'body-1',
    color: undefined,
    children: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius dolores, tempore quas labore officiis praesentium. Porro sed dolorem, numquam temporibus consequuntur quam doloremque ducimus error tempora illo aliquam nesciunt nostrum!',
    textAlign: 'start',
    preventBreakWord: false,
    truncate: false,
    maxWidth: '',
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
        'tagline-1',
        'tagline-2',
        'tagline-3',
        'subtitle-1',
        'subtitle-2',
        'body-1',
        'body-2',
        'body-3'],
      control: { type: 'select' },
    },
    color: {
      options: ['positive', 'informative', 'danger', 'warning', 'neutral', 'dark'],
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
    'heading-4', 'heading-5', 'heading-6', 'tagline-1', 'tagline-2', 'tagline-3', 'subtitle-1', 'subtitle-2', 'body-1', 'body-2', 'body-3'] as TextVariants[];

  return (
    <Container dimension="fixed">
      <Stack rowGap={16}>
        {variants.map(e => (
          <div key={e}>
            <Text variant="body-3">{e}</Text>
            <Text variant={e}>Wonderflow</Text>
          </div>
        ))}
      </Stack>
    </Container>
  );
};

export const Variants = TemplateVariants.bind({});

const TemplateColors: ComponentStory<typeof Text> = () => {
  type TextColors = 'positive' | 'informative' | 'danger' | 'warning' | 'neutral' | 'dark';
  const colors = ['positive', 'informative', 'danger', 'warning', 'neutral', 'dark'] as TextColors[];

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
      {variants.map(e => <Text key={e} variant={e} id={`${e}-danger`} anchor color="danger">{e}</Text>)}
    </Container>
  );
};

export const TitleWithAnchor = TemplateTitle.bind({});

const TemplateConstraint: ComponentStory<typeof Text> = args => (
  <Container dimension="fixed">
    <Card dimmed={0} bordered style={{ width: '300px', height: '200px' }}>
      <Text {...args} />
    </Card>
  </Container>
);

export const withConstraint = TemplateConstraint.bind({});
withConstraint.args = {
  children: 'Loremipsumdolor,sitametconsecteturadipisicingelit.Impeditautnonfugitanimiab?\nNemo,illumrepudiandaeaharumexvoluptateveritatisearumassumendasuscipit!',
};

const TemplateDecorators: ComponentStory<typeof Text> = () => {
  const variants = ['body-1', 'body-2', 'body-3'] as TextVariants[];
  const sizes = ['small', 'medium', 'big'] as Array<'small' | 'medium' | 'big'>;

  return (
    <Container dimension="fixed">
      <Stack rowGap={40}>
        {
          variants.map(v => (
            <Stack rowGap={8} key={v}>
              <Text
                variant={v}
                color="informative"
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

const TemplatePairing: ComponentStory<typeof Text> = () => (
  <Stack rowGap={32}>
    <div style={{ maxWidth: '800px' }}>
      <Text variant="display-1" preventResponsive>96px display-1</Text>
      <Text variant="tagline-1" preventResponsive>28px tagline-1 Lorem ipsum sit amet, consectur adipiscing elit. Fusce aliquet cursus.</Text>
    </div>

    <div style={{ maxWidth: '800px' }}>
      <Text variant="display-2" preventResponsive>80px display-2</Text>
      <Text variant="tagline-1" preventResponsive>28px tagline-1 Lorem ipsum sit amet, consectur adipiscing elit. Fusce aliquet cursus.</Text>
    </div>

    <div style={{ maxWidth: '800px' }}>
      <Text variant="display-3" preventResponsive>68px display-3</Text>
      <Text variant="tagline-2" preventResponsive>24px tagline-2 Lorem ipsum sit amet, consectur adipiscing elit. Fusce aliquet cursus.</Text>
    </div>

    <div style={{ maxWidth: '800px' }}>
      <Text variant="display-4" preventResponsive>56px display-4</Text>
      <Text variant="tagline-2" preventResponsive>24px tagline-2 Lorem ipsum sit amet, consectur adipiscing elit. Fusce aliquet cursus.</Text>
    </div>

    <div style={{ maxWidth: '800px' }}>
      <Text variant="tagline-3" preventResponsive>20px tagline-3</Text>
      <Text variant="heading-1" preventResponsive>48px heading-1</Text>
      <Text variant="tagline-3">20px tagline-3</Text>
    </div>

    <div style={{ maxWidth: '800px' }}>
      <Text variant="subtitle-1">16px subtitle-1</Text>
      <Text variant="heading-1" preventResponsive>48px heading-1</Text>
      <Text variant="body-1">16px body-1</Text>
    </div>

    <div style={{ maxWidth: '800px' }}>
      <Text variant="heading-1" preventResponsive>48px heading-1</Text>
      <Text variant="body-1">16px as body-1 Lorem ipsum sit amet, consectur adipiscing elit. Fusce aliquet cursus.</Text>
    </div>

    <div style={{ maxWidth: '800px' }}>
      <Text variant="heading-2" preventResponsive>40px heading-2</Text>
      <Text variant="body-1">16px as body-1 Lorem ipsum sit amet, consectur adipiscing elit. Fusce aliquet cursus.</Text>
    </div>

    <div>
      <Text variant="subtitle-1" color="danger">Heading Title with Body text</Text>
      <Separator />
    </div>

    <div style={{ maxWidth: '800px' }}>
      <Text variant="heading-3" preventResponsive>32px heading-3</Text>
      <Text variant="body-1">16px as body-1 Lorem ipsum sit amet, consectur adipiscing elit. Fusce aliquet cursus.</Text>
    </div>

    <div style={{ maxWidth: '800px' }}>
      <Text variant="heading-4" preventResponsive>28px heading-4</Text>
      <Text variant="body-1">16px as body-1 Lorem ipsum sit amet, consectur adipiscing elit. Fusce aliquet cursus.</Text>
    </div>

    <div style={{ maxWidth: '800px' }}>
      <Text variant="heading-5" preventResponsive>24px heading-5</Text>
      <Text variant="body-1">16px as body-1 Lorem ipsum sit amet, consectur adipiscing elit. Fusce aliquet cursus.</Text>
    </div>

    <div style={{ maxWidth: '800px' }}>
      <Text variant="heading-6" preventResponsive>20px heading-6</Text>
      <Text variant="body-1">16px as body-1 Lorem ipsum sit amet, consectur adipiscing elit. Fusce aliquet cursus.</Text>
    </div>

    <div style={{ maxWidth: '800px' }}>
      <Text variant="heading-6" preventResponsive>20px heading-6</Text>
      <Text variant="body-2">14px as body-2 Lorem ipsum sit amet, consectur adipiscing elit. Fusce aliquet cursus.</Text>
    </div>

    <div style={{ maxWidth: '800px' }}>
      <Text variant="subtitle-1">16px subtitle-1</Text>
      <Text variant="body-2">14px as body-2 Lorem ipsum sit amet, consectur adipiscing elit. Fusce aliquet cursus.</Text>
    </div>

    <div>
      <Text variant="subtitle-1" color="danger">Title with eyebrow text</Text>
      <Separator />
    </div>

    <div style={{ maxWidth: '800px' }}>
      <Text variant="subtitle-1">16px subtitle-1</Text>
      <Text variant="heading-4" preventResponsive>28px heading-4</Text>
    </div>

    <div style={{ maxWidth: '800px' }}>
      <Text variant="subtitle-2">14px subtitle-2</Text>
      <Text variant="heading-5" preventResponsive>24px heading-5</Text>
    </div>

    <div>
      <Text variant="subtitle-1" color="danger">Paragraph with text</Text>
      <Separator />
    </div>

    <div style={{ maxWidth: '800px' }}>
      <Text>16px as body-1</Text>
      <Text variant="body-3">12px as body-3</Text>
    </div>

    <div style={{ maxWidth: '800px' }}>
      <Text variant="body-2">14px as body-2</Text>
      <Text variant="body-3">12px as body-3</Text>
    </div>

  </Stack>
);
export const sizePairing = TemplatePairing.bind({});
