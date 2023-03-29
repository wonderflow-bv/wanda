/* eslint-disable no-alert */

/* eslint-disable max-len */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';
import { AutoFocusInside } from 'react-focus-on';

import {
  Button, Card, Checkbox, Disclosure,
  Elevator, InfoState, Popover, ResponsiveProvider, Select, Stack, Tab, Text, Textfield, Title,
} from '../..';
import { Modal } from './modal';

const longText = (
  <Text size={16}>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore cumque voluptate in ut iste reiciendis ipsa nihil accusantium illum ea ullam quasi voluptatibus, reprehenderit maxime placeat laborum, quam debitis, perferendis nemo cum cupiditate dolorem esse. Distinctio excepturi pariatur doloribus, nostrum nesciunt provident. Placeat debitis a odit nesciunt perspiciatis? Nihil aliquam obcaecati ab, quas magni aut suscipit et similique alias nulla repudiandae beatae, aliquid, saepe porro libero officiis ullam cumque quidem eius odio voluptatibus. Reiciendis, vel asperiores? Facilis, provident inventore iure ea a odit suscipit! Aspernatur quae odio neque labore? Quidem esse earum hic excepturi amet sequi porro aperiam eos iste mollitia aut a omnis praesentium sit, asperiores consequatur harum itaque in quam. Quisquam dolores sint eaque dicta quia velit repellat suscipit provident facere repellendus molestias accusantium obcaecati ratione distinctio qui nesciunt totam quas, a ipsum. Possimus exercitationem, velit quibusdam dicta, et quidem dolorum provident voluptatibus facilis quasi nisi incidunt magni quis officia obcaecati laborum perferendis aliquid consequatur itaque corrupti similique ex reprehenderit expedita suscipit. Ipsum quidem possimus doloribus ut, id debitis, officiis, totam assumenda dolore recusandae impedit in tempore neque unde? Repellat necessitatibus in tempora ipsam officiis quam cumque alias. Sed saepe iure ullam, pariatur quo incidunt vero sapiente exercitationem numquam obcaecati suscipit mollitia aspernatur iste esse quia facere magni praesentium! Alias corrupti vitae odit animi magnam ut ad, voluptates hic consequatur dolorum aliquam suscipit quidem assumenda omnis velit, modi commodi exercitationem rerum! Inventore officia, nobis sunt enim quisquam explicabo molestias suscipit esse eaque cumque fugit autem perspiciatis temporibus nisi non. Quae aut nam aliquam accusamus officiis impedit suscipit deleniti ipsa saepe, est facere iusto quam molestias in voluptate error qui porro, veritatis labore iste commodi deserunt ipsum sed? Corrupti unde animi esse deleniti eligendi distinctio, recusandae ratione earum libero sunt nisi impedit repellat aspernatur, quisquam eius iste reiciendis maxime.
  </Text>
);

const story: ComponentMeta<typeof Modal> = {
  title: 'Dialogs/Modal',
  component: Modal,
  argTypes: {
    theme: {
      options: ['light', 'dark', 'auto'],
      control: { type: 'select' },
    },
    overlayColor: {
      options: ['light', 'dark', 'auto'],
      control: { type: 'select' },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
  },
  args: {
    title: 'Modal Title',
    subtitle: 'Subtitle',
    overlayColor: 'dark',
    hideCloseButton: false,
    hideHeaderBorder: false,
    hideFooterBorder: false,
    alignActionCenter: false,
    alignContentCenter: false,
    size: 'medium',
    theme: 'auto',
    isLoading: false,
    preventCloseOnClickOutside: false,
    content: longText,
    primaryAction: <Button onClick={() => alert('Primary Action')}>Action 1</Button>,
    secondaryAction: <Button onClick={() => alert('Secondary Action')}>Action 2</Button>,
    tertiaryAction: undefined,
  },
};

export default story;

const DefaultTemplate: ComponentStory<typeof Modal> = (args) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ResponsiveProvider>
      <Button onClick={() => setIsVisible(true)}>Show Modal</Button>

      <Modal
        {...args}
        isVisible={isVisible}
        onCloseModal={() => setIsVisible(false)}
      />
    </ResponsiveProvider>
  );
};

export const Default = DefaultTemplate.bind({});

export const Inverse = DefaultTemplate.bind({});
Inverse.args = {
  theme: 'dark',
  overlayColor: 'light',
};

