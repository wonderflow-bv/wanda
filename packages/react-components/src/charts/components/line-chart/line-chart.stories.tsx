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
    index: {
      dataKey: 'date',
      label: 'Year',
    },
    series: {
      dataKey: ['value'],
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
  overlay: {
    dataKey: 'overlay',
    label: 'Overlay',
  },
};

export const withCustomDomain = Template.bind({});
withCustomDomain.args = {
  series: {
    dataKey: ['value'],
    label: 'Feedback Count',
    domain: [-12000, 12000],
  },
  index: {
    dataKey: 'date',
    label: 'Year',
    domain: ['1999-01-01', '2024-01-01'],
  },
};

export const vertical = Template.bind({});
vertical.args = {
  layout: CartesianChartLayout.VERTICAL,
  overlay: {
    dataKey: 'overlay',
    label: 'Overlay',
  },
  index: {
    dataKey: 'date',
    label: 'Year',
  },
  series: {
    dataKey: ['value'],
    label: 'Feedback Count',
  },
};

