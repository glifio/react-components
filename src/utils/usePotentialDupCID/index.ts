import { Message } from '@glif/filecoin-message'
import { useState } from 'react'
import { useAllMessages } from '../../components/HistoryTables/MessageHistory/hooks/useAllMessages'
import { useChainHeadSubscription } from '../../generated/graphql'
import { Wallet } from '../../services/WalletProvider'
import { isAddrEqual } from '../isAddrEqual'
import { potentialDupMsg } from '../potentialDupMsg'

export const usePotentialDupCID = (
  wallet: Wallet,
  messageWithGas: Message
): string | null => {
  const [chainHead, setChainHead] = useState(0)
  const { messages, pendingMsgs } = useAllMessages(wallet.robust || wallet.id)

  useChainHeadSubscription({
    variables: {},
    skip: chainHead > 0,
    shouldResubscribe: chainHead === 0,
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData?.data?.chainHead?.height) {
        setChainHead(subscriptionData.data?.chainHead?.height as number)
      }
    }
  })

  const lastConfirmedMessage = messages?.find(msg =>
    isAddrEqual(msg?.from, wallet)
  )

  const confirmedCIDDup = potentialDupMsg(
    lastConfirmedMessage,
    messageWithGas,
    chainHead,
    false
  )

  if (confirmedCIDDup) return confirmedCIDDup

  const pendingCIDDup = pendingMsgs.find(msg =>
    potentialDupMsg(msg, messageWithGas, chainHead, true)
  )?.cid

  if (pendingCIDDup) return pendingCIDDup

  return null
}
