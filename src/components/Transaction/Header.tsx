import PropTypes from 'prop-types'
import { ErrorBox } from '../Layout'
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
          : txState === TxState.LoadingTxDetails
          ? 'Loading transaction details...'
          : txState === TxState.MPoolPushing
          ? 'Sending your transaction...'
          : txState === TxState.AwaitingConfirmation
          ? 'Awaiting confirmation...'
          : description}
      </p>
      {(txState === TxState.LoadingMessage ||
        txState === TxState.LoadingTxDetails ||
        txState === TxState.MPoolPushing) && <LoaderGlyph />}
    </StandardBox>
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
  errorMessage?: string
} & TransactionConfirmProps

TransactionHeader.propTypes = {
  txState: TX_STATE_PROPTYPE.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  ...TransactionConfirmPropTypes
}
