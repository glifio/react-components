import { ReactNode } from 'react'
import PropTypes from 'prop-types'
import { InfoBox } from '../Layout'
import { SmartLink } from '../Link/SmartLink'
import {
  LoginOption,
  LOGIN_OPTION_PROPTYPE,
  MsigMethod,
  MSIG_METHOD_PROPTYPE
} from '../../customPropTypes'

function getAction(msig: boolean, method: MsigMethod): ReactNode {
  return msig ? getMsigAction(method) : <>complete the transaction</>
}

function getMsigAction(method: MsigMethod): ReactNode {
  switch (method) {
    case MsigMethod.WITHDRAW:
      return <>create a proposal to withdraw Filecoin from your Safe</>
    case MsigMethod.CONSTRUCTOR:
      return <>create your Safe</>
    case MsigMethod.PROPOSE:
      return <>create this proposal</>
    case MsigMethod.APPROVE:
      return <>approve this proposal</>
    case MsigMethod.CANCEL:
      return <>cancel this proposal</>
    case MsigMethod.ADD_SIGNER:
      return <>create a proposal to a add a signer to your Safe</>
    case MsigMethod.REMOVE_SIGNER:
      return <>create a proposal to remove a signer from your Safe</>
    case MsigMethod.SWAP_SIGNER:
      return <>create a proposal to swap signers of your Safe</>
    case MsigMethod.CHANGE_NUM_APPROVALS_THRESHOLD:
      return (
        <>
          create a proposal to change the number of required approvals of your
          Safe
        </>
      )
    case MsigMethod.LOCK_BALANCE:
      return <>lock this Safe&apos;s balance</>
    default:
      return <>perform this action</>
  }
}

function getResolution(loginOption: LoginOption, msig: boolean): ReactNode {
  const subject = msig ? 'transaction details' : 'recipient and amount'
  switch (loginOption) {
    case LoginOption.LEDGER:
      return (
        <>
          review the {subject} on your <b>Ledger Device</b>. If the details
          match what you see in Glif, select <b>Approve</b>.
        </>
      )
    case LoginOption.METAMASK:
      return (
        <>
          review the {subject} in <b>MetaMask</b>. If the details match what you
          see in Glif, click <b>Approve</b>.
        </>
      )
    default:
      return (
        <>
          review the {subject} and click <b>Send</b> at the bottom of the page.
        </>
      )
  }
}

function getMsigApproveText(approvalsLeft: number): ReactNode {
  const plural = approvalsLeft > 2
  return approvalsLeft === 1 ? (
    <>
      Approving this transaction <b>will cause it to execute</b>.
    </>
  ) : (
    <>
      After you approve this transaction,{' '}
      <b>
        {approvalsLeft - 1} more signature${plural ? 's' : ''}
      </b>{' '}
      {plural ? 'are' : 'is'} needed for it to <b>execute</b>.
    </>
  )
}

export const TransactionConfirm = ({
  loginOption,
  msig,
  method,
  approvalsLeft
}: TransactionConfirmProps) => (
  <InfoBox>
    <p>
      To ${getAction(msig, method)}, please ${getResolution(loginOption, msig)}
    </p>

    {method === MsigMethod.APPROVE && (
      <p>{getMsigApproveText(approvalsLeft)}</p>
    )}

    <p>
      Remember: <b>Transactions are final once sent</b>.
    </p>

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

type TransactionConfirmProps = {
  loginOption: LoginOption
  msig?: boolean
  method?: MsigMethod
  approvalsLeft?: number
}

TransactionConfirm.propTypes = {
  loginOption: LOGIN_OPTION_PROPTYPE.isRequired,
  msig: PropTypes.bool,
  method: MSIG_METHOD_PROPTYPE,
  approvalsLeft: PropTypes.number
}

TransactionConfirm.defaultProps = {
  msig: false
}
