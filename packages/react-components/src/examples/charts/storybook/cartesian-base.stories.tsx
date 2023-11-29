import { ComponentMeta, ComponentStory } from '@storybook/react';

// import { CartesianBase } from '@wonderflow/charts';
import { CartesianBase } from '../../../../../charts/src';

const story: ComponentMeta<typeof CartesianBase> = {
  title: 'Charts/Cartesian Base',
  component: CartesianBase,
  args: {
    title: 'Chart Title',
    subtitle: 'Subtitle text',
    isLoading: false,
    preventResponsive: false,
    grid: {
      tickColumns: 10,
      tickRows: 10,
    },
    axis: {
      top: {
        domain: [
          'ALabelThatExceedTwentyCharacters',
          'BLabelThatExceedTwentyCharacters',
          'CLabelThatExceedTwentyCharacters',
          'DLabelThatExceedTwentyCharacters',
          'ELabelThatExceedTwentyCharacters',
          'FLabelThatExceedTwentyCharacters',
        ],
        orientation: 'top',
        scaleType: 'label',
        label: 'Top Label',
        paddingOuter: 0,
        paddingInner: 1,
        tickFormat: (v: any, i: number) => (`Prefix${i} + ${v} + Suffix`),
        hideAxisLine: false,
        hideTickLabel: false,
        hideTicks: false,
      },
      right: {
        domain: [0, 0.010],
        orientation: 'right',
        scaleType: 'linear',
        label: 'Right Label',
        tickFormat: (v: any) => `${JSON.stringify(v)} $`,
        hideAxisLine: false,
        hideTickLabel: false,
        hideTicks: false,
      },
      bottom: {
        domain: [new Date('2020-01-01').getTime(), new Date('2022-01-01').getTime()],
        orientation: 'bottom',
        label: 'Bottom Label',
        scaleType: 'time',
        hideAxisLine: false,
        hideTickLabel: false,
        hideTicks: false,
      },
      left: {
        domain: [0, 10000],
        orientation: 'left',
        scaleType: 'linear',
        label: 'Left Label',
        hideAxisLine: false,
        hideTickLabel: false,
        hideTicks: false,
      },
    },
    styleConfig: {},
    children: undefined,
  },
  argTypes: {

  },
};

export default story;

const Template: ComponentStory<typeof CartesianBase> = args => <CartesianBase {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const TwoAxis = Template.bind({});
TwoAxis.args = {
  grid: {
    hideColumns: true,
    tickColumns: 10,
    tickRows: 5,
    otherProps: {
      strokeDasharray: '3 2',
    },
  },
  axis: {
    top: undefined,
    right: undefined,
    bottom: {
      domain: [new Date('2020-01-01').getTime(), new Date('2020-01-10').getTime()],
      orientation: 'bottom',
      label: 'Time',
      scaleType: 'time',
      numTicks: 10,
    },
    left: {
      domain: [0, 1000],
      orientation: 'left',
      scaleType: 'linear',
      label: 'Quantity',
      hideAxisLine: true,
      hideTicks: true,
      hideZero: true,
      numTicks: 10,
    },
  },
};

export const WithLegend = Template.bind({});
WithLegend.args = { customLegend: <ul><li style={{ fontSize: '12px' }}>some legend content here</li></ul> };

