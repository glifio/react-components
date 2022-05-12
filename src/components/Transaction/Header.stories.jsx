import { Dialog, OneColumnCentered } from '../Layout'
import { TransactionHeader } from './Header'
import { TxState, LoginOption } from '../../customPropTypes'

export default {
  title: 'Transaction/Header',
  component: TransactionHeader,
  decorators: [
    Story => (
      <OneColumnCentered>
        <Dialog>{Story()}</Dialog>
      </OneColumnCentered>
    )
  ]
}

const Template = args => <TransactionHeader {...args} />

export const Base = Template.bind({})
Base.args = {
  txState: TxState.FillingForm,
  title: 'Filecoin Transaction',
  description: 'Enter the transaction details',
  loginOption: LoginOption.METAMASK
}

export const LoadingTxDetails = Template.bind({})
LoadingTxDetails.args = {
  txState: TxState.LoadingTxDetails,
  title: 'Filecoin Transaction',
  description: 'Enter the transaction details',
  loginOption: LoginOption.METAMASK
}

export const MPoolPushing = Template.bind({})
MPoolPushing.args = {
  txState: TxState.MPoolPushing,
  title: 'Filecoin Transaction',
  description: 'Enter the transaction details',
  loginOption: LoginOption.METAMASK
}

export const AwaitingConfirmation = Template.bind({})
AwaitingConfirmation.args = {
  txState: TxState.AwaitingConfirmation,
  title: 'Filecoin Transaction',
  description: 'Enter the transaction details',
  loginOption: LoginOption.METAMASK
}

export const Error = Template.bind({})
Error.args = {
  txState: TxState.FillingForm,
  title: 'Filecoin Transaction',
  description: 'Enter the transaction details',
  loginOption: LoginOption.METAMASK,
  errorMessage: 'Failed to send the transaction'
}
