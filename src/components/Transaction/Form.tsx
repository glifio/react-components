import PropTypes from 'prop-types'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { Message } from '@glif/filecoin-message'
import { MESSAGE_PROPTYPE, TxState, TX_STATE_PROPTYPE } from '../../customPropTypes'
import { TransactionButtons } from './Buttons'
import { TransactionHeader } from './Header'
import { Dialog, ShadowBox } from '../Layout'

export const TransactionForm = ({
  children,
  title,
  description,
  message,
  txState,
  setTxState,
  onComplete
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
  message: Message
  txState: TxState
  setTxState: (state: TxState) => {}
  onComplete: () => {}
}

TransactionForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  message: MESSAGE_PROPTYPE.isRequired,
  txState: TX_STATE_PROPTYPE.isRequired,
  setTxState: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired
}
