/* eslint-disable no-alert */
/* eslint-disable max-len */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import {
  Button, ResponsiveProvider, Text,
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
  },
  args: {
    title: 'Modal Title',
    subtitle: 'Subtitle',
    overlayColor: 'dark',
    hideCloseButton: false,
    hideHeaderBorder: false,
    hideFooterBorder: false,
    theme: 'auto',
    closeOnClickOutside: true,
    content: longText,
    primaryAction: <Button onClick={() => alert('Primary Action')}>Action 1</Button>,
    secondaryAction: <Button onClick={() => alert('Secondary Action')}>Action 2</Button>,
    // tertiaryAction: <Button kind="flat" disabled onClick={() => alert('Tertiary')}>Action 3</Button>,
  },
};

export default story;

//   return (
//     <ResponsiveProvider>
//       <Button onClick={() => setIsVisible(true)}>Show Modal</Button>

//       <Modal
//         overlayColor="light"
//         isVisible={isVisible}
//         onCloseModal={() => setIsVisible(false)}
//       >
//         {children}
//       </Modal>

//     </ResponsiveProvider>
//   );
// };

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

const CustomTemplate: ComponentStory<typeof Modal> = (args) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <ResponsiveProvider>
      <Button onClick={() => setIsVisible(true)}>Show Modal</Button>

      <Modal
      // @ts-expect-error : override props
        isVisible={isVisible}
        // @ts-expect-error : override props
        onCloseModal={() => setIsVisible(false)}
        {...args}
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

