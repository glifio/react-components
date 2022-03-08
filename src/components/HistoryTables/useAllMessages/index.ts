import { SubscriptionResult } from '@apollo/client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  MessagePending,
  MessageConfirmed,
  useMpoolUpdateSubscription,
  usePendingMessagesQuery,
  useStateListMessagesQuery,
  useMessagesConfirmedQuery,
  ChainHeadSubscription,
  useChainHeadSubscription,
  useMessageQuery,
  useMessageLowConfidenceQuery,
  usePendingMessageQuery
} from '../../../generated/graphql'
import { uniqueifyMsgs } from '../../../utils/uniqueifyMsgs'
import { useSubmittedMessages } from '../PendingMsgContext'

const DEFAULT_LIMIT = 10
const WAIT_EPOCHS_BEFORE_REFRESH = 3

export const usePendingMessages = (
  address: string,
  chainHeadSubscription: SubscriptionResult<ChainHeadSubscription, any>
) => {
  const [pendingMsgList, setPendingMsgList] = useState<MessagePending[]>([])

  // only update the pending message list when there is a new message to add... w/out infinite loops
  const safeUpdate = useCallback(
    (newMessages: MessagePending[]) => {
      const pendingCIDs = new Set(pendingMsgList.map(({ cid }) => cid))

      const shouldUpdate = newMessages.some(({ cid }) => !pendingCIDs.has(cid))

      if (shouldUpdate) {
        setPendingMsgList(
          uniqueifyMsgs(
            [...newMessages],
            [...pendingMsgList]
          ) as MessagePending[]
        )
      }
    },
    [pendingMsgList, setPendingMsgList]
  )
  /**
   * ADD PENDING MESSAGES TO THE LIST
   */

  // from our static query
  const pendingMsgs = usePendingMessagesQuery({
    variables: { address, offset: 0, limit: Number.MAX_SAFE_INTEGER },
    // dont poll here because we rely on the subscription and StateListMessage query for updates
    pollInterval: 0
  })
  if (!pendingMsgs?.loading && pendingMsgs.data) {
    safeUpdate((pendingMsgs?.data?.pendingMessages as MessagePending[]) || [])
  }

  // from our subscription
  const pendingMsgSub = useMpoolUpdateSubscription({
    variables: { address },
    shouldResubscribe: true
  })
  if (!pendingMsgSub?.loading && !pendingMsgSub.error) {
    if (pendingMsgSub.data.mpoolUpdate.type === 0) {
      safeUpdate([pendingMsgSub.data.mpoolUpdate.message as MessagePending])
    }
  }

  // from submitted messages from wallet or safe
  const { messages: submittedMessages } = useSubmittedMessages()
  useEffect(() => {
    if (submittedMessages.length) {
      safeUpdate([...submittedMessages])
    }
  }, [safeUpdate, submittedMessages])

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
        ref.current.height = Number(
          chainHeadSubscription?.data?.chainHead.height
        )
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
        Number(chainHeadSubscription?.data?.chainHead.height)
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
  } = usePendingMessages(address, chainHeadSub)

  const {
    data: lowConfidenceMsgsData,
    loading: lowConfidenceMsgsLoading,
    error: lowConfidenceMsgsError,
    refetch: lowConfidenceMsgsRefetch
  } = useStateListMessagesQuery({
    variables: { address },
    fetchPolicy: 'cache-and-network',
    pollInterval: 60000
  })

  useEffect(() => {
    if (shouldRefresh) {
      setShouldRefresh(false)
      lowConfidenceMsgsRefetch()
    }
  }, [shouldRefresh, setShouldRefresh, lowConfidenceMsgsRefetch])

  // pluck confirmed messages from the pending message list
  const pendingMsgs = useMemo(() => {
    if (
      !pendingMsgsLoading &&
      !pendingMsgsError &&
      !lowConfidenceMsgsLoading &&
      !lowConfidenceMsgsError &&
      !!lowConfidenceMsgsData?.stateListMessages
    ) {
      const confirmedCids = new Set(
        lowConfidenceMsgsData?.stateListMessages.map(msg => msg.cid)
      )
      return pendingMsgList
        .filter(msg => !confirmedCids.has(msg.cid))
        .sort((a, b) => Number(b.nonce) - Number(a.nonce))
    } else if (pendingMsgList.length > 0) {
      return pendingMsgList.sort((a, b) => Number(b.nonce) - Number(a.nonce))
    } else {
      return []
    }
  }, [
    pendingMsgList,
    lowConfidenceMsgsError,
    lowConfidenceMsgsLoading,
    lowConfidenceMsgsData,
    pendingMsgsLoading,
    pendingMsgsError
  ]) as MessagePending[]

  const [offset, setOffset] = useState(_offset)

  const {
    data,
    loading: confirmedMsgsLoading,
    error: confirmedMsgsErr,
    fetchMore
  } = useMessagesConfirmedQuery({
    variables: { address, limit: DEFAULT_LIMIT, offset },
    pollInterval: 0
  })

  const [fetchingMore, setFetchingMore] = useState(false)

  async function onClickLoadMore() {
    setFetchingMore(true)
    await fetchMore({
      variables: {
        offset: offset + DEFAULT_LIMIT,
        limit: DEFAULT_LIMIT
      }
    })
    setOffset(offset + DEFAULT_LIMIT)
    setFetchingMore(false)
  }

  const loading = useMemo(() => {
    return (
      confirmedMsgsLoading || lowConfidenceMsgsLoading || pendingMsgsLoading
    )
  }, [confirmedMsgsLoading, lowConfidenceMsgsLoading, pendingMsgsLoading])

  const error = useMemo(() => {
    return confirmedMsgsErr || lowConfidenceMsgsError || pendingMsgsError
  }, [confirmedMsgsErr, lowConfidenceMsgsError, pendingMsgsError])

  const messages = useMemo<MessageConfirmed[]>(() => {
    if (
      !confirmedMsgsLoading &&
      !confirmedMsgsErr &&
      !lowConfidenceMsgsLoading &&
      !lowConfidenceMsgsError
    ) {
      const clonedHighConfiMsgs = [...data?.messagesConfirmed]

      // mark the CIDs we have from high confidence
      const highConfidenceCIDs = new Set(
        clonedHighConfiMsgs.map(msg => msg.cid)
      )

      // dont include any from low confidence when we have high confidence
      const filteredLowConfidenceMsgs = lowConfidenceMsgsData?.stateListMessages
        ? lowConfidenceMsgsData?.stateListMessages.filter(
            msg => !highConfidenceCIDs.has(msg.cid)
          )
        : []

      // dont include duplicates if the high confidence message db updated and the offset is off by n
      const filteredHighConfidenceMsgs = clonedHighConfiMsgs.reduce(
        (accum, ele) => {
          if (highConfidenceCIDs.has(ele.cid)) {
            highConfidenceCIDs.delete(ele.cid)
            accum.push(ele)
            return accum
          }
        },
        []
      )

      // merge the two results
      return [
        // TODO remove the sort once we have that done
        ...filteredLowConfidenceMsgs.sort((a, b) => b.height - a.height),
        ...filteredHighConfidenceMsgs
      ] as MessageConfirmed[]
    }
    return []
  }, [
    lowConfidenceMsgsData,
    confirmedMsgsLoading,
    confirmedMsgsErr,
    data,
    lowConfidenceMsgsLoading,
    lowConfidenceMsgsError
  ])

  return {
    chainHeadSub,
    messages,
    pendingMsgs,
    fetchMore: onClickLoadMore,
    fetchingMore,
    loading,
    error
  }
}

