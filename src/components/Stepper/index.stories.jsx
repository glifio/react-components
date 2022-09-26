import { Stepper } from './index'

export default {
  title: 'Stepper/Stepper',
  component: Stepper,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ]
}

const Template = args => <Stepper {...args} />

export const Base = Template.bind({})
Base.args = {
  step: 2,
  steps: 5,
  error: false
}

export const Error = Template.bind({})
Error.args = {
  step: 2,
  steps: 5,
  error: true
}
