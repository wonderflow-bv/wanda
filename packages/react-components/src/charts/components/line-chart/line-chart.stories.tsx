import { ComponentMeta, ComponentStory } from '@storybook/react';

import { feedbackCount } from '../../mock-data';
import { LineChart } from './line-chart';

const story: ComponentMeta<typeof LineChart> = {
  title: 'Charts/Line Chart',
  component: LineChart,
  args: {
    title: 'Feedback Count',
    subtitle: 'a feedback count chart',
    data: feedbackCount,
    bottom: {
      dataKey: ['date'],
      scaleType: 'time',
      label: 'Year',
    },
    left: {
      dataKey: ['value'],
      scaleType: 'linear',
      label: 'Feedback Count',
    },
  },
  argTypes: {},
};

export default story;

const Template: ComponentStory<typeof LineChart> = args => <LineChart {...args} />;

export const Default = Template.bind({});
Default.args = {};
