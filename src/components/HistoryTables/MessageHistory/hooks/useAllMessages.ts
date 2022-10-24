import { SubscriptionResult } from '@apollo/client'
import { CoinType } from '@glif/filecoin-address'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  useMpoolUpdateSubscription,
  usePendingMessagesQuery,
  ChainHeadSubscription,
  useChainHeadSubscription,
  useMessageQuery,
  usePendingMessageQuery,
  useMessagesQuery
} from '../../../../generated/graphql'
import { GqlMessage, GqlMessagePending } from '../../../../customPropTypes'
import { useEnvironment } from '../../../../services/EnvironmentProvider'
import convertAddrToPrefix from '../../../../utils/convertAddrToPrefix'
import { uniqueifyMsgs } from '../../../../utils/uniqueifyMsgs'
import { useSubmittedMessages } from '../../PendingMsgContext'

const DEFAULT_LIMIT = 10
const WAIT_EPOCHS_BEFORE_REFRESH = 3

export const usePendingMessages = (
  address: string,
  chainHeadSubscription: SubscriptionResult<ChainHeadSubscription, any>,
  coinType: CoinType
) => {
  // pending messages from our static query
  const pendingMsgs = usePendingMessagesQuery({
    variables: {
      address: convertAddrToPrefix(address, coinType)
    },
    // dont poll here because we rely on the subscription and StateListMessage query for updates
    pollInterval: 0,
    fetchPolicy: 'network-only'
  })

  // pending messages from our subscription
  const pendingMsgSub = useMpoolUpdateSubscription({
    variables: {
      address: convertAddrToPrefix(address, coinType)
    },
    shouldResubscribe: true
  })

  // pending messages submitted messages from wallet or safe
  const { messages: submittedMessages } = useSubmittedMessages()

  const pendingMsgList = useMemo<GqlMessagePending[]>(() => {
    const msgs: GqlMessagePending[] = [
      ...submittedMessages,
      ...(pendingMsgs?.data?.pendingMessages || [])
    ]

    if (pendingMsgSub?.data?.mpoolUpdate?.type === 0) {
      msgs.push(pendingMsgSub?.data?.mpoolUpdate?.message)
    }

    return uniqueifyMsgs(msgs) as GqlMessagePending[]
  }, [pendingMsgs?.data, submittedMessages, pendingMsgSub?.data?.mpoolUpdate])

  // should refresh returns true after a few epochs have past since a message left the mpool
  const [shouldRefresh, setShouldRefresh] = useState(false)
  const ref = useRef<{ cid: string; height: number }>({ cid: '', height: 0 })

  // this effect gets notified of an exit from the mempool
  // and sets a ref that we should eventually refresh our low confidence message query
  useEffect(() => {
    const ready =
      !pendingMsgSub.loading &&
      !chainHeadSubscription.loading &&
      !pendingMsgSub.error &&
      !chainHeadSubscription.error
    if (ready) {
      // if something was removed from the mpool and we didnt already hear about it...
      if (
        pendingMsgSub?.data?.mpoolUpdate?.type === 1 &&
        ref?.current.cid !== pendingMsgSub.data.mpoolUpdate.message.cid
      ) {
        ref.current.cid = pendingMsgSub.data?.mpoolUpdate.message.cid
        ref.current.height = chainHeadSubscription?.data?.chainHead.height
      }
    }
  }, [chainHeadSubscription, pendingMsgSub])

  // this effect listens to the chain head and sets shouldRefresh to true if we should refetch low confidence messages
  useEffect(() => {
    // if we have a message that recently left the mpool...
    if (ref.current.height && ref.current.cid && !shouldRefresh) {
      // wait the number of confirmations before refreshing low conf query
      if (
        ref.current.height + WAIT_EPOCHS_BEFORE_REFRESH <
        chainHeadSubscription?.data?.chainHead.height
      ) {
        setShouldRefresh(true)
        ref.current.height = 0
        ref.current.cid = ''
      }
    }
  }, [chainHeadSubscription, setShouldRefresh, shouldRefresh])
  return {
    pendingMsgList,
    shouldRefresh,
    setShouldRefresh,
    loading: pendingMsgs?.loading,
    error: pendingMsgs?.error
  }
}

