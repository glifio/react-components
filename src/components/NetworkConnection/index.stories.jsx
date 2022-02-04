import theme from '../theme'
import ThemeProvider from '../ThemeProvider'

import { NetworkConnection } from './index'

export default {
  title: 'NetworkConnection/NetworkConnection',
  component: NetworkConnection,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
      </div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <NetworkConnection {...args} />

export const Base = Template.bind({})
Base.args = {
  apiKey: 'm787669344-2a9b90eb03dbff3e503c93c7',
  statusApiAddr: 'https://api.uptimerobot.com/v2/getMonitors',
  lotusApiAddr: 'https://calibration.node.glif.io'
}
