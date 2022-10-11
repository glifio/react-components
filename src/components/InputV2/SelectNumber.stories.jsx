import { useState } from 'react'
import { SelectNumber } from './SelectNumber'
import { Dialog, ShadowBox } from '../Layout'

const StoryComponent = ({ value: defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue)
  return (
    <Dialog>
      <ShadowBox>
        <SelectNumber
          value={value}
          onChange={setValue}
          autoFocus={true}
          {...props}
        />
      </ShadowBox>
    </Dialog>
  )
}

export default {
  title: 'InputV2/SelectNumber',
  component: StoryComponent
}

const Template = args => <StoryComponent {...args} />
const label = 'Pick your favourite number'
const info = 'From our limited selection'
const options = [1, 7, 1337, 1999, 123456]

export const Base = Template.bind({})
Base.args = { label, options }

export const WithInfo = Template.bind({})
WithInfo.args = { label, info, options }

export const PreSelected = Template.bind({})
PreSelected.args = { label, info, options, value: 1999 }

export const Disabled = Template.bind({})
Disabled.args = { label, info, options, disabled: true }

export const Placeholder = Template.bind({})
Placeholder.args = { label, options, placeholder: 'Make your pick' }

export const Vertical = Template.bind({})
Vertical.args = { label, options, vertical: true }

export const VerticalCentered = Template.bind({})
VerticalCentered.args = { label, options, vertical: true, centered: true }

export const VerticalWithInfo = Template.bind({})
VerticalWithInfo.args = { label, info, options, vertical: true }