export const LoadingContent = DefaultTemplate.bind({});
LoadingContent.args = {
  isLoading: true,
  primaryAction: <Button onClick={() => alert('Primary Action')} disabled>Action 1</Button>,
  secondaryAction: <Button onClick={() => alert('Secondary Action')} disabled>Action 2</Button>,
};

export const Confirmation = DefaultTemplate.bind({});
Confirmation.args = {
  title: 'Delete account?',
  subtitle: undefined,
  hideHeaderBorder: true,
  content: <Text size={16}>Are you sure you want to delete your account? This action cannot be undone.</Text>,
  hideFooterBorder: true,
  primaryAction: <Button>Delete</Button>,
  secondaryAction: <Button>Cancel</Button>,
};

export const WithSimpleForm = DefaultTemplate.bind({});
WithSimpleForm.args = {
  title: 'Enter your details',
  subtitle: undefined,
  content: (
    <Stack rowGap={16}>
      <Textfield label="First name" />
      <Textfield label="Last name" />
    </Stack>
  ),
  hideFooterBorder: true,
  primaryAction: <Button>Submit</Button>,
  secondaryAction: <Button>Cancel</Button>,
};

export const WithComplexForm = DefaultTemplate.bind({});
WithComplexForm.args = {
  title: 'Tell us more about yourself',
  subtitle: 'You may add a description here',
  content: (
    <Stack rowGap={16}>
      <Textfield label="Enter your full name" messag="Sample hint text" />
      <Select placeholder="Select" label="How would you describe the interface?">
        <optgroup label="Option Group">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </optgroup>
        <optgroup label="Option Group 2">
          <option>Option 4</option>
          <option>Option 5</option>
          <option>Option 6</option>
        </optgroup>
      </Select>
      <Textfield
        textarea
        label="Is there anything you'd like to add?"
        value="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, earum."
      />
    </Stack>
  ),
  primaryAction: <Button>Submit</Button>,
  secondaryAction: <Button>Cancel</Button>,
};

export const WithThirdAction = DefaultTemplate.bind({});
WithThirdAction.args = {
  title: 'Enter your details',
  subtitle: undefined,
  content: (
    <Stack rowGap={16}>
      <Textfield label="First name" />
      <Textfield label="Last name" />
    </Stack>
  ),
  hideFooterBorder: true,
  primaryAction: <Button>Submit</Button>,
  secondaryAction: <Button>Cancel</Button>,
  tertiaryAction: <Checkbox label="Remember me" defaultChecked dimension="small" />,
};

export const WithAList = DefaultTemplate.bind({});
WithAList.args = {
  title: 'Modal with a list',
  subtitle: undefined,
  content: (
    <Stack rowGap={16}>
      <Text size={16}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, earum.</Text>
      <ul>
        <li><Text size={16}>List item content</Text></li>
        <li><Text size={16}>List item content</Text></li>
        <li><Text size={16}>List item content</Text></li>
      </ul>
    </Stack>
  ),
  primaryAction: <Button>Primary</Button>,
  secondaryAction: <Button>Secondary</Button>,
};

const withImageContent = (
  <Stack hAlign="center" vAlign="center" vPadding={16}>
    <img
      src="https://wonderimages.gumlet.io/placeholders/illustration.png?format=webp&q=100"
      alt="modal illustartion"
      width="400px"
      height="auto"
    />
    <Title level="5">Title goes here</Title>
    <Text size={14}>Subtitle goes here</Text>
  </Stack>
);

export const WithImage = DefaultTemplate.bind({});
WithImage.args = {
  title: undefined,
  subtitle: undefined,
  content: withImageContent,
  hideFooterBorder: true,
  alignContentCenter: true,
  alignActionCenter: true,
  primaryAction: <Button>Primary</Button>,
  secondaryAction: <Button>Secondary</Button>,
};

const formWithin = (
  <Stack rowGap={24} style={{ marginTop: '24px' }}>
    <Stack direction="row" columnGap={24}>
      <Textfield label="Label" placeHolder="Sample value" />
      <Textfield label="Label" placeHolder="Sample value" />
    </Stack>
    <Textfield label="Label" placeHolder="Sample value" />
  </Stack>
);

const withTabsContent = (
  <Tab defaultValue="1" dimension="regular">
    <Tab.Panel value="1" label="Tab 1">
      {formWithin}
    </Tab.Panel>
    <Tab.Panel value="2" label="Tab 2">
      {formWithin}
    </Tab.Panel>
    <Tab.Panel value="3" label="Tab 3">
      {formWithin}
    </Tab.Panel>
  </Tab>
);

