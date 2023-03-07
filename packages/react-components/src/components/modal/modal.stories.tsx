/* eslint-disable max-len */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import {
  Button, OverlayContainer, ResponsiveProvider,
  // Stack, Title, useOverlayContext, IconButton,
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

// const DefaultTemplate: ComponentStory<typeof Modal> = args => (
//   <ModalShell {...args}>
//     <Modal.Content title="Modal title" theme="auto">
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam distinctio qui
//       quod ducimus libero magni earum perspiciatis.
//       <img
//         width="100%"
//         height="400"
//         alt=""
//         src="https://images.unsplash.com/photo-1579332649290-10b7da0cd111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=cover&w=1600&q=80"
//       />
//       <button type="button">click</button>
//     </Modal.Content>
//   </ModalShell>
// );

// export const Default = DefaultTemplate.bind({});

// const CustomContentModal = () => {
//   const { onClose, titleId } = useOverlayContext();

//   return (
//     <Stack vAlign="center">
//       <Stack direction="row" fill={false} vAlign="center" hAlign="space-between">
//         <Title level="5" id={titleId}>{titleId}</Title>
//         <IconButton onClick={() => onClose?.()} icon="xmark" kind="flat" aria-label="Close modal" />
//       </Stack>
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus et magnam distinctio qui quod
//       ducimus libero magni earum perspiciatis.
//       <img width="50%" height="auto" alt="" src="https://images.unsplash.com/photo-1579332649290-10b7da0cd111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=cover&w=1600&q=80" />
//     </Stack>
//   );
// };

// const CustomTemplate: ComponentStory<typeof Modal> = args => (
//   <ModalShell {...args}>
//     <CustomContentModal />
//   </ModalShell>
// );
// export const Custom = CustomTemplate.bind({});

const DevModal = () => (
  <Modal.Content>
    <Modal.Header>
      <p>custom header content here</p>
      <p>custom header content here</p>
      <p>custom header content here</p>
    </Modal.Header>
    <Modal.Body>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore cumque voluptate in ut iste reiciendis ipsa nihil accusantium illum ea ullam quasi voluptatibus, reprehenderit maxime placeat laborum, quam debitis, perferendis nemo cum cupiditate dolorem esse. Distinctio excepturi pariatur doloribus, nostrum nesciunt provident. Placeat debitis a odit nesciunt perspiciatis? Nihil aliquam obcaecati ab, quas magni aut suscipit et similique alias nulla repudiandae beatae, aliquid, saepe porro libero officiis ullam cumque quidem eius odio voluptatibus. Reiciendis, vel asperiores? Facilis, provident inventore iure ea a odit suscipit! Aspernatur quae odio neque labore? Quidem esse earum hic excepturi amet sequi porro aperiam eos iste mollitia aut a omnis praesentium sit, asperiores consequatur harum itaque in quam. Quisquam dolores sint eaque dicta quia velit repellat suscipit provident facere repellendus molestias accusantium obcaecati ratione distinctio qui nesciunt totam quas, a ipsum. Possimus exercitationem, velit quibusdam dicta, et quidem dolorum provident voluptatibus facilis quasi nisi incidunt magni quis officia obcaecati laborum perferendis aliquid consequatur itaque corrupti similique ex reprehenderit expedita suscipit. Ipsum quidem possimus doloribus ut, id debitis, officiis, totam assumenda dolore recusandae impedit in tempore neque unde? Repellat necessitatibus in tempora ipsam officiis quam cumque alias. Sed saepe iure ullam, pariatur quo incidunt vero sapiente exercitationem numquam obcaecati suscipit mollitia aspernatur iste esse quia facere magni praesentium! Alias corrupti vitae odit animi magnam ut ad, voluptates hic consequatur dolorum aliquam suscipit quidem assumenda omnis velit, modi commodi exercitationem rerum! Inventore officia, nobis sunt enim quisquam explicabo molestias suscipit esse eaque cumque fugit autem perspiciatis temporibus nisi non. Quae aut nam aliquam accusamus officiis impedit suscipit deleniti ipsa saepe, est facere iusto quam molestias in voluptate error qui porro, veritatis labore iste commodi deserunt ipsum sed? Corrupti unde animi esse deleniti eligendi distinctio, recusandae ratione earum libero sunt nisi impedit repellat aspernatur, quisquam eius iste reiciendis maxime.
      </p>
    </Modal.Body>
    <Modal.Footer>
      <p>custom footer content here</p>
      <p>custom footer content here</p>
      <p>custom footer content here</p>
    </Modal.Footer>
  </Modal.Content>
);

const DevTemplate: ComponentStory<typeof Modal> = args => (
  <ModalShell {...args}>
    <DevModal />
  </ModalShell>
);
export const DevCustom = DevTemplate.bind({});
