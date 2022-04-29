import { Dialog, OneColumnCentered } from '../Layout'
import { TransactionConfirm } from './Confirm'
import { LoginOption, MsigMethod } from '../../customPropTypes'

export default {
  title: 'Transaction/Confirm',
  component: TransactionConfirm,
  decorators: [
    Story => (
      <OneColumnCentered>
        <Dialog>{Story()}</Dialog>
      </OneColumnCentered>
    )
  ]
}

const Template = args => <TransactionConfirm {...args} />

export const Base = Template.bind({})
Base.args = {
  loginOption: LoginOption.IMPORT_MNEMONIC
}

export const Ledger = Template.bind({})
Ledger.args = {
  loginOption: LoginOption.LEDGER
}

export const MetaMask = Template.bind({})
MetaMask.args = {
  loginOption: LoginOption.METAMASK
}

export const MsigMetaMask = Template.bind({})
MsigMetaMask.args = {
  loginOption: LoginOption.METAMASK,
  msig: true,
  method: MsigMethod.WITHDRAW
}

export const MsigLedger = Template.bind({})
MsigLedger.args = {
  loginOption: LoginOption.LEDGER,
  msig: true,
  method: MsigMethod.WITHDRAW
}

export const MsigApprove = Template.bind({})
MsigApprove.args = {
  loginOption: LoginOption.METAMASK,
  msig: true,
  method: MsigMethod.APPROVE,
  approvalsLeft: 3
}

export const MsigApproveLast = Template.bind({})
MsigApproveLast.args = {
  loginOption: LoginOption.METAMASK,
  msig: true,
  method: MsigMethod.APPROVE,
  approvalsLeft: 1
}
