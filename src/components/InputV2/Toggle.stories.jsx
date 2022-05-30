import { useState } from 'react'
import { Toggle } from './Toggle'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

const StoryComponent = ({ checked: defaultChecked, ...props }) => {
  const [checked, setChecked] = useState(defaultChecked)
  return <Toggle checked={checked} onChange={setChecked} autofocus {...props} />
}

export default {
  title: 'InputV2/Toggle',
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
  label: 'Toggle me'
}

export const Checked = Template.bind({})
Checked.args = {
  label: 'Toggle me',
  checked: true
}

export const WithInfo = Template.bind({})
WithInfo.args = {
  label: 'Toggle me',
  info: "You won't be disappointed"
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: 'You cannot toggle me',
  disabled: true
}

export const DisabledChecked = Template.bind({})
DisabledChecked.args = {
  label: 'You cannot toggle me',
  disabled: true,
  checked: true
}
