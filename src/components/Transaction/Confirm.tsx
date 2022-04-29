import React from 'react'
import PropTypes from 'prop-types'
import {
  InfoBox,
  SmartLink,
  LOGIN_OPTION_PROPTYPE
} from '@glif/react-components'
import { LoginOption } from '../../lib/WalletProvider/types'
import {
  LEDGER,
  METAMASK,
  MSIG_METHOD
} from '../../constants'

function getAction(msig: boolean, method: MSIG_METHOD): string {
  return msig ? getMsigAction(method) : 'complete the transaction'
}

function getMsigAction(method: MSIG_METHOD): string {
  switch (method) {
    case MSIG_METHOD.WITHDRAW:
      return 'create a proposal to withdraw Filecoin from your Safe'
    case MSIG_METHOD.CONSTRUCTOR:
      return 'create your Safe'
    case MSIG_METHOD.PROPOSE:
      return 'create this proposal'
    case MSIG_METHOD.APPROVE:
      return 'approve this proposal'
    case MSIG_METHOD.CANCEL:
      return 'cancel this proposal'
    case MSIG_METHOD.ADD_SIGNER:
      return 'create a proposal to a add a signer to your Safe'
    case MSIG_METHOD.REMOVE_SIGNER:
      return 'create a proposal to remove a signer from your Safe'
    case MSIG_METHOD.SWAP_SIGNER:
      return 'create a proposal to swap signers of your Safe'
    case MSIG_METHOD.CHANGE_NUM_APPROVALS_THRESHOLD:
      return 'create a proposal to change the number of required approvals of your Safe'
    case MSIG_METHOD.LOCK_BALANCE:
      return "lock this Safe's balance"
    default:
      return 'perform this action'
  }
}

function getResolution(loginOption: LoginOption, msig: boolean): string {
  switch(loginOption) {
    case LEDGER:
      return 'review the details and confirm the transaction on your Ledger Device'
    case METAMASK:
      return msig ? 'approve the transaction in MetaMask' : 'review the recipient and amount in MetaMask. If the details match what you see in Glif, click "Approve"'
    default:
      return 'review the recipient and amount and click "Send" at the bottom of the page.'
  }
}

function getMsigApproveText(approvalsLeft: number): string {
  return approvalsLeft === 1
    ? 'Approving this transaction will cause it to execute.'
    : `After you approve this transaction, ${approvalsLeft - 1} more signature${approvalsLeft === 2 ? ' is' : 's are'} needed for it to execute.`
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

      {method === MSIG_METHOD.APPROVE && (
        <p>{getMsigApproveText(approvalsLeft)}</p>
      )}

      <p>
        Remember: Transactions are final once sent.
      </p>
      
      {loginOption === LEDGER && (
        <p>
          <SmartLink href='https://blog.glif.io/using-glif-with-a-ledger-device/'>
            What should I see on my Ledger Device?
          </SmartLink>
        </p>
      )}

      {loginOption === METAMASK && (
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
