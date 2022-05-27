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
Base.args = {
  onClickBack: () => console.log('Clicked Back'),
  onClickNext: () => console.log('Clicked Next')
}

export const BackDisabled = Template.bind({})
BackDisabled.args = {
  backDisabled: true,
  onClickBack: () => console.log('Clicked Back'),
  onClickNext: () => console.log('Clicked Next')
}

export const NextDisabled = Template.bind({})
NextDisabled.args = {
  nextDisabled: true,
  onClickBack: () => console.log('Clicked Back'),
  onClickNext: () => console.log('Clicked Next')
}

export const Confirm = Template.bind({})
Confirm.args = {
  backText: 'Cancel',
  nextText: 'Confirm',
  onClickBack: () => console.log('Clicked Cancel'),
  onClickNext: () => console.log('Clicked Confirm')
}

export const Send = Template.bind({})
Send.args = {
  backText: 'Cancel',
  nextText: 'Send',
  onClickBack: () => console.log('Clicked Cancel'),
  onClickNext: () => console.log('Clicked Send')
}
