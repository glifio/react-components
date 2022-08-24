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

export const SwitchingEnabled = Template.bind({})
SwitchingEnabled.args = {}

export const SwitchingDisabled = Template.bind({})
SwitchingDisabled.args = {
  enableSwitching: false
}
