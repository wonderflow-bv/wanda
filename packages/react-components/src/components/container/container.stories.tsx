import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useEffect, useState } from 'react';

import { Stack } from '@/components';

import { Container } from './container';

const story: ComponentMeta<typeof Container> = {
  title: 'Layouts/Container',
  component: Container,
  argTypes: {
    padding: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    className: {
      table: {
        disable: true,
      },
    },
    dimension: {
      options: ['full', 'medium', 'large', 'auto'],
      control: { type: 'select' },
    },
  },
  args: {
    dimension: 'full',
    padding: true,
  },
};

export default story;

const Template: ComponentStory<typeof Container> = args => <Container {...args} />;

export const Medium = Template.bind({});
Medium.args = {
  dimension: 'medium',
  className: 'ContainerEx',
};

export const Large = Template.bind({});
Large.args = {
  dimension: 'large',
  className: 'ContainerEx',
};

export const Auto = Template.bind({});
Auto.args = {
  dimension: 'auto',
  className: 'ContainerEx',
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  className: 'ContainerEx',
};

export const NoPadding = Template.bind({});
NoPadding.args = {
  padding: false,
  className: 'ContainerEx',
};

export const AsSection = Template.bind({});
AsSection.args = {
  className: 'ContainerEx',
};

const TemplateTesting: ComponentStory<typeof Container> = () => {
  const [cols, setCols] = useState<number>(6);
  const [wWidth, setWWidth] = useState<number>(0);
  const [cWidth, setCWidth] = useState<number>(0);
  const [colWidth, setColWidth] = useState<number>(0);
  const [isLeftOpen, setIsLeftOpen] = useState<boolean>(false);
  const [isRightOpen, setIsRightOpen] = useState<boolean>(false);

  const handleResize = () => {
    const w = window.innerWidth;
    setWWidth(w);
    const c = document?.querySelector('[data-container-dimension="auto"]')?.offsetWidth || 0;
    setCWidth(c);
    const col = document?.querySelectorAll('.col')[0]?.offsetWidth || 0;
    setColWidth(col);
    if (w >= 1280) setCols(6);
    else if (w >= 768) setCols(4);
    else setCols(2);
  };

  useEffect(
    () => {
      handleResize();
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }, [],
  );

  useEffect(
    () => handleResize(), [isLeftOpen, isRightOpen],
  );

  return (
    <Container dimension="full" padding={false} style={{ backgroundColor: '#f9fafb' }}>
      <Stack direction="row">
        <Stack style={{
          maxWidth: isLeftOpen ? '279px' : '63px',
          backgroundColor: '#e4e7ec',
          padding: '0.5rem',
        }}
        >
          <button type="button" style={{ maxWidth: '48px', fontSize: '10px', maxHeight: '18px' }} onClick={() => setIsLeftOpen(!isLeftOpen)}>{isLeftOpen ? 'large' : 'small'}</button>
        </Stack>

        <Stack>
          <div style={{
            maxHeight: '64px', height: '64px', backgroundColor: '#9ea5b3', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0.5rem',
          }}
          >
            Window width
            {' '}
            {wWidth}
            px
            {' / '}
            Container width
            {' '}
            {cWidth}
            px
            {' / '}
            Column width
            {' '}
            {colWidth}
            px
            <button type="button" style={{ maxWidth: '48px', height: '18px', fontSize: '10px' }} onClick={() => setIsRightOpen(!isRightOpen)}>filters</button>
          </div>

          <Container dimension="auto" className="ContainerEx">
            <Stack direction="row" columnGap={24}>
              {
            Array(cols).fill('col').map((e, i) => (
              <div className="col" key={Math.random()} style={{ backgroundColor: 'grey', minHeight: 'calc(100vh - 64px)' }}>
                {e}
                {i + 1}
              </div>
            ))}

            </Stack>
          </Container>

        </Stack>

        <Stack style={{
          maxWidth: isRightOpen ? '299px' : '0px',
          backgroundColor: '#e4e7ec',
          overflow: 'hidden',
        }}
        >
          <div style={{
            maxHeight: '64px', height: '64px', backgroundColor: '#e4e7ec', padding: '0.5rem',
          }}
          >
            Filters
          </div>
        </Stack>

      </Stack>
    </Container>
  );
};

export const Testing = TemplateTesting.bind({});

