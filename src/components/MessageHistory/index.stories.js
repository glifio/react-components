import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

import MessageHistory from './index'

export default {
  title: 'MessageHistory/Table',
  component: MessageHistory,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <MessageHistory {...args} />

export const Base = Template.bind({})
Base.args = {
  address: 'f0123'
}
