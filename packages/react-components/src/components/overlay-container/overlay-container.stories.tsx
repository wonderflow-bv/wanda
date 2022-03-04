import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useState } from 'react'
import { OverlayContainer } from './overlay-container'
import { Button, Stack } from '../..'

export default {
  title: 'Layouts/Overlay container',
  component: OverlayContainer,
  args: {
    obfuscate: true
  }
} as ComponentMeta<typeof OverlayContainer>

const Template: ComponentStory<typeof OverlayContainer> = ({ children, ...otherProps }) => {
  const [visible, setVisible] = useState(false)
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
  )
}

export const Default = Template.bind({})
