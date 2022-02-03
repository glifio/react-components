import ButtonV2 from './V2'
import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

export default {
  title: 'Button/ButtonV2',
  component: ButtonV2,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <ButtonV2 {...args}>Click me</ButtonV2>

export const Base = Template.bind({})
Base.args = {}

export const Large = Template.bind({})
Large.args = {
  large: true
}

export const White = Template.bind({})
White.args = {
  white: true
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true
}
