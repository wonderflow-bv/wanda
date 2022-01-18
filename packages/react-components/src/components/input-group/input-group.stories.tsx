import React from 'react'
import { Stack } from '../stack'
import { Button } from '../button'
import { Select } from '../select'
import { Textfield } from '../textfield'
import { InputGroup } from './input-group'

export default {
  title: 'Components/Inputs/Input group',
  component: InputGroup
}

const Default = (args) => (
  <Stack inline fill={false} horizontalAlign="start" rowGap={32}>
    <InputGroup
      input={<Textfield type="text" defaultValue="cicc" />}
      end={<Button>Confirm</Button>}
      {...args}
    />
    <InputGroup
      input={<Textfield type="text" defaultValue="sample" />}
      end={<Textfield disabled size={9} placeholder="@mail.com" />}
      {...args}
    />
    <InputGroup
      dimension="big"
      label="Sample label"
      start={<Textfield readOnly size={6} defaultValue="https://" />}
      input={<Textfield type="text" defaultValue="sample-domain" />}
      end={(
        <Select defaultValue={1}>
          <option value="1">.com</option>
          <option value="2">.it</option>
          <option value="3">.org</option>
          <option value="4">.dev</option>
          <option value="5">.io</option>
        </Select>
)}
      {...args}
    />
  </Stack>
)

export const Single = Default.bind({})
