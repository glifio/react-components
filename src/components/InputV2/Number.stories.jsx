import { useState } from 'react'
import { ButtonV2 } from '../ButtonV2'
import { Dialog, ButtonRowRight, ShadowBox } from '../Layout'
import { NumberInput } from './Number'

const StoryComponent = ({ value: defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue)
  const [isValid, setIsValid] = useState(false)
  return (
    <Dialog>
      <ShadowBox>
        <NumberInput
          value={value}
          onChange={setValue}
          setIsValid={setIsValid}
          autoFocus={true}
          {...props}
        />
      </ShadowBox>
      <ButtonRowRight>
        <ButtonV2 disabled={!isValid}>Send</ButtonV2>
      </ButtonRowRight>
    </Dialog>
  )
}

export default {
  title: 'InputV2/Number',
  component: StoryComponent
}

const Template = args => <StoryComponent {...args} />

export const Base = Template.bind({})
Base.args = {
  label: 'Enter your age'
}

export const PreFilled = Template.bind({})
PreFilled.args = {
  label: 'Enter your age',
  value: 35
}

export const MinValue = Template.bind({})
MinValue.args = {
  label: 'Enter your age',
  info: 'You must be 21 or older',
  min: 21
}

export const MinMaxValue = Template.bind({})
MinMaxValue.args = {
  label: 'Enter your age',
  info: 'Between 25 and 35 years old',
  min: 25,
  max: 35
}

export const Vertical = Template.bind({})
Vertical.args = {
  vertical: true,
  label: 'Enter your age'
}

export const VerticalMinValue = Template.bind({})
VerticalMinValue.args = {
  vertical: true,
  label: 'Enter your age',
  info: 'You must be 21 or older',
  min: 21
}
