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
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setIsVisible(true)}>Open Overlay</Button>
      <OverlayContainer {...otherProps}>
        {isVisible && (
          <Stack
            fill={false}
            hAlign="center"
            vAlign="center"
          >
            I am over the top
            <Button
              kind="secondary"
              onClick={() => setIsVisible(false)}
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
