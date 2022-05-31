import { useState } from 'react'
import { ButtonV2 } from '../Button/V2'
import { ButtonRowRight } from '../Layout/Buttons'
import { NumberInput } from './Number'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

const StoryComponent = ({ value: defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue)
  const [isValid, setIsValid] = useState(false)
  return (
    <div>
      <NumberInput
        value={value}
        onChange={setValue}
        setIsValid={setIsValid}
        autoFocus={true}
        {...props}
      />
      <ButtonRowRight>
        <ButtonV2 disabled={!isValid}>Send</ButtonV2>
      </ButtonRowRight>
    </div>
  )
}

export default {
  title: 'InputV2/Number',
  component: StoryComponent,
  decorators: [
    Story => (
      <div style={{ maxWidth: '35em', margin: '0 auto' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
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
  info: 'You must be between 25 and 35 years old',
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
