import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Stack, Text } from '@/components';

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

const TemplateComparison: ComponentStory<typeof Container> = () => (
  <Stack rowGap={24}>
    <Stack rowGap={8} hAlign="center">
      <Text size={14}>Container Small</Text>
      <Container dimension="small" className="ContainerEx" />
    </Stack>
    <Stack rowGap={8} hAlign="center">
      <Text size={14}>Container Medium</Text>
      <Container dimension="medium" className="ContainerEx" />
    </Stack>
    <Stack rowGap={8} hAlign="center">
      <Text size={14}>Container Large</Text>
      <Container dimension="large" className="ContainerEx" />
    </Stack>
    <Stack rowGap={8} hAlign="center">
      <Text size={14}>Container Auto</Text>
      <Container dimension="auto" className="ContainerEx" />
    </Stack>
    <Stack rowGap={8} hAlign="center">
      <Text size={14}>Container Full</Text>
      <Container dimension="full" className="ContainerEx" />
    </Stack>
  </Stack>
);

export const Small = Template.bind({});
Small.args = {
  dimension: 'small',
  className: 'ContainerEx',
};

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

export const Full = Template.bind({});
Full.args = {
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

export const Comparison = TemplateComparison.bind({});

// TODO: remove when OK

const TemplateTesting: ComponentStory<typeof Container> = () => {
  const [cols, setCols] = useState<number>(6);
  const [wWidth, setWWidth] = useState<number>(0);
  const [cWidth, setCWidth] = useState<number>(0);
  const [gutter, setGutter] = useState<string>('16');
  const [colWidth, setColWidth] = useState<number>(0);
  const [isLeftOpen, setIsLeftOpen] = useState<boolean>(false);
  const [isRightOpen, setIsRightOpen] = useState<boolean>(false);

  const handleResize = () => {
    const w = window.innerWidth;
    setWWidth(w);
    const c = document?.querySelector('[data-container-dimension="auto"]')?.getBoundingClientRect().width ?? 0;
    setCWidth(c);
    const cl = document?.querySelector('.col1')?.getBoundingClientRect().width ?? 0;
    setColWidth(cl);

    if (c >= 960) setCols(12);
    else if (c >= 768) setCols(8);
    else setCols(4);

    if (c >= 1600) setGutter('32');
    else if (c >= 960) setGutter('24');
    else setGutter('16');
  };

  useEffect(
    () => {
      document.body.style.padding = '0px';
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
          minWidth: isLeftOpen ? '279px' : '63px',
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
            <div>
              <p style={{ fontSize: '20px' }}>
                <b>Window: </b>
                {wWidth}
                px
                {/* </p>
              <p style={{ fontSize: '11px' }}> */}
                <b>Container: </b>
                {cWidth}
                px,
                {' '}
                <b>Padding: </b>
                2 *
                {' '}
                {wWidth >= 1280 ? 32 : 24}
                px(
                {wWidth >= 1280 ? 64 : 48}
                px)
                {/* </p>
              <p style={{ fontSize: '11px' }}> */}

                <b>Columns: </b>
                {cols}
                {' '}
                *
                {' '}
                {colWidth}
                px(
                {Math.round(cols * colWidth)}
                px),
                {' '}
                <b>Gutter: </b>
                {cols - 1}
                {' '}
                *
                {gutter}
                px(
                {(cols - 1) * Number(gutter)}
                px)
              </p>
            </div>
            <button type="button" style={{ maxWidth: '48px', height: '18px', fontSize: '10px' }} onClick={() => setIsRightOpen(!isRightOpen)}>filters</button>
          </div>

          <Container dimension="auto" className="ContainerEx">
            <Stack direction="row" columnGap={gutter as any}>
              {
            Array(cols).fill('col').map((e, i) => (
              <div className={`col${i}`} key={Math.random()} style={{ backgroundColor: 'grey', opacity: '.75', minHeight: 'calc(100vh - 64px)' }}>
                {e}
              </div>
            ))}

            </Stack>
          </Container>

        </Stack>

        <Stack style={{
          maxWidth: isRightOpen ? '299px' : '0px',
          minWidth: isRightOpen ? '299px' : '0px',
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

