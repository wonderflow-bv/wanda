import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Masonry } from './masonry';

const story: ComponentMeta<typeof Masonry> = {
  title: 'Layouts/Masonry',
  component: Masonry,
  args: {
    gutter: 24,
  },
  argTypes: {

  },
};

export default story;

const Template: ComponentStory<typeof Masonry> = args => (
  <Masonry {...args}>
    <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde blanditiis placeat facilis</div>
    <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde bland</div>
    <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda delectus optio maiores perspiciatis sed fugit aperiam?</div>
    <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde blanditiis placeat facilis mollitia officiis temporibus dignissimos </div>
    <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae vo</div>
    <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda delectus optio </div>
    <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde blanditiis placeat facilis mollitia officiis </div>
    <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda delectus optio maiores perspiciatis sed fugit aperiam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda delectus optio maiores perspiciatis sed fugit aperiam?</div>
    <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda delectus optio maiores perspiciatis</div>
    <div style={{ background: 'var(--dimmed-2)', padding: 24 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda delectus optio maiores perspiciatis sed fugit aperiam?Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda delectus optio maiores perspiciatis sed fugit aperiam?Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati aut deleniti, odit beatae voluptates unde blanditiis placeat facilis mollitia officiis temporibus dignissimos assumenda delectus optio maiores perspiciatis sed fugit aperiam?</div>
  </Masonry>
);

export const Default = Template.bind({});
export const WithBreakPoints = Template.bind({});
WithBreakPoints.args = {
  columns: {
    default: 6,
    'extra-large': 5,
    large: 4,
    medium: 3,
    small: 2,
    'extra-small': 1,
  },
};
