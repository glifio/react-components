import { AbiSelector } from '.'

export default {
  title: 'AbiSelector/AbiSelector',
  component: AbiSelector,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ]
}

const Template = args => <AbiSelector {...args} />

export const Base = Template.bind({})
Base.args = {
  address: '0xA95e1567e73A126FC58cc078357fb0A13845AE0C'
}
