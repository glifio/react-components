import { NetworkSelector } from './index'

export default {
  title: 'NetworkSelector/NetworkSelector',
  component: NetworkSelector,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ]
}

const Template = args => <NetworkSelector {...args} />

export const Base = Template.bind({})
Base.args = {
  apiKey: 'm787669344-2a9b90eb03dbff3e503c93c7',
  statusApiAddr: 'https://api.uptimerobot.com/v2/getMonitors',
  lotusApiAddr: 'https://api.calibration.node.glif.io'
}
