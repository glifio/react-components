import PropTypes from 'prop-types'
import { ErrorBox } from '../Layout'
import { StandardBox } from '../Layout'
import {
  LoginOption,
  LOGIN_OPTION_PROPTYPE,
  MsigMethod,
  MSIG_METHOD_PROPTYPE,
  TxState,
  TX_STATE_PROPTYPE
} from '../../customPropTypes'
import LoaderGlyph from '../LoaderGlyph'
import { TransactionConfirm } from './Confirm'

export const TransactionHeader = ({
  txState,
  title,
  description,
  loginOption,
  msig,
  method,
  approvalsLeft,
  errorMessage
}: TransactionHeaderProps) => (
  <>
    <StandardBox>
      <h2>{title}</h2>
      <hr />
      <p>
        {errorMessage
          ? 'Something went wrong'
          : txState === TxState.LoadingTxDetails
          ? 'Loading transaction details...'
          : txState === TxState.MPoolPushing
          ? 'Sending your transaction...'
          : txState === TxState.AwaitingConfirmation
          ? 'Awaiting confirmation...'
          : description}
      </p>
      {(txState === TxState.LoadingTxDetails ||
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

export interface TransactionHeaderProps {
  txState: TxState
  title: string
  description: string
  loginOption: LoginOption
  msig?: boolean
  method?: MsigMethod
  approvalsLeft?: number
  errorMessage?: string
}

TransactionHeader.propTypes = {
  txState: TX_STATE_PROPTYPE.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  loginOption: LOGIN_OPTION_PROPTYPE.isRequired,
  msig: PropTypes.bool,
  method: MSIG_METHOD_PROPTYPE,
  approvalsLeft: PropTypes.number,
  errorMessage: PropTypes.string
}
