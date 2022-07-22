import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import { Button, Stack } from '../..';
import { OverlayContainer } from './overlay-container';

const story: ComponentMeta<typeof OverlayContainer> = {
  title: 'Layouts/Overlay container',
  component: OverlayContainer,
  args: {
    obfuscate: true,
  },
};

export default story;

const Template: ComponentStory<typeof OverlayContainer> = ({ children, ...otherProps }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>Open Overlay</Button>
      <OverlayContainer {...otherProps}>
        {visible && (
        <Stack
          fill={false}
          hAlign="center"
          vAlign="center"
        >
          I am over the top
          <Button
            kind="secondary"
            onClick={() => setVisible(false)}
          >
            Close me
          </Button>
        </Stack>
        )}
      </OverlayContainer>
    </>
  );
};

export const Default = Template.bind({});
