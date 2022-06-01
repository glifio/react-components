import PropTypes from 'prop-types'
import { ErrorBox, WarningBox } from '../Layout'
import { StandardBox } from '../Layout'
import { TxState, TX_STATE_PROPTYPE } from '../../customPropTypes'
import LoaderGlyph from '../LoaderGlyph'
import {
  TransactionConfirm,
  TransactionConfirmProps,
  TransactionConfirmPropTypes
} from './Confirm'

export const TransactionHeader = ({
  txState,
  title,
  description,
  warningMessage,
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
        txState === TxState.MPoolPushing) && <LoaderGlyph />}
    </StandardBox>
    {warningMessage && <WarningBox>{warningMessage}</WarningBox>}
    {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}
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
  warningMessage?: string
  errorMessage?: string
} & TransactionConfirmProps

TransactionHeader.propTypes = {
  txState: TX_STATE_PROPTYPE.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  warningMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  ...TransactionConfirmPropTypes
}
