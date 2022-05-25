import PropTypes from 'prop-types'
import { useState, ReactNode, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Message } from '@glif/filecoin-message'
import { FilecoinNumber, BigNumber } from '@glif/filecoin-number'
import {
  FILECOIN_NUMBER_PROPTYPE,
  MESSAGE_PROPTYPE,
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
import { getMaxGasFee, useGetGasParams } from '../../utils'
import { useWallet, useWalletProvider } from '../../services'
import { logger } from '../../logger'

export const TransactionForm = ({
  children,
  title,
  description,
  message,
  total,
  txState,
  setTxState,
  maxFee,
  txFee,
  setTxFee,
  getParams,
  onComplete
}: TransactionFormProps) => {
  const router = useRouter()
  const wallet = useWallet()
  const { pushPendingMessage } = useSubmittedMessages()
  const { loginOption, walletProvider, walletError, getProvider } =
    useWalletProvider()

  // Transaction states
  const [txError, setTxError] = useState<Error | null>(null)

  // Placeholder message for getting gas params
  const [gasParamsMessage, setGasParamsMessage] = useState<Message | null>(null)

  // Max transaction fee used for getting gas params. Will be
  // null until the user manually changes the transaction fee.
  const [inputFee, setInputFee] = useState<FilecoinNumber | null>(null)

  // Load gas parameters when message or max fee changes
  const {
    gasParams,
    loading: gasParamsLoading,
    error: gasParamsError
  } = useGetGasParams(walletProvider, gasParamsMessage, inputFee)

  // Calculate maximum transaction fee (fee cap times limit)
  useEffect(() => {
    setTxFee(
      gasParams ? getMaxGasFee(gasParams.gasFeeCap, gasParams.gasLimit) : null
    )
  }, [setTxFee, gasParams])

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
        <form>
          {children}
          <TransactionFee
            inputFee={inputFee}
            setInputFee={setInputFee}
            affordableFee={maxFee}
            calculatedFee={txFee}
            txState={txState}
          />
        </form>
        {total && <TransactionTotal total={total} />}
      </ShadowBox>
      <TransactionButtons
        backDisabled={
          txState !== TxState.FillingForm && txState !== TxState.FillingTxFee
        }
        nextDisabled={!(
          txState === TxState.FillingForm && message ||
          txState === TxState.FillingTxFee && txFee
        )}
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
  total?: FilecoinNumber
  txState: TxState
  setTxState: (state: TxState) => void
  maxFee: FilecoinNumber
  txFee: FilecoinNumber
  setTxFee: (fee: FilecoinNumber) => void
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
  total: FILECOIN_NUMBER_PROPTYPE,
  txState: TX_STATE_PROPTYPE.isRequired,
  setTxState: PropTypes.func.isRequired,
  maxFee: FILECOIN_NUMBER_PROPTYPE.isRequired,
  txFee: FILECOIN_NUMBER_PROPTYPE.isRequired,
  setTxFee: PropTypes.func.isRequired,
  getParams: PropTypes.func,
  onComplete: PropTypes.func.isRequired
}
