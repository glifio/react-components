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
Base.args = {
  label: 'Toggle me'
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'Toggle me',
  disabled: true
}
