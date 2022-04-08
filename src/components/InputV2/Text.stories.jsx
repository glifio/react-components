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

export const Base = Template.bind({})
Base.args = {
  label: 'Enter your name',
  controlled: false
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'You cannot enter anything',
  controlled: false,
  disabled: true,
  text: 'Too bad'
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  label: 'Enter your name',
  controlled: false,
  placeholder: 'here please'
}

export const PlaceholderDisabled = Template.bind({})
PlaceholderDisabled.args = {
  label: 'You cannot enter anything',
  controlled: false,
  disabled: true,
  placeholder: 'over here'
}

export const Password = Template.bind({})
Password.args = {
  label: 'Enter your password',
  controlled: false,
  type: 'password'
}

export const PasswordDisabled = Template.bind({})
PasswordDisabled.args = {
  label: 'You cannot enter your password',
  controlled: false,
  disabled: true,
  type: 'password',
  text: 'Too bad'
}
