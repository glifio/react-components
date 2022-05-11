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
  loginOption,
  msig,
  method,
  approvalsLeft,
  txTitle,
  txDescription,
  txState,
  error
}: TxStatePropTypes) => {
  if (!!error) {
    return (
      <>
        <StandardBox>
          <h2>{txTitle}</h2>
          <hr />
          <p>Something went wrong</p>
        </StandardBox>
        <ErrorBox>{error}</ErrorBox>
      </>
    )
  }
  return (
    <>
      {txState === TxState.FillingForm && (
        <StandardBox>
          <h2>{txTitle}</h2>
          <hr />
          <p>{txDescription}</p>
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
  loginOption: LoginOption
  txState: TxState
  txTitle: string
  txDescription: string
  error?: string
  msig?: boolean
  method?: MsigMethod
  approvalsLeft?: number
}

TransactionState.propTypes = {
  loginOption: LOGIN_OPTION_PROPTYPE.isRequired,
  txState: TX_STATE_PROPTYPE.isRequired,
  txTitle: PropTypes.string.isRequired,
  txDescription: PropTypes.string.isRequired,
  msig: PropTypes.bool,
  method: MSIG_METHOD_PROPTYPE,
  approvalsLeft: PropTypes.number
}

TransactionState.defaultProps = {
  msig: false
}
