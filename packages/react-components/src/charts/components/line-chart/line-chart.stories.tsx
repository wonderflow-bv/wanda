import { ComponentMeta, ComponentStory } from '@storybook/react';

import { feedbackCount } from '../../mock-data';
import { CartesianChartLayout } from '../../types';
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

export const withOverlay = Template.bind({});
withOverlay.args = {
  right: {
    dataKey: ['overlay'],
    scaleType: 'linear',
    label: 'Overlay',
  },
};

export const withCustomDomain = Template.bind({});
withCustomDomain.args = {
  left: {
    dataKey: ['value'],
    scaleType: 'linear',
    label: 'Feedback Count',
    domain: [-12000, 12000],
  },
};

export const vertical = Template.bind({});
vertical.args = {
  layout: CartesianChartLayout.VERTICAL,
  top: {
    dataKey: ['overlay'],
    scaleType: 'linear',
    label: 'Overlay',
  },
  left: {
    dataKey: ['date'],
    scaleType: 'time',
    label: 'Year',
  },
  bottom: {
    dataKey: ['value'],
    scaleType: 'linear',
    label: 'Feedback Count',
  },
};

