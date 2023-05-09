import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Button, Symbol, Text } from '../..';
import { Tooltip } from './tooltip';

const story: ComponentMeta<typeof Tooltip> = {
  title: 'Dialogs/Tooltip',
  component: Tooltip,
  args: {
    interactive: true,
    placement: 'auto',
    delay: 500,
    maxWidth: '40ch',
    fill: false,
    trigger: <Text as="span" style={{ margin: '1rem' }}>HTML</Text>,
  },
  argTypes: {
    placement: {
      options: ['auto', 'auto-start', 'auto-end', 'top', 'bottom', 'right', 'left', 'top-start', 'top-end', 'bottom-start', 'bottom-end', 'right-start', 'right-end', 'left-start', 'left-end'],
      control: { type: 'select' },
    },
  },
};

export default story;

const Template: ComponentStory<typeof Tooltip> = args => (
  <>
    <Tooltip {...args}>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, ullam.
        Totam veniam dignissimos ducimus illo ipsa tempora corrupti enim quidem, ad odit molestias deleniti in.
      </p>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        gap: '0.5rem',
        marginTop: '0.5rem',
      }}
      >
        <button type="button" onClick={() => console.debug('Reset!')}>Reset</button>
        <button type="button" onClick={() => console.debug('Confirm!')}>Confirm</button>
      </div>
    </Tooltip>
  </>
);

const Template2: ComponentStory<typeof Tooltip> = args => (
  <>
    <Tooltip {...args}>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, ullam.
        Totam veniam dignissimos ducimus illo ipsa tempora corrupti enim quidem, ad odit molestias deleniti in.
      </p>
    </Tooltip>
  </>
);

export const Interactive = Template.bind({});
Interactive.args = {
  interactive: true,
};

export const NonInteractive = Template2.bind({});
NonInteractive.args = {
  trigger: <Symbol source="bell" aria-hidden="false" style={{ marginLeft: '1rem' }} />,
  interactive: false,
};

export const Open = Template.bind({});
Open.args = {
  interactive: true,
  open: true,
};

export const WithButton = Template2.bind({});
WithButton.args = {
  trigger: <Button>Click Me</Button>,
  placement: 'top-end',
  interactive: true,
};

