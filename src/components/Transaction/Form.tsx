import PropTypes from 'prop-types'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { TxState, TX_STATE_PROPTYPE, LoginOption, LOGIN_OPTION_PROPTYPE } from '../../customPropTypes'
import { TransactionButtons } from './Buttons'
import { TransactionHeader } from './Header'
import { Dialog, ShadowBox } from '../Layout'

export const TransactionForm = ({
  children,
  title,
  description,
  loginOption,
  txState,
  setTxState
}: TransactionFormProps) => {
  const router = useRouter()

  const onSend = () => {}

  return (
    <Dialog>
      <TransactionHeader
        txState={txState}
        title={title}
        description={description}
        loginOption={loginOption}
      />
      <ShadowBox>
        {children}
      </ShadowBox>
      <TransactionButtons
        backDisabled={
          txState !== TxState.FillingForm && txState !== TxState.FillingTxFee
        }
        nextDisabled={
          txState !== TxState.FillingForm && txState !== TxState.FillingTxFee
        }
        backText={txState < TxState.FillingTxFee ? 'Cancel' : 'Back'}
        nextText={txState < TxState.FillingTxFee ? 'Review' : 'Send'}
        onClickBack={
          txState < TxState.FillingTxFee
            ? router.back
            : () => setTxState(TxState.FillingForm)
        }
        onClickNext={
          txState < TxState.FillingTxFee
            ? () => setTxState(TxState.FillingTxFee)
            : onSend
        }
      />
    </Dialog>
  )
}

export type TransactionFormProps = {
  children: ReactNode
  title: string
  description: string
  loginOption: LoginOption
  txState: TxState
  setTxState: (state: TxState) => {}
}

TransactionForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  LoginOption: LOGIN_OPTION_PROPTYPE.isRequired,
  txState: TX_STATE_PROPTYPE.isRequired,
  setTxState: PropTypes.func.isRequired
}
