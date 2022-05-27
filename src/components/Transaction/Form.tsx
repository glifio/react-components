import PropTypes from 'prop-types'
import { useState, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Message } from '@glif/filecoin-message'
import { FilecoinNumber, BigNumber } from '@glif/filecoin-number'
import {
  FILECOIN_NUMBER_PROPTYPE,
  MESSAGE_PROPTYPE,
  MsigMethod,
  MSIG_METHOD_PROPTYPE,
  TxState,
  TX_STATE_PROPTYPE
} from '../../customPropTypes'
import { MessagePending } from '../../generated/graphql'
import { TransactionButtons } from './Buttons'
import { TransactionFee } from './Fee'
import { TransactionHeader } from './Header'
import { TransactionTotal } from './Total'
import { Dialog, ShadowBox } from '../Layout'
import { useSubmittedMessages } from '../HistoryTables/PendingMsgContext'
import { getMaxGasFee } from '../../utils'
import { useWallet, useWalletProvider } from '../../services'
import { logger } from '../../logger'

export const TransactionForm = ({
  children,
  title,
  description,
  msig,
  method,
  approvalsLeft,
  message,
  total,
  txState,
  setTxState,
  maxFee,
  txFee,
  setTxFee,
  onComplete
}: TransactionFormProps) => {
  const router = useRouter()
  const wallet = useWallet()
  const { pushPendingMessage } = useSubmittedMessages()
  const { loginOption, walletError, walletProvider, getProvider } =
    useWalletProvider()

  // Transaction states
  const [txError, setTxError] = useState<Error | null>(null)
  const [gasParamsError, setGasParamsError] = useState<Error | null>(null)
  const [messageWithGas, setMessageWithGas] = useState<Message | null>(null)

  // Max transaction fee used for getting gas params. Will be
  // null until the user manually changes the transaction fee.
  const [inputFee, setInputFee] = useState<FilecoinNumber | null>(null)

  // Calculate transaction fee (fee cap times limit)
  useEffect(() => {
    if (!messageWithGas) return setTxFee(null)
    const feeCapStr = messageWithGas.gasFeeCap.toFixed(0, BigNumber.ROUND_CEIL)
    const feeCap = new FilecoinNumber(feeCapStr, 'attofil')
    const limit = messageWithGas.gasLimit
    setTxFee(getMaxGasFee(feeCap, limit))
  }, [setTxFee, messageWithGas])

  //Load gas params with the current message and input fee
  const getGasParams = async () => {
    setTxState(TxState.LoadingTxFee)
    setGasParamsError(null)
    setMessageWithGas(null)
    try {
      setMessageWithGas(
        await walletProvider.gasEstimateMessageGas(
          message.toLotusType(),
          inputFee ? inputFee.toAttoFil() : undefined
        )
      )
    } catch (e: any) {
      logger.error(e)
      setGasParamsError(e)
    } finally {
      setTxState(TxState.FillingTxFee)
    }
  }

  // Attempt sending message
  const onSend = async () => {
    setTxState(TxState.LoadingTxDetails)
    setTxError(null)
    try {
      const provider = await getProvider()
      const newMessage = new Message({
        to: messageWithGas.to,
        from: messageWithGas.from,
        nonce: await provider.getNonce(wallet.address),
        value: messageWithGas.value,
        method: messageWithGas.method,
        params: messageWithGas.params,
        gasPremium: messageWithGas.gasPremium,
        gasFeeCap: messageWithGas.gasFeeCap,
        gasLimit: messageWithGas.gasLimit
      })
      const lotusMessage = newMessage.toLotusType()
      const msgValid = await provider.simulateMessage(lotusMessage)
      if (!msgValid) {
        throw new Error('Filecoin message invalid. No gas or fees were spent.')
      }
      setTxState(TxState.AwaitingConfirmation)
      const signedMessage = await provider.wallet.sign(
        wallet.address,
        lotusMessage
      )
      setTxState(TxState.MPoolPushing)
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
        errorMessage={
          gasParamsError?.message || txError?.message || walletError() || ''
        }
        loginOption={loginOption}
        msig={msig}
        method={method}
        approvalsLeft={approvalsLeft}
      />
      <ShadowBox>
        <form>
          {children}
          <TransactionFee
            inputFee={inputFee}
            setInputFee={setInputFee}
            maxFee={maxFee}
            txFee={txFee}
            txState={txState}
            onUpdate={getGasParams}
          />
        </form>
        {txState > TxState.FillingForm && total && (
          <TransactionTotal total={total} />
        )}
      </ShadowBox>
      <TransactionButtons
        backDisabled={
          txState !== TxState.FillingForm && txState !== TxState.FillingTxFee
        }
        nextDisabled={
          (txState !== TxState.FillingForm || !message) &&
          (txState !== TxState.FillingTxFee || !messageWithGas)
        }
        backText={txState < TxState.FillingTxFee ? 'Cancel' : 'Back'}
        nextText={txState < TxState.FillingTxFee ? 'Review' : 'Send'}
        onClickBack={
          txState < TxState.FillingTxFee
            ? router.back
            : () => setTxState(TxState.FillingForm)
        }
        onClickNext={txState < TxState.FillingTxFee ? getGasParams : onSend}
      />
    </Dialog>
  )
}

export type TransactionFormProps = {
  children: ReactNode
  title: string
  description: string
  msig?: boolean
  method?: MsigMethod
  approvalsLeft?: number
  message: Message
  total?: FilecoinNumber
  txState: TxState
  setTxState: (state: TxState) => void
  maxFee: FilecoinNumber
  txFee: FilecoinNumber
  setTxFee: (fee: FilecoinNumber) => void
  onComplete: () => void
}

TransactionForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  msig: PropTypes.bool,
  method: MSIG_METHOD_PROPTYPE,
  approvalsLeft: PropTypes.number,
  message: MESSAGE_PROPTYPE.isRequired,
  total: FILECOIN_NUMBER_PROPTYPE,
  txState: TX_STATE_PROPTYPE.isRequired,
  setTxState: PropTypes.func.isRequired,
  maxFee: FILECOIN_NUMBER_PROPTYPE.isRequired,
  txFee: FILECOIN_NUMBER_PROPTYPE.isRequired,
  setTxFee: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired
}
