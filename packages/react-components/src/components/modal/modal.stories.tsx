import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useState } from 'react';

import {
  Button, IconButton, OverlayContainer, ResponsiveProvider,
  Stack, Title, useOverlayContext,
} from '../..';
import { Modal } from './modal';

const story: ComponentMeta<typeof Modal> = {
  title: 'Dialogs/Modal',
  component: Modal,
  argTypes: {
  },
  args: {
  },
};

export default story;

const ModalShell: ComponentStory<typeof Modal> = ({ children, ...otherProps }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ResponsiveProvider>
      <Button onClick={() => setIsVisible(true)}>Show Modal</Button>
      <OverlayContainer onClose={() => setIsVisible(false)}>
        {isVisible && (
          <Modal
            key="dynamic-modal"
            {...otherProps}
          >
            {children}
          </Modal>
        )}
      </OverlayContainer>
    </ResponsiveProvider>
  );
};

const DefaultTemplate: ComponentStory<typeof Modal> = args => (
  <ModalShell {...args}>
    <Modal.Content title="Modal title" theme="auto">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam distinctio qui
      quod ducimus libero magni earum perspiciatis.
      <img
        width="100%"
        height="400"
        alt=""
        src="https://images.unsplash.com/photo-1579332649290-10b7da0cd111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=cover&w=1600&q=80"
      />
      <button type="button">click</button>
    </Modal.Content>
  </ModalShell>
);

export const Default = DefaultTemplate.bind({});

const CustomContentModal = () => {
  const { onClose, titleId } = useOverlayContext();

  return (
    <Stack vAlign="center">
      <Stack direction="row" fill={false} vAlign="center" hAlign="space-between">
        <Title level="5" id={titleId}>{titleId}</Title>
        <IconButton onClick={() => onClose?.()} icon="xmark" kind="flat" aria-label="Close modal" />
      </Stack>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam distinctio qui quod
      ducimus libero magni earum perspiciatis.
      <img width="100%" height="auto" alt="" src="https://images.unsplash.com/photo-1579332649290-10b7da0cd111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=cover&w=1600&q=80" />
    </Stack>
  );
};

const CustomTemplate: ComponentStory<typeof Modal> = args => (
  <ModalShell {...args}>
    <CustomContentModal />
  </ModalShell>
);
export const Custom = CustomTemplate.bind({});
