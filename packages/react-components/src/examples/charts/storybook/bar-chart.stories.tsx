import { ComponentMeta, ComponentStory } from '@storybook/react';

// import { BarChart, BarChartProps, CartesianChartLayout } from '@wonderflow/charts';
import { BarChart, BarChartProps, CartesianChartLayout } from '../../../../../charts/src';
import {
  feedbackCount,
} from '../mock-data';

const story: ComponentMeta<typeof BarChart> = {
  title: 'Charts/Bar Chart',
  component: BarChart,
  args: {
    title: 'Bar Charts',
    subtitle: 'A quantitative bar chart',
    isStacked: false,
    sortBy: 'as-is',
    preventResponsive: false,
    isLoading: false,
    hideLegend: false,
    hidePadding: false,
    layout: CartesianChartLayout.HORIZONTAL,
    theme: 'light',
    data: feedbackCount,
    index: {
      dataKey: 'date',
      label: 'Year',
    },
    series: {
      dataKey: ['feedback count'],
      label: 'Feedback Count',
    },
    overlay: undefined,
  },
  argTypes: {
    layout: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
    sortBy: {
      options: ['dataKey', 'dataKey-reverse', 'value', 'value-reverse', 'as-is'],
      control: { type: 'select' },
    },
    theme: {
      options: ['light', 'dark'],
      control: { type: 'radio' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof BarChart> = (args: BarChartProps) => <BarChart {...args} />;

export const Default = Template.bind({});
Default.args = {};
