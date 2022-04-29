import React from 'react'
import PropTypes from 'prop-types'
import { InfoBox } from '../Layout'
import { SmartLink } from '../Link/SmartLink'
import {
  LoginOption,
  LOGIN_OPTION_PROPTYPE,
  MsigMethod
} from '../../customPropTypes'

function getAction(msig: boolean, method: MsigMethod): string {
  return msig ? getMsigAction(method) : 'complete the transaction'
}

function getMsigAction(method: MsigMethod): string {
  switch (method) {
    case MsigMethod.WITHDRAW:
      return 'create a proposal to withdraw Filecoin from your Safe'
    case MsigMethod.CONSTRUCTOR:
      return 'create your Safe'
    case MsigMethod.PROPOSE:
      return 'create this proposal'
    case MsigMethod.APPROVE:
      return 'approve this proposal'
    case MsigMethod.CANCEL:
      return 'cancel this proposal'
    case MsigMethod.ADD_SIGNER:
      return 'create a proposal to a add a signer to your Safe'
    case MsigMethod.REMOVE_SIGNER:
      return 'create a proposal to remove a signer from your Safe'
    case MsigMethod.SWAP_SIGNER:
      return 'create a proposal to swap signers of your Safe'
    case MsigMethod.CHANGE_NUM_APPROVALS_THRESHOLD:
      return 'create a proposal to change the number of required approvals of your Safe'
    case MsigMethod.LOCK_BALANCE:
      return "lock this Safe's balance"
    default:
      return 'perform this action'
  }
}

function getResolution(loginOption: LoginOption, msig: boolean): string {
  switch (loginOption) {
    case LoginOption.LEDGER:
      return 'review the details and confirm the transaction on your Ledger Device'
    case LoginOption.METAMASK:
      return msig
        ? 'approve the transaction in MetaMask'
        : 'review the recipient and amount in MetaMask. If the details match what you see in Glif, click "Approve"'
    default:
      return 'review the recipient and amount and click "Send" at the bottom of the page.'
  }
}

function getMsigApproveText(approvalsLeft: number): string {
  return approvalsLeft === 1
    ? 'Approving this transaction will cause it to execute.'
    : `After you approve this transaction, ${approvalsLeft - 1} more signature${
        approvalsLeft === 2 ? ' is' : 's are'
      } needed for it to execute.`
}

export const TransactionConfirm = ({
  loginOption,
  msig,
  method,
  approvalsLeft
}: TransactionConfirmProps) => {
  return (
    <InfoBox>
      <p>
        To {getAction(msig, method)}, please {getResolution(loginOption, msig)}
      </p>

      {method === MsigMethod.APPROVE && (
        <p>{getMsigApproveText(approvalsLeft)}</p>
      )}

      <p>Remember: Transactions are final once sent.</p>

      {loginOption === LoginOption.LEDGER && (
        <p>
          <SmartLink href='https://blog.glif.io/using-glif-with-a-ledger-device/'>
            What should I see on my Ledger Device?
          </SmartLink>
        </p>
      )}

      {loginOption === LoginOption.METAMASK && (
        <p>
          <SmartLink href='https://blog.glif.io/using-glif-with-metamask/'>
            What should I see in MetaMask?
          </SmartLink>
        </p>
      )}
    </InfoBox>
  )
}

type TransactionConfirmProps = {
  loginOption: LoginOption
  msig?: boolean
  method?: number
  approvalsLeft?: number
}

TransactionConfirm.propTypes = {
  loginOption: LOGIN_OPTION_PROPTYPE.isRequired,
  msig: PropTypes.bool,
  method: PropTypes.number,
  approvalsLeft: PropTypes.number
}

TransactionConfirm.defaultProps = {
  msig: false,
  method: 0,
  approvalsLeft: 0
}
