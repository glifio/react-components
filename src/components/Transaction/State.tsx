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
import { TransactionConfirm } from './Confirm'
import { TransactionLoading } from './Loading'

export const TransactionState = ({
  txState,
  title,
  description,
  loginOption,
  msig,
  method,
  approvalsLeft,
  errorMessage
}: TxStatePropTypes) => {
  if (!!errorMessage) {
    return (
      <>
        <StandardBox>
          <h2>{title}</h2>
          <hr />
          <p>Something went wrong</p>
        </StandardBox>
        <ErrorBox>{errorMessage}</ErrorBox>
      </>
    )
  }
  return (
    <>
      {txState === TxState.FillingForm && (
        <StandardBox>
          <h2>{title}</h2>
          <hr />
          <p>{description}</p>
        </StandardBox>
      )}
      {txState === TxState.LoadingTxDetails && (
        <TransactionLoading description='Loading transaction details...' />
      )}
      {txState === TxState.MPoolPushing && (
        <TransactionLoading description='Sending your transaction...' />
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
}

export interface TxStatePropTypes {
  txState: TxState
  title: string
  description: string
  loginOption: LoginOption
  msig?: boolean
  method?: MsigMethod
  approvalsLeft?: number
  errorMessage?: string
}

TransactionState.propTypes = {
  txState: TX_STATE_PROPTYPE.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  loginOption: LOGIN_OPTION_PROPTYPE.isRequired,
  msig: PropTypes.bool,
  method: MSIG_METHOD_PROPTYPE,
  approvalsLeft: PropTypes.number,
  errorMessage: PropTypes.string
}
