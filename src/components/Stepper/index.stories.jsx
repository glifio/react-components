import Stepper from './index'

export default {
  title: 'Stepper/Stepper',
  component: Stepper,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <Stepper {...args} />

export const Base = Template.bind({})
Base.args = {
  textColor: 'colors.core.black',
  completedDotColor: 'colors.core.primary',
  incompletedDotColor: 'colors.core.yellow',
  step: 2,
  totalSteps: 5
}
