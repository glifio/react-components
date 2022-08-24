import StepHeader from './index'
import { IconSend } from '../Icons'

export default {
  title: 'StepHeader/StepHeader',
  component: StepHeader,
  decorators: [
    Story => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>{Story()}</div>
    )
  ],
  parameters: { actions: { argTypesRegex: '^on.*' } }
}

const Template = args => <StepHeader {...args} />

export const Base = Template.bind({})
Base.args = {
  loading: false,
  currentStep: 1,
  totalSteps: 5,
  error: false,
  showStepper: true,
  title: 'A Title',
  glyphAcronym: 'LoL',
  icon: IconSend
}
