import { Toggle } from './Toggle'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

export default {
  title: 'InputV2/Toggle',
  component: Toggle,
  decorators: [
    Story => (
      <div style={{ maxWidth: '35em', margin: '0 auto' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <Toggle {...args} />

const sharedArgs = {
  autofocus: true,
  controlled: false
}

export const Base = Template.bind({})
Base.args = {
  ...sharedArgs,
  label: 'Toggle me'
}

export const Checked = Template.bind({})
Checked.args = {
  ...sharedArgs,
  label: 'Toggle me',
  checked: true
}

export const WithInfo = Template.bind({})
WithInfo.args = {
  ...sharedArgs,
  label: 'Toggle me',
  info: "You won't be disappointed"
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...sharedArgs,
  label: 'You cannot toggle me',
  disabled: true
}

export const DisabledChecked = Template.bind({})
DisabledChecked.args = {
  ...sharedArgs,
  label: 'You cannot toggle me',
  disabled: true,
  checked: true
}
