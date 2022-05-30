import { useState } from 'react'
import { PasswordInput } from './Text'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

const StoryComponent = ({ value: defaultValue, ...props }) => {
  const [value, setValue] = useState(defaultValue)
  return (
    <PasswordInput value={value} onChange={setValue} autofocus {...props} />
  )
}

export default {
  title: 'InputV2/Password',
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
  label: 'Enter your password'
}

export const Required = Template.bind({})
Required.args = {
  label: 'Enter your password',
  required: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'You cannot enter your password',
  disabled: true,
  value: 'Too bad'
}
