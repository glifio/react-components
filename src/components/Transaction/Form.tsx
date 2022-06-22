import PropTypes from 'prop-types'
import { useState, ReactNode, useEffect, Context } from 'react'
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
import { Dialog, Lines, ShadowBox } from '../Layout'
import {
  PendingMsgContextType,
  useSubmittedMessages
} from '../HistoryTables/PendingMsgContext'
import {
  useWallet,
  useWalletProvider,
  WalletProviderOpts
} from '../../services'
import { logger } from '../../logger'

export const TransactionForm = ({
  children,
  title,
  description,
  warning,
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
  onComplete,
  walletProviderOpts,
  pendingMsgContext
}: TransactionFormProps) => {
  const router = useRouter()
  const wallet = useWallet()
  const { pushPendingMessage } = useSubmittedMessages(pendingMsgContext)
  const { loginOption, walletError, walletProvider, getProvider } =
    useWalletProvider(walletProviderOpts)

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
    setTxFee(feeCap.times(messageWithGas.gasLimit))
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
      onComplete(msgCid['/'], newMessage)
    } catch (e: any) {
      logger.error(e)
      setTxState(TxState.FillingTxFee)
      setTxError(e)
    }
  }

  return (
    <Dialog>
      <form
        onSubmit={e => {
          e.preventDefault()
          txState < TxState.FillingTxFee ? getGasParams() : onSend()
        }}
      >
        <TransactionHeader
          txState={txState}
          title={title}
          description={description}
          warning={warning}
          errorMessage={
            gasParamsError?.message || txError?.message || walletError() || ''
          }
          loginOption={loginOption}
          msig={msig}
          method={method}
          approvalsLeft={approvalsLeft}
        />
        {txState >= TxState.FillingForm && (
          <ShadowBox>
            <Lines>
              {children}
              <TransactionFee
                inputFee={inputFee}
                setInputFee={setInputFee}
                maxFee={maxFee}
                txFee={txFee}
                txState={txState}
                onUpdate={getGasParams}
              />
              {txState >= TxState.FillingTxFee && total && (
                <TransactionTotal total={total} />
              )}
            </Lines>
          </ShadowBox>
        )}
        <TransactionButtons
          backDisabled={
            txState !== TxState.LoadingFailed &&
            txState !== TxState.FillingForm &&
            txState !== TxState.FillingTxFee
          }
          nextDisabled={
            (txState !== TxState.FillingForm || !message) &&
            (txState !== TxState.FillingTxFee ||
              !messageWithGas ||
              txFee.isGreaterThan(maxFee))
          }
          backText={txState < TxState.FillingTxFee ? 'Cancel' : 'Back'}
          nextText={txState < TxState.FillingTxFee ? 'Review' : 'Send'}
          onClickBack={
            txState < TxState.FillingTxFee
              ? router.back
              : () => setTxState(TxState.FillingForm)
          }
        />
      </form>
    </Dialog>
  )
}

export type TransactionFormProps = {
  children: ReactNode
  title: string
  description: string
  warning?: string
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
  onComplete: (cid: string, message: Message) => void
  // used for testing with a stubbed context value
  walletProviderOpts?: WalletProviderOpts
  pendingMsgContext?: Context<PendingMsgContextType>
}

TransactionForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  warning: PropTypes.string,
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
  onComplete: PropTypes.func.isRequired,
  walletProviderOpts: PropTypes.object,
  pendingMsgContext: PropTypes.object
}
