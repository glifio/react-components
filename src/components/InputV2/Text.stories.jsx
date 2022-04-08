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
let baseText = ''
Base.args = {
  label: 'Enter your name',
  text: baseText,
  setText: text => (baseText = text)
}
