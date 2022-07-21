import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Grid } from './grid';

const story: ComponentMeta<typeof Grid> = {
  title: 'Layouts/Grid',
  component: Grid,
  args: {
  },
  argTypes: {
  },
};

export default story;

const Template: ComponentStory<typeof Grid> = args => (
  <Grid {...args}>
    <Grid.Item style={{ background: 'var(--dimmed-2)', padding: 24 }}>1</Grid.Item>
    <Grid.Item style={{ background: 'var(--dimmed-2)', padding: 24 }}>2</Grid.Item>
    <Grid.Item style={{ background: 'var(--dimmed-2)', padding: 24 }}>3</Grid.Item>
    <Grid.Item style={{ background: 'var(--dimmed-2)', padding: 24 }}>4</Grid.Item>
    <Grid.Item style={{ background: 'var(--dimmed-2)', padding: 24 }}>5</Grid.Item>
    <Grid.Item style={{ background: 'var(--dimmed-2)', padding: 24 }}>6</Grid.Item>
    <Grid.Item style={{ background: 'var(--dimmed-2)', padding: 24 }}>7</Grid.Item>
    <Grid.Item style={{ background: 'var(--dimmed-2)', padding: 24 }}>8</Grid.Item>
    <Grid.Item style={{ background: 'var(--dimmed-2)', padding: 24 }}>9</Grid.Item>
    <Grid.Item
      column="span 2"
      style={{ background: 'var(--dimmed-2)', padding: 24 }}
    >
      10
    </Grid.Item>
    <Grid.Item style={{ background: 'var(--dimmed-2)', padding: 24 }}>11</Grid.Item>
    <Grid.Item style={{ background: 'var(--dimmed-2)', padding: 24 }}>12</Grid.Item>
    <Grid.Item style={{ background: 'var(--dimmed-2)', padding: 24 }}>13</Grid.Item>
    <Grid.Item style={{ background: 'var(--dimmed-2)', padding: 24 }}>14</Grid.Item>
    <Grid.Item style={{ background: 'var(--dimmed-2)', padding: 24 }}>15</Grid.Item>
    <Grid.Item style={{ background: 'var(--dimmed-2)', padding: 24 }}>16</Grid.Item>
    <Grid.Item style={{ background: 'var(--dimmed-2)', padding: 24 }}>17</Grid.Item>
    <Grid.Item style={{ background: 'var(--dimmed-2)', padding: 24 }}>18</Grid.Item>
    <Grid.Item style={{ background: 'var(--dimmed-2)', padding: 24 }}>19</Grid.Item>
    <Grid.Item style={{ background: 'var(--dimmed-2)', padding: 24 }}>20</Grid.Item>
  </Grid>
);

export const Default = Template.bind({});
