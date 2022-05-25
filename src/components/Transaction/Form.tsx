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

  // Attempt sending message
  const onSend = async () => {
    setTxState(TxState.LoadingTxDetails)
    setTxError(null)
    try {
      const provider = await getProvider()
      const nonce = await provider.getNonce(wallet.address)
      const newMessage = new Message({
        to: message.to,
        from: message.from,
        nonce,
        value: message.value,
        method: message.method,
        params: getParams ? getParams(nonce) : message.params,
        gasPremium: gasParams.gasPremium.toAttoFil(),
        gasFeeCap: gasParams.gasFeeCap.toAttoFil(),
        gasLimit: new BigNumber(gasParams.gasLimit.toAttoFil()).toNumber()
      })
      setTxState(TxState.AwaitingConfirmation)
      const lotusMessage = newMessage.toLotusType()
      const signedMessage = await provider.wallet.sign(
        wallet.address,
        lotusMessage
      )
      setTxState(TxState.MPoolPushing)
      const msgValid = await provider.simulateMessage(lotusMessage)
      if (!msgValid) {
        throw new Error('Filecoin message invalid. No gas or fees were spent.')
      }
      const msgCid = await provider.sendMessage(signedMessage)
      pushPendingMessage(
        newMessage.toPendingMessage(msgCid['/']) as MessagePending
      )
      onComplete()
    } catch (e: any) {
      logger.error(e)
      setTxState(TxState.FillingTxFee)
      setTxError(e)
    }
  }

  return (
    <Dialog>
      <TransactionHeader
        txState={txState}
        title={title}
        description={description}
        loginOption={loginOption}
        errorMessage={
          gasParamsError?.message || txError?.message || walletError() || ''
        }
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
  setTxState: (state: TxState) => void
  getParams?: (nonce: number) => string
  onComplete: () => void
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
  getParams: PropTypes.func,
  onComplete: PropTypes.func.isRequired
}
