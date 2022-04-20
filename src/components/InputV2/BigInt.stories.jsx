import { useState } from 'react'
import { ButtonV2 } from '../Button/V2'
import { ButtonRowRight } from '../Layout/Buttons'
import { BigIntInput } from './BigInt'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

const StoryComponent = ({ min, max, value: val, ...props }) => {
  const hasMin = !!min || typeof min === 'number'
  const hasMax = !!max || typeof max === 'number'
  const defaultValue = !!val || typeof val === 'number' ? BigInt(val) : null
  const [value, setValue] = useState(defaultValue)
  const [isValid, setIsValid] = useState(false)
  return (
    <div>
      <BigIntInput
        min={hasMin ? BigInt(min) : null}
        max={hasMax ? BigInt(max) : null}
        value={value}
        onChange={setValue}
        setIsValid={setIsValid}
        autofocus={true}
        {...props}
      />
      <ButtonRowRight>
        <ButtonV2 disabled={!isValid}>Send</ButtonV2>
      </ButtonRowRight>
    </div>
  )
}

export default {
  title: 'InputV2/BigInt',
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
  label: 'Enter a big number'
}

export const PreFilled = Template.bind({})
PreFilled.args = {
  label: 'Adjust a big number',
  value: '10007199254740991'
}

export const MinMax = Template.bind({})
MinMax.args = {
  label: 'Enter your age',
  info: 'You must be between 9007199254740991 and 10007199254740991 years old',
  min: '9007199254740991',
  max: '10007199254740991'
}
