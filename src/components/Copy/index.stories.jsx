import { CopyAddress } from './index'

export default {
  title: 'Copy/CopyAddress',
  component: CopyAddress,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ]
}

const Template = args => <CopyAddress {...args} />

export const Base = Template.bind({})
Base.args = {
  address: 'f17uoq6tp427uzv7fztkbsnn64iwotfrristwpryy'
}