export const useMessage = (cid: string, height?: number) => {
  const {
    data: highConfMsgData,
    loading: highConfMsgLoading,
    error: _highConfiMsgErr
  } = useMessageQuery({
    variables: { cid, height },
    pollInterval: 0
  })

  const highConfiMsgErr = useMemo(() => {
    if (_highConfiMsgErr?.message.toLowerCase().includes('failed to fetch')) {
      return
    }

    return _highConfiMsgErr
  }, [_highConfiMsgErr])

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

  const {
    data: lowConfMsgData,
    loading: lowConfMsgLoading,
    error: _lowConfMsgErr
  } = useMessageLowConfidenceQuery({
    variables: { cid },
    pollInterval: !!pendingMsg ? 30000 : 0,
    skip: pendingMsgLoading || !!highConfMsgData?.message
  })

  const {
    pushPendingMessage,
    messages: submittedMessages,
    clearPendingMessage
  } = useSubmittedMessages()

  const lowConfMsgErr = useMemo(() => {
    // this error infers we are looking for the pending message but havent found it yet...
    if (!!pendingMsg && _lowConfMsgErr?.message.includes("didn't find msg")) {
      return
    }
    // can be removed once https://github.com/glifio/react-components/issues/150 is closed
    else if (
      _lowConfMsgErr?.message.toLowerCase().includes('failed to fetch')
    ) {
      return
    } else if (_lowConfMsgErr?.message.toLowerCase().includes('not found')) {
      return
    } else if (
      _lowConfMsgErr?.message
        .toLowerCase()
        .includes('failed to load message: blockstore: block not found')
    ) {
      return
    } else return _lowConfMsgErr
  }, [_lowConfMsgErr, pendingMsg])

  const pendingFoundInLowConfMsgs = useMemo(() => {
    if (pendingMsg && !lowConfMsgLoading && !lowConfMsgErr) {
      return !!lowConfMsgData?.messageLowConfidence
    }
  }, [pendingMsg, lowConfMsgData, lowConfMsgLoading, lowConfMsgErr])

  // this is to make sure if the message confirms in the transaction detail view
  // the cache used in the transaction history list is up to date
  // this is a non blocking operation, since we use refetch to get fresh data from the server
  const { refetch } = useStateListMessagesQuery({
    variables: { address: '' },
    skip: true,
    pollInterval: 0
  })

  useEffect(() => {
    const revalidateMsgCache = async (addrTo: string, addrFrom: string) => {
      await Promise.all([
        refetch({ address: addrTo }),
        refetch({ address: addrFrom })
      ])
    }
    if (pendingFoundInLowConfMsgs && submittedMessages.length > 0) {
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
    pendingFoundInLowConfMsgs,
    clearPendingMessage,
    submittedMessages,
    pushPendingMessage,
    cid,
    refetch
  ])

  const loading = useMemo(() => {
    // low confidence messages can take a long time to load
    // if we have the message, use it
    if (!highConfMsgLoading && !!highConfMsgData?.message) return false
    if (!pendingMsgLoading && !!pendingMsgData?.pendingMessage) return false
    if (!lowConfMsgLoading && !!lowConfMsgData?.messageLowConfidence)
      return false
    return highConfMsgLoading || lowConfMsgLoading || pendingMsgLoading
  }, [
    highConfMsgLoading,
    lowConfMsgLoading,
    pendingMsgLoading,
    pendingMsgData,
    highConfMsgData,
    lowConfMsgData
  ])

  const error = useMemo(
    () => highConfiMsgErr || lowConfMsgErr || pendingMsgErr,
    [highConfiMsgErr, lowConfMsgErr, pendingMsgErr]
  )

  const message = useMemo<MessageConfirmed | MessagePending | null>(() => {
    const ready = !error && !loading
    if (ready && pendingFoundInLowConfMsgs) {
      return lowConfMsgData.messageLowConfidence as MessageConfirmed
    } else if (ready && pendingMsg) {
      return pendingMsg
    } else if (
      ready &&
      (highConfMsgData?.message || lowConfMsgData?.messageLowConfidence)
    ) {
      return (highConfMsgData.message ||
        lowConfMsgData.messageLowConfidence) as MessageConfirmed
    } else return null
  }, [
    highConfMsgData,
    lowConfMsgData,
    loading,
    error,
    pendingMsg,
    pendingFoundInLowConfMsgs
  ])

  return {
    message,
    loading,
    error,
    pending: !pendingFoundInLowConfMsgs && !!pendingMsg
  }
}
