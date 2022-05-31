import theme from '../../theme'
import ThemeProvider from '../../ThemeProvider'
import { ConnectLedger } from '.'

export default {
  title: 'Connect/Ledger',
  component: ConnectLedger,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <ConnectLedger {...args} />

export const Base = Template.bind({})
Base.args = {
  back: () => console.log('Clicked Back'),
  next: () => console.log('Clicked Next')
}
