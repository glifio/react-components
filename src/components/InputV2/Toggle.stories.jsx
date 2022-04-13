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

export const Base = Template.bind({})
Base.args = {
  label: 'Toggle me',
  controlled: false
}

export const Checked = Template.bind({})
Checked.args = {
  label: 'Toggle me',
  controlled: false,
  checked: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'You cannot toggle me',
  controlled: false,
  disabled: true
}

export const DisabledChecked = Template.bind({})
DisabledChecked.args = {
  label: 'You cannot toggle me',
  controlled: false,
  disabled: true,
  checked: true
}
