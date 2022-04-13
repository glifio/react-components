import { Text } from './Text'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

export default {
  title: 'InputV2/Text',
  component: Text,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <Text {...args} />

const sharedArgs = {
  autofocus: true,
  controlled: false
}

export const Base = Template.bind({})
Base.args = {
  ...sharedArgs,
  label: 'Enter your name'
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...sharedArgs,
  label: 'You cannot enter anything',
  disabled: true,
  value: 'Too bad'
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  ...sharedArgs,
  label: 'Enter your name',
  placeholder: 'here please'
}

export const PlaceholderDisabled = Template.bind({})
PlaceholderDisabled.args = {
  ...sharedArgs,
  label: 'You cannot enter anything',
  disabled: true,
  placeholder: 'over here'
}

export const Password = Template.bind({})
Password.args = {
  ...sharedArgs,
  label: 'Enter your password',
  type: 'password'
}

export const PasswordDisabled = Template.bind({})
PasswordDisabled.args = {
  ...sharedArgs,
  label: 'You cannot enter your password',
  type: 'password',
  disabled: true,
  value: 'Too bad'
}