// note this does not filter out errors for loading pending messages...
export const useAllMessages = (address: string, _offset: number = 0) => {
  const [offset, setOffset] = useState(_offset)
  const { coinType } = useEnvironment()

  const chainHeadSub = useChainHeadSubscription({
    variables: {},
    shouldResubscribe: true
  })
  // these pending messages might have recently confirmed low conf messages... filter them out
  const {
    pendingMsgList,
    shouldRefresh,
    setShouldRefresh,
    loading: pendingMsgsLoading,
    error: pendingMsgsError
  } = usePendingMessages(address, chainHeadSub, coinType)

  const {
    data: allMessages,
    loading: allMessagesLoading,
    error: allMessagesError,
    refetch: allMessagesRefetch,
    fetchMore: fetchMoreMessages
  } = useMessagesQuery({
    variables: {
      address: convertAddrToPrefix(address, coinType),
      limit: DEFAULT_LIMIT,
      offset
    },
    fetchPolicy: 'cache-and-network',
    pollInterval: 60000
  })

  useEffect(() => {
    if (shouldRefresh) {
      setShouldRefresh(false)
      allMessagesRefetch()
    }
  }, [shouldRefresh, setShouldRefresh, allMessagesRefetch, address])

  // pluck confirmed messages from the pending message list
  const pendingMsgs = useMemo(() => {
    if (
      pendingMsgList?.length > 0 &&
      typeof allMessages?.messages !== 'undefined'
    ) {
      const confirmedCids = new Set(allMessages?.messages.map(msg => msg.cid))
      return (
        pendingMsgList
          // Remove confirmed messages
          .filter(msg => !confirmedCids.has(msg.cid))
          // Sort messages by nonce, descending
          .sort((a, b) => b.nonce - a.nonce)
      )
    } else {
      return []
    }
  }, [pendingMsgList, allMessages]) as GqlMessagePending[]

  const [fetchingMore, setFetchingMore] = useState(false)
  const [lastPage, setLastPage] = useState(false)

  async function onClickLoadMore() {
    setFetchingMore(true)
    const messages = await fetchMoreMessages({
      variables: {
        offset: offset + DEFAULT_LIMIT,
        limit: DEFAULT_LIMIT
      }
    })
    if (messages?.data?.messages.length < DEFAULT_LIMIT) {
      setLastPage(true)
    } else if (!messages?.data?.messages) {
      setLastPage(true)
    } else {
      setOffset(offset + DEFAULT_LIMIT)
    }
    setFetchingMore(false)
  }

  const loading = useMemo(() => {
    return allMessagesLoading || pendingMsgsLoading
  }, [allMessagesLoading, pendingMsgsLoading])

  const error = useMemo(() => {
    return allMessagesError || pendingMsgsError
  }, [allMessagesError, pendingMsgsError])

  return {
    messages: allMessages?.messages,
    pendingMsgs,
    fetchMore: onClickLoadMore,
    fetchingMore,
    loading,
    lastPage: lastPage || allMessages?.messages.length < offset + DEFAULT_LIMIT,
    error
  }
}

export const useMessage = (cid: string) => {
  const { coinType } = useEnvironment()
  const {
    data: msgData,
    loading: msgLoading,
    error: _msgErr
  } = useMessageQuery({
    variables: { cid },
    pollInterval: 30000
  })

  const {
    data: pendingMsgData,
    loading: pendingMsgLoading,
    error: _pendingMsgErr
  } = usePendingMessageQuery({
    variables: { cid },
    pollInterval: 0
  })

  const pendingMsgErr = useMemo(() => {
    if (
      !_pendingMsgErr ||
      // TODO: Remove once https://github.com/glifio/graph/issues/29 is fixed
      !_pendingMsgErr.message.toLowerCase().includes('must not be null')
    ) {
      return _pendingMsgErr
    }
    return null
  }, [_pendingMsgErr])

  const pendingMsg = useMemo(() => {
    if (!pendingMsgLoading && !pendingMsgErr) {
      return pendingMsgData?.pendingMessage || null
    }
  }, [pendingMsgData, pendingMsgLoading, pendingMsgErr])

  const msgErr = useMemo(() => {
    if (_msgErr?.message.toLowerCase().includes('failed to fetch')) {
      return
    } else if (!!pendingMsg && _msgErr?.message.includes("didn't find msg")) {
      return
    } else if (_msgErr?.message.toLowerCase().includes('not found')) {
      return
    } else if (
      _msgErr?.message
        .toLowerCase()
        .includes('failed to load message: blockstore: block not found')
    ) {
      return
    }

    return _msgErr
  }, [_msgErr, pendingMsg])

  const {
    pushPendingMessage,
    messages: submittedMessages,
    clearPendingMessage
  } = useSubmittedMessages()

  const pendingFound = useMemo(() => {
    if (pendingMsg && !msgLoading && !msgErr) {
      return !!msgData?.message
    }
  }, [pendingMsg, msgData, msgLoading, msgErr])

  // this is to make sure if the message confirms in the transaction detail view
  // the cache used in the transaction history list is up to date
  // this is a non blocking operation, since we use refetch to get fresh data from the server
  const { refetch } = useMessagesQuery({
    variables: { address: '', limit: DEFAULT_LIMIT, offset: 0 },
    skip: true,
    pollInterval: 0
  })

  useEffect(() => {
    const revalidateMsgCache = async (addrTo: string, addrFrom: string) => {
      await Promise.all([
        refetch({
          address: convertAddrToPrefix(addrTo, coinType)
        }),
        refetch({
          address: convertAddrToPrefix(addrFrom, coinType)
        })
      ])
    }
    if (pendingFound && submittedMessages.length > 0) {
      const message = submittedMessages.find(m => m.cid === cid)
      if (message) {
        clearPendingMessage(cid)
        revalidateMsgCache(
          message.to.robust || message.to.id,
          message.from.robust || message.from.id
        )
      }
    }
  }, [
    pendingFound,
    clearPendingMessage,
    submittedMessages,
    pushPendingMessage,
    cid,
    refetch,
    coinType
  ])

  const loading = useMemo(() => {
    // low confidence messages can take a long time to load
    // if we have the message, use it
    if (!msgLoading && !!msgData?.message) return false
    if (!pendingMsgLoading && !!pendingMsgData?.pendingMessage) return false
    return msgLoading || pendingMsgLoading
  }, [msgLoading, msgData, pendingMsgLoading, pendingMsgData])

  const error = useMemo(() => msgErr || pendingMsgErr, [msgErr, pendingMsgErr])

  const message = useMemo<GqlMessage | GqlMessagePending | null>(() => {
    const ready = !error && !loading
    if (ready && pendingFound) {
      return msgData?.message as GqlMessage
    } else if (ready && pendingMsg) {
      return pendingMsg
    } else if (ready && msgData?.message) {
      return msgData.message as GqlMessage
    } else return null
  }, [msgData, loading, error, pendingMsg, pendingFound])

  const pending = useMemo(
    () => !pendingFound && !!pendingMsg,
    [pendingFound, pendingMsg]
  )

  return {
    message,
    loading,
    error,
    pending
  }
}
