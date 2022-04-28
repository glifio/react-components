import { useState } from 'react'
import { ButtonV2 } from '../Button/V2'
import { ButtonRowRight } from '../Layout/Buttons'
import { ParamsInput } from './Params'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

const StoryComponent = ({ value: defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue)
  const [isValid, setIsValid] = useState(false)
  return (
    <div>
      <ParamsInput
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
  title: 'InputV2/Params',
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
  label: 'Enter some parameters'
}

export const Required = Template.bind({})
Required.args = {
  label: 'These parameters are required',
  required: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'These parameters cannot be changed',
  disabled: true,
  value: 'test'
}
