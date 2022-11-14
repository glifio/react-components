import { ActorState } from '.'

export default {
  title: 'ActorState/ActorState',
  component: ActorState
}

const Template = args => <ActorState {...args} />

export const Base = Template.bind({})
Base.args = {
  address: '0xA95e1567e73A126FC58cc078357fb0A13845AE0C'
}