export const WithTabs = DefaultTemplate.bind({});
WithTabs.args = {
  title: 'Modal title',
  subtitle: 'Subtitle',
  content: withTabsContent,
  primaryAction: <Button>Confirm</Button>,
  secondaryAction: <Button>Cancel</Button>,
};

const complexNesting = (
  <Stack vPadding={8}>
    <Popover
      placement="bottom-start"
      trigger={(
        <Textfield
          type="text"
          label="Topic"
          placeholder="Select a Topic"
        />
      )}
    >
      <Elevator resting={1}>
        <Card>
          <AutoFocusInside>
            <Tab defaultValue="1" dimension="regular">
              <Tab.Panel value="1" label="Tab 1">
                <Card>
                  <Stack>
                    <Disclosure summary="Disclosure 1">
                      Content Tab 1
                    </Disclosure>
                  </Stack>
                </Card>
              </Tab.Panel>
              <Tab.Panel value="2" label="Tab 2">
                <Card>
                  <Stack>
                    <Disclosure summary="Disclosure 2">
                      Content Tab 2
                    </Disclosure>
                  </Stack>
                </Card>
              </Tab.Panel>
              <Tab.Panel value="3" label="Tab 3">
                <Card>
                  <Stack>
                    <Disclosure summary="Disclosure 3">
                      Content Tab 3
                    </Disclosure>
                  </Stack>
                </Card>
              </Tab.Panel>
            </Tab>
          </AutoFocusInside>
        </Card>
      </Elevator>
    </Popover>
  </Stack>
);

export const withNestedElements = DefaultTemplate.bind({});
withNestedElements.args = {
  title: 'With Nested Elements',
  subtitle: undefined,
  content: complexNesting,
  primaryAction: <Button>Confirm</Button>,
  secondaryAction: <Button>Cancel</Button>,
};

export const withDisclosure = DefaultTemplate.bind({});
withDisclosure.args = {
  title: 'With Disclosed Content',
  content: (
    <Stack rowGap={16}>
      <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea facilis similique ab?</Text>
      <Disclosure dimension="small" summary="Lorem 12" iconPosition="right">
        <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam sequi laudantium quibusdam?</Text>
      </Disclosure>
      <Disclosure dimension="small" summary="Lorem 16" iconPosition="right">
        <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod incidunt temporibus tempora laborum quisquam, fugiat voluptas?</Text>
      </Disclosure>
      <Disclosure dimension="small" summary="Lorem 24" iconPosition="right">
        <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque repellat dicta molestias facere, vero possimus reiciendis odio delectus tenetur voluptatum quis. Quam, eaque quo?</Text>
      </Disclosure>
    </Stack>),
  alignActionCenter: true,
  primaryAction: <Button>OK</Button>,
  secondaryAction: undefined,
};

export const withHeroIcon = DefaultTemplate.bind({});
withHeroIcon.args = {
  title: undefined,
  subtitle: undefined,
  content: (
    <InfoState title="Delete user?" direction="column" icon="trash-can" iconColor="red">
      <Stack hAlign="center">
        <Text size={16}>Are you sure you want to delete this user?</Text>
        <Text size={16}>This action cannot be undone.</Text>
      </Stack>
    </InfoState>),
  hideFooterBorder: true,
  primaryAction: <Button>Delete</Button>,
  secondaryAction: <Button>Cancel</Button>,
  alignContentCenter: true,
};

const CustomTemplate: ComponentStory<typeof Modal> = (args) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ResponsiveProvider>
      <Button onClick={() => setIsVisible(true)}>Show Modal</Button>

      <Modal
        {...args}
        isVisible={isVisible}
        onCloseModal={() => setIsVisible(false)}
      >
        <Modal.Header>
          <p>custom header content here</p>
          <p>custom header content here</p>
          <p>custom header content here</p>
        </Modal.Header>
        <Modal.Content>
          {longText}
        </Modal.Content>
        <Modal.Footer>
          <p>custom footer content here</p>
          <p>custom footer content here</p>
          <p>custom footer content here</p>
        </Modal.Footer>
      </Modal>
    </ResponsiveProvider>
  );
};

export const Custom = CustomTemplate.bind({});
