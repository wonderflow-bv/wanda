import { ComponentMeta, ComponentStory } from '@storybook/react';

import { feedbackCount } from '../../mock-data';
import { LineChart } from './line-chart';

const story: ComponentMeta<typeof LineChart> = {
  title: 'Charts/Line Chart',
  component: LineChart,
  args: {
    data: feedbackCount,
    bottom: {
      dataKey: ['date'],
      scaleType: 'label',
    },
    left: {
      dataKey: ['value', 'overlay'],
      scaleType: 'linear',
    },
  },
  argTypes: {},
};

export default story;

const Template: ComponentStory<typeof LineChart> = args => <LineChart {...args} />;

export const Default = Template.bind({});
Default.args = {};
