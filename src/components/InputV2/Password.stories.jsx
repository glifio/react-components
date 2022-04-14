import { PasswordInput } from './Text'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

export default {
  title: 'InputV2/Password',
  component: PasswordInput,
  decorators: [
    Story => (
      <div style={{ maxWidth: '35em', margin: '0 auto' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <PasswordInput {...args} />

const sharedArgs = {
  autofocus: true,
  controlled: false
}

export const Base = Template.bind({})
Base.args = {
  ...sharedArgs,
  label: 'Enter your password'
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...sharedArgs,
  label: 'You cannot enter your password',
  disabled: true,
  value: 'Too bad'
}
