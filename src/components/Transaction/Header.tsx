import PropTypes from 'prop-types'
import { ErrorBox, WarningBox } from '../Layout'
import { StandardBox } from '../Layout'
import { TxState, TX_STATE_PROPTYPE } from '../../customPropTypes'
import { LoadingIcon } from '../Loading/LoadingIcon'
import {
  TransactionConfirm,
  TransactionConfirmProps,
  TransactionConfirmPropTypes
} from './Confirm'

export const TransactionHeader = ({
  txState,
  title,
  description,
  warning,
  errorMessage,
  loginOption,
  msig,
  method,
  approvalsLeft
}: TransactionHeaderProps) => (
  <>
    <StandardBox>
      <h2>{title}</h2>
      <hr />
      <p>
        {errorMessage
          ? 'Something went wrong'
          : txState === TxState.LoadingMessage
          ? 'Loading message information...'
          : txState === TxState.LoadingFailed
          ? 'Failed to load message information'
          : txState === TxState.FillingTxFee
          ? 'Please review the transaction below'
          : txState === TxState.LoadingTxFee
          ? 'Loading transaction fee...'
          : txState === TxState.LoadingTxDetails
          ? 'Loading transaction details...'
          : txState === TxState.AwaitingConfirmation
          ? 'Awaiting confirmation...'
          : txState === TxState.MPoolPushing
          ? 'Sending your transaction...'
          : description}
      </p>
      {(txState === TxState.LoadingMessage ||
        txState === TxState.LoadingTxDetails ||
        txState === TxState.MPoolPushing) && <LoadingIcon />}
    </StandardBox>
    {warning &&
      (txState === TxState.FillingTxFee ||
        txState === TxState.LoadingTxFee) && <WarningBox>{warning}</WarningBox>}
    {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
    {txState === TxState.LoadingFailed && (
      <ErrorBox>
        The message you are trying to access could not be loaded
      </ErrorBox>
    )}
    {txState === TxState.AwaitingConfirmation && (
      <TransactionConfirm
        loginOption={loginOption}
        msig={msig}
        method={method}
        approvalsLeft={approvalsLeft}
      />
    )}
  </>
)

export type TransactionHeaderProps = {
  txState: TxState
  title: string
  description: string
  warning?: string
  errorMessage?: string
} & TransactionConfirmProps

TransactionHeader.propTypes = {
  txState: TX_STATE_PROPTYPE.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  warning: PropTypes.string,
  errorMessage: PropTypes.string,
  ...TransactionConfirmPropTypes
}
