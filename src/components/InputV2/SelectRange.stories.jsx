import { useState } from 'react'
import { SelectRange } from './SelectRange'
import { Dialog, ShadowBox } from '../Layout'

const StoryComponent = ({ value: defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue)
  return (
    <Dialog>
      <ShadowBox>
        <SelectRange
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
  title: 'InputV2/SelectRange',
  component: StoryComponent
}

const Template = args => <StoryComponent {...args} />
const label = 'Pick your favourite number'
const info = 'From our limited range'

export const Base = Template.bind({})
Base.args = { label, min: 1, max: 10 }

export const WithInfo = Template.bind({})
WithInfo.args = { label, info, min: 1, max: 10 }

export const PreSelected = Template.bind({})
PreSelected.args = { label, info, min: 1, max: 10, value: 7 }

export const BigStep = Template.bind({})
BigStep.args = { label, info, min: 0, max: 500, step: 25 }

export const Reverse = Template.bind({})
Reverse.args = { label, info, min: 500, max: 0, step: -25 }

export const Placeholder = Template.bind({})
Placeholder.args = { label, min: 1, max: 10, placeholder: 'Make your pick' }
