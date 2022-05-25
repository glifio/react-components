import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { TxState, TX_STATE_PROPTYPE } from '../../customPropTypes'
import { TransactionButtons } from './Buttons'

export const TransactionForm = ({
  txState,
  setTxState
}: TransactionFormProps) => {
  const router = useRouter()

  const onSend = () => {}

  return (
    <>
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
    </>
  )
}

export type TransactionFormProps = {
  txState: TxState
  setTxState: (state: TxState) => {}
}

TransactionForm.propTypes = {
  txState: TX_STATE_PROPTYPE.isRequired,
  setTxState: PropTypes.func.isRequired
}
