import { ComponentMeta, ComponentStory } from '@storybook/react';

import { LineChart } from './line-chart';

const story: ComponentMeta<typeof LineChart> = {
  title: 'Charts/Line Chart',
  component: LineChart,
  args: {
  },
  argTypes: {},
};

export default story;

const Template: ComponentStory<typeof LineChart> = args => <LineChart {...args} />;

export const Default = Template.bind({});
Default.args = {};
