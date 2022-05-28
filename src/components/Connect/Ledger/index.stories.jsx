import theme from '../../theme'
import ThemeProvider from '../../ThemeProvider'

import Ledger from './'

export default {
  title: 'Ledger/Ledger',
  component: Ledger,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <Ledger {...args} />

export const Base = Template.bind({})
Base.args = {}
