import { Toggle } from './Toggle'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

export default {
  title: 'InputV2/Toggle',
  component: Toggle,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <Toggle {...args}>Click me</Toggle>

export const Base = Template.bind({})
let baseChecked = false
Base.args = {
  label: 'Toggle me',
  checked: baseChecked,
  setChecked: checked => (baseChecked = checked)
}

export const Checked = Template.bind({})
let checkedChecked = true
Checked.args = {
  label: 'Toggle me',
  checked: checkedChecked,
  setChecked: checked => (checkedChecked = checked)
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Toggle me',
  disabled: true,
  checked: false,
  setChecked: checked => {}
}
