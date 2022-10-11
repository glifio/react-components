import { OneColumnCentered, WideDialog, ShadowBox } from '../../../../Layout'
import { Walkthrough } from '.'

export default {
  title: 'Connect/Walkthrough',
  component: Walkthrough,
  decorators: [
    Story => (
      <OneColumnCentered>
        <WideDialog>
          <ShadowBox>{Story()}</ShadowBox>
        </WideDialog>
      </OneColumnCentered>
    )
  ]
}

const Template = args => <Walkthrough {...args} />

export const Step1 = Template.bind({})
Step1.args = {
  mnemonic:
    'casino hover time demand slim wonder chunk embrace actual theory dolphin spray mail runway blouse arrest love adult yellow popular screen maid opera select',
  step: 1,
  onValidChange: valid => console.log(valid)
}

export const Step2 = Template.bind({})
Step2.args = {
  mnemonic:
    'casino hover time demand slim wonder chunk embrace actual theory dolphin spray mail runway blouse arrest love adult yellow popular screen maid opera select',
  step: 2,
  onValidChange: valid => console.log(valid)
}

export const Step3 = Template.bind({})
Step3.args = {
  mnemonic:
    'casino hover time demand slim wonder chunk embrace actual theory dolphin spray mail runway blouse arrest love adult yellow popular screen maid opera select',
  step: 3,
  onValidChange: valid => console.log(valid)
}
