import { Dialog, OneColumnCentered } from '../Layout'
import { TransactionButtons } from './Buttons'

export default {
  title: 'Transaction/Buttons',
  component: TransactionButtons,
  decorators: [
    Story => (
      <OneColumnCentered>
        <Dialog>{Story()}</Dialog>
      </OneColumnCentered>
    )
  ]
}

const Template = args => <TransactionButtons {...args} />

export const Base = Template.bind({})
Base.args = {}

export const BackDisabled = Template.bind({})
BackDisabled.args = {
  backDisabled: true
}

export const NextDisabled = Template.bind({})
NextDisabled.args = {
  nextDisabled: true
}

export const Confirm = Template.bind({})
Confirm.args = {
  backText: 'Cancel',
  nextText: 'Confirm'
}

export const Send = Template.bind({})
Send.args = {
  backText: 'Cancel',
  nextText: 'Send'
}
